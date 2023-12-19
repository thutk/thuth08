import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { images } from '../assets/img';
import { apiLogin } from '../api';
import { AppContext } from '../context/AppContext';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {
        accessToken,
        id,
        email: resEmail,
        name,
      } = await apiLogin(email, password);
      loginUser(accessToken, { id, email: resEmail, name });
      navigate(-1);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="home">
      <img src={images.background} className="home-bgr" alt="bgr" />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlhtmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlhtmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
