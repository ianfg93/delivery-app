import React from 'react';

const COMMON = 'common_login';
const MAIL = 'input-email';
const PASS = 'input-password';
const LOGIN = 'button-login';
const REGISTER = 'button-register';
const INVALID = 'element-invalid-email';

export default function Login() {
  return (
    <div>
      <div>Logo</div>
      <h1>Nome do App</h1>
      <form action="post">
        <label htmlFor="inputMail">
          Login:
          <input type="email" data-testid={ `${COMMON}__${MAIL}` } id="inputMail" />
        </label>
        <label htmlFor="inputPass">
          Senha:
          <input type="password" data-testid={ `${COMMON}__${PASS}` } id="inputPass" />
        </label>
        <button type="submit" data-testid={ `${COMMON}__${LOGIN}` }>
          Login
        </button>
        <button type="button" data-testid={ `${COMMON}__${REGISTER}` }>
          Ainda não tenho conta
        </button>
        <small data-testid={ `${COMMON}__${INVALID}` }>
          Usuario invalido
        </small>
      </form>
    </div>
  );
}
