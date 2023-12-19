import classnames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  apiDeleteMedicine,
  apiGetAllMedicines,
  apiGetMedicineTypes,
  apiGetMedicinesByType,
} from '../api';
import { images } from '../assets/img';
import { AppContext } from '../context/AppContext';
import { MedicineModal } from '../components/MedicineModal';
import { Edit } from '../components/icons/Edit';
import { Trash } from '../components/icons/Trash';

export function Medicine() {
  const navigation = useNavigate();
  const [query] = useSearchParams();

  const [medicines, setMedicines] = useState([]);
  const [medicineTypes, setMedicineTypes] = useState([]);
  const [medicine, setMedicine] = useState(null);

  const { logoutUser } = useContext(AppContext);

  const queryMedicine = async () => {
    const data = await Promise.all([
      apiGetMedicineTypes(),
      (async () => {
        const type = query.get('type');
        let data;
        if (type) {
          data = await apiGetMedicinesByType(type);
        } else {
          data = await apiGetAllMedicines();
        }
        return data;
      })(),
    ]);
    setMedicineTypes(data[0]);
    setMedicines(data[1]);
  };

  useEffect(() => {
    (async () => {
      try {
        await queryMedicine();
      } catch (e) {
        if (e.response.status === 401) {
          logoutUser();
          alert('Bạn cần đăng nhập');
        } else {
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      }
    })();
    // eslint-disable-next-line
  }, [query.get('type')]);

  const handleTypeClick = async (type) => {
    if (type === 'all') {
      navigation(`/medicines`);
    } else {
      navigation(`/medicines?type=${type}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Bạn có chắc chắn muốn xóa thuốc này không?') === true) {
        await apiDeleteMedicine(id);
        await queryMedicine();
      }
    } catch (e) {
      if (e.response.status === 401) {
        logoutUser();
        alert('Bạn cần đăng nhập');
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="home">
      <img src={images.background} className="home-bgr" alt="bgr" />
      <div className="container-fluid absolute-container py-4">
        <div className="container">
          <div className="medicine-heading">
            <h2>Danh sách thuốc</h2>
            <button
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#modal-medicine"
            >
              Thêm thuốc
            </button>
          </div>
          <div className="row">
            <div className="col-2">
              <ul className="list-group">
                <li
                  className={classnames('list-group-item', 'cursor-pointer', {
                    active: !query.get('type'),
                  })}
                  onClick={() => handleTypeClick('all')}
                >
                  Tất cả
                </li>
                {medicineTypes.map((medicineType) => (
                  <li
                    className={classnames('list-group-item', 'cursor-pointer', {
                      active: query.get('type') === medicineType.id.toString(),
                    })}
                    key={medicineType.id}
                    onClick={() => handleTypeClick(medicineType.id)}
                  >
                    {medicineType.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-10">
              <div className="scroll-container">
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">#</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Đơn vị</th>
                      <th scope="col">Giá</th>
                      <th scope="col">SL/ngày</th>
                      <th scope="col">Cách dùng</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((item) => (
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.unit}</td>
                        <td>{item.price}</td>
                        <td>{item.amountPerDay}</td>
                        <td>{item.usage}</td>
                        <td>
                          <Edit
                            onClick={() => {
                              setMedicine(item);
                            }}
                          />
                          <Trash onClick={() => handleDelete(item.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MedicineModal
        medicine={medicine}
        setMedicine={setMedicine}
        onSuccess={queryMedicine}
      />
    </div>
  );
}
