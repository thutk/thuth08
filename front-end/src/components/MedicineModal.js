import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../context/AppContext';
import { apiGetMedicineTypes, apiPostMedicine, apiPutMedicine } from '../api';

export function MedicineModal({ medicine, setMedicine, onSuccess }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(0);
  const [amountPerDay, setAmountPerDay] = useState(0);
  const [usage, setUsage] = useState('');
  const [description, setDescription] = useState('');
  const [medicineTypeId, setMedicineTypeId] = useState('');
  const [medicineTypes, setMedicineTypes] = useState([]);

  const { logoutUser } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGetMedicineTypes();
        setMedicineTypes(data);
        setMedicineTypeId(data[0].id);
      } catch (e) {
        if (e.response.status === 401) {
          logoutUser();
          alert('Bạn cần đăng nhập');
        } else {
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetInputValue = () => {
    setId('');
    setName('');
    setUnit('');
    setPrice(0);
    setAmountPerDay(0);
    setUsage('');
    setDescription('');
    setMedicineTypeId(medicineTypes.length ? medicineTypes[0].id : '');
  };

  useEffect(() => {
    if (medicine) {
      setId(medicine.id);
      setName(medicine.name);
      setUnit(medicine.unit);
      setPrice(medicine.price);
      setAmountPerDay(medicine.amountPerDay);
      setUsage(medicine.usage);
      setDescription(medicine.description);
      setMedicineTypeId(medicine.medicineTypeId);
    } else {
      resetInputValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicine]);

  const handleSubmit = async () => {
    try {
      if (
        id &&
        name &&
        unit &&
        price &&
        amountPerDay &&
        usage &&
        medicineTypeId
      ) {
        if (medicine) {
          await apiPutMedicine(
            id,
            name,
            unit,
            price,
            amountPerDay,
            usage,
            description,
            medicineTypeId
          );
        } else {
          await apiPostMedicine(
            id,
            name,
            unit,
            price,
            amountPerDay,
            usage,
            description,
            medicineTypeId
          );
        }
        alert(`${medicine ? 'Cập nhập' : 'Tạo'} thành công`);
        resetInputValue();
        await onSuccess();
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

  const handleClose = () => {
    setMedicine(null);
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="modal-medicine"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {medicine ? 'Chỉnh sửa' : 'Thêm thuốc mới'}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Mã thuốc
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={!!medicine}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên thuốc
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="unit" className="form-label">
                Đơn vị
              </label>
              <input
                type="text"
                className="form-control"
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Giá
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amountPerDay" className="form-label">
                Số lượng / ngày
              </label>
              <input
                type="number"
                className="form-control"
                id="amountPerDay"
                value={amountPerDay}
                onChange={(e) => setAmountPerDay(+e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="usage" className="form-label">
                Cách dùng
              </label>
              <input
                type="text"
                className="form-control"
                id="usage"
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Mô tả chi tiết
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="usage" className="form-label">
                Loại thuốc
              </label>
              <select
                className="form-select"
                value={medicineTypeId}
                onChange={(e) => setMedicineTypeId(+e.target.value)}
              >
                {medicineTypes.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
