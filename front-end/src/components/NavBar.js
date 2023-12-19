import { useContext  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { AppContext } from '../context/AppContext';

export function NavBar() {
  const location = useLocation();

  const { user, logoutUser } = useContext(AppContext);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Health Clinic
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={classnames('nav-link', {
                  active: location.pathname === '/medicines',
                })}
                to="/medicines"
              >
                Thuốc
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classnames('nav-link', {
                  active: location.pathname === '/bills',
                })}
                to="/bills"
              >
                Hóa đơn
              </Link>
            </li>
          </ul>
          {user ? (
            <>
              <span className="nav-link text-light mx-2">
                Xin chào {user.name}
              </span>
              <span
                className="nav-link active text-light cursor-pointer"
                onClick={handleLogout}
              >
                (Đăng xuất)
              </span>
            </>
          ) : (
            <Link className="nav-link active text-light" to="/login">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
