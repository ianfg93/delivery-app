import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/Context';

const COMMON = 'common_login';
const MAIL = 'input-email';
const PASS = 'input-password';
const LOGIN = 'button-login';
const REGISTER = 'button-register';
const INVALID = 'element-invalid-email';
const PASS_MIN_LENGTH = 6;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoged, setUserLoged] = useState(false);
  const { login, isHidden, navigate } = useContext(MyContext);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUserLoged(true);
    }
  }, []);

  const emailRegex = () => /^\S+@\S+\.\S+$/i.test(email);
  const passRegex = () => password.length >= PASS_MIN_LENGTH;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <div>Logo</div>
      { userLoged && navigate('/customer/products') }
      <h1>Nome do App</h1>
      <form
        action="post"
        onSubmit={ (e) => handleSubmit(e) }
      >
        <label htmlFor="inputMail">
          Login:
          <input
            type="email"
            data-testid={ `${COMMON}__${MAIL}` }
            id="inputMail"
            onInput={ ({ target: { value } }) => setEmail(value) }
            value={ email }
          />
        </label>
        <label htmlFor="inputPass">
          Senha:
          <input
            type="password"
            data-testid={ `${COMMON}__${PASS}` }
            id="inputPass"
            onInput={ ({ target: { value } }) => setPassword(value) }
            value={ password }
          />
        </label>
        <button
          type="submit"
          data-testid={ `${COMMON}__${LOGIN}` }
          disabled={ !(emailRegex() && passRegex()) }
        >
          Login
        </button>
        <button
          type="button"
          data-testid={ `${COMMON}__${REGISTER}` }
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
        <small data-testid={ `${COMMON}__${INVALID}` } hidden={ isHidden }>
          Email ou senha invalido.
        </small>
      </form>
    </div>
  );
}
