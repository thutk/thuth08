import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { images } from '../assets/img';
import { apiGetAllMedicines, apiPostBill } from '../api';
import { AppContext } from '../context/AppContext';

export function BillCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(true);
  const [description, setDescription] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState([]);

  const { logoutUser } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetAllMedicines();
        setMedicines(res);
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
  }, []);

  const onChangeAmount = (e, medicine) => {
    const arr = [...selected];
    const temp = [...medicines];
    for (let i = 0; i < temp.length; i++) {
      if (medicine.id === temp[i].id) {
        temp[i].amount = +e.target.value;
      }
    }
    setMedicines(temp);
    if (e.target.value === '0') {
      setSelected(arr.filter((item) => item.id !== medicine.id));
    } else {
      setSelected([...arr.filter((item) => item.id !== medicine.id), medicine]);
    }
  };

  const onSubmit = async () => {
    try {
      if (name && phone && (gender === true || gender === false) && selected.length) {
        await apiPostBill({ name, phone, gender }, selected, description);
        alert('Tạo đơn thuốc thành công');
        navigate('/bills');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="home">
      <img src={images.background} className="home-bgr" alt="bgr" />
      <div className="container-fluid absolute-container">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="py-2">Kê đơn thuốc</h2>
            <button className="btn btn-dark" onClick={onSubmit}>
              Hoàn thành
            </button>
          </div>
          <div className="row mb-2">
            <div className="col-4 d-flex align-items-center">
              <span className="mx-2">Tên</span>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nguyen Van A"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-4 d-flex align-items-center">
              <span className="mx-2">SDT</span>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="0123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-4 d-flex align-items-center">
              <div>
                <label className="form-check-label mx-2" htmlFor="male">
                  Nam
                </label>
                <input
                  className="form-check-input"
                  type="radio"
                  id="male"
                  name="gender"
                  checked={gender === true}
                  onChange={() => setGender(true)}
                ></input>
              </div>
              <div className="mx-4">
                <label className="form-check-label mx-2" htmlFor="female">
                  Nu
                </label>
                <input
                  className="form-check-input"
                  type="radio"
                  id="female"
                  name="gender"
                  checked={gender === false}
                  onChange={() => setGender(false)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12 mx-2">
              <label htmlFor="description" className="form-label">
                Ghi chú
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <ul className="list-group row mb-2 ms-2 flex-row list-container">
            {medicines.map((medicine) => (
              <li
                className="list-group-item col-2 d-flex justify-content-between align-items-center"
                key={medicine.id}
              >
                <label className="form-check-label">{medicine.name}</label>
                <input
                  className="form-control ms-2 input-number"
                  type="number"
                  value={medicine.amount || 0}
                  onChange={(e) => onChangeAmount(e, medicine)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
