import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { apiGetBills } from '../api';
import { images } from '../assets/img';
import { Download } from '../components/icons/Download';
import { constants } from '../constants';
import { AppContext } from '../context/AppContext';
import { numberWithCommas } from '../utils';

export function Bill() {
  const [bills, setBills] = useState([]);

  const { logoutUser } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetBills();
        setBills(res);
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

  return (
    <div className="home">
      <img src={images.background} className="home-bgr" alt="bgr" />
      <div className="container-fluid absolute-container">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="py-2">Hoá đơn</h2>
            <Link className="btn btn-dark" to="/bills/create">
              Tạo đơn thuốc
            </Link>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="scroll-container">
                <table className="table table-hover ">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">#</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Tổng tiền</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((bill, index) => (
                      <tr key={bill.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{bill.patient.name}</td>
                        <td>{bill.patient.phone}</td>
                        <td>{numberWithCommas(bill.total)} VND</td>
                        <td>{new Date(bill.createdAt).toLocaleString()}</td>
                        <td>
                          <Link
                            to={`${constants.API_URL}/bills/${bill.id}/download`}
                            target="_blank"
                          >
                            <Download />
                          </Link>
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
    </div>
  );
}
