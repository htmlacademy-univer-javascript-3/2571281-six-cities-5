import { FormEvent, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { authorize } from '../store/api-actions';

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (authorizationStatus === 'AUTH') {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value.trim() || '';
    const password = passwordRef.current?.value.trim() || '';
    if (email && password) {
      dispatch(authorize(email, password));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="login-email">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="login-password">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  pattern="^(?=.*[0-9])(?=.*[A-Za-z]).+$"
                  title="Password must contain at least one letter and one digit"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
