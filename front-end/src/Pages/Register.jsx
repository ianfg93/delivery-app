import React, { useState } from 'react';

const COMMON = 'common_register';
const NAME = 'input-name';
const MAIL = 'input-email';
const PASS = 'input-password';
const REGISTER = 'button-register';
const INVALID = 'element-invalid-register';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form
        action="post"
        onSubmit={ (e) => handleSubmit(e) }
      >
        <label htmlFor="inputName">
          Nome:
          <input
            type="text"
            data-testid={ `${COMMON}__${NAME}` }
            id="inputName"
            onInput={ ({ target: { value } }) => setName(value) }
            value={ name }
          />
        </label>
        <label htmlFor="inputMail">
          Email:
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
          data-testid={ `${COMMON}__${REGISTER}` }
        >
          CADASTRAR
        </button>
      </form>
      <small
        data-testid={ `${COMMON}__${INVALID}` }
      >
        Campos invalidos ou faltando
      </small>
    </div>
  );
}
