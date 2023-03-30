import React, { useContext, useState } from 'react';
import MyContext from '../context/Context';

const COMMON = 'common_register';
const NAME = 'input-name';
const MAIL = 'input-email';
const PASS = 'input-password';
const REGISTER = 'button-register';
const INVALID = 'element-invalid_register';
const PASS_MIN_LENGTH = 6;
const NAME_MIN_LENGTH = 12;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { haveConflict, register } = useContext(MyContext);

  const emailRegex = () => /^\S+@\S+\.\S+$/i.test(email);
  const passRegex = () => password.length >= PASS_MIN_LENGTH;
  const nameRegex = () => name.length >= NAME_MIN_LENGTH;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register(email, password, name);
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
          disabled={ !(emailRegex() && passRegex() && nameRegex()) }
        >
          CADASTRAR
        </button>
      </form>
      <small
        data-testid={ `${COMMON}__${INVALID}` }
        hidden={ haveConflict }
      >
        Campos invalidos ou faltando
      </small>
    </div>
  );
}
