import React, { useState } from 'react';

const PASS_MIN_LENGTH = 6;
const NAME_MIN_LENGTH = 12;

export default function AdminManage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const nameRegex = () => name.length >= NAME_MIN_LENGTH;
  const emailRegex = () => /^\S+@\S+\.\S+$/i.test(email);
  const passRegex = () => password.length >= PASS_MIN_LENGTH;

  return (
    <div>
      <div>Gerenciar Usuário</div>
      <h1>Cadastrar novo usuário</h1>
      <form action="post">
        <label htmlFor="inputMail">
          Nome:
          <input
            type="text"
            data-testid="admin_manage__input-name"
            id="inputMail"
            onInput={ ({ target: { value } }) => setName(value) }
            value={ name }
          />
        </label>
        <label htmlFor="inputPass">
          Email:
          <input
            type="email"
            data-testid="admin_manage__input-email"
            id="inputPass"
            onInput={ ({ target: { value } }) => setEmail(value) }
            value={ email }
          />
        </label>
        <label htmlFor="inputPass">
          Senha:
          <input
            type="password"
            data-testid="admin_manage__input-password"
            id="inputPass"
            onInput={ ({ target: { value } }) => setPassword(value) }
            value={ password }
          />
        </label>
        <label htmlFor="inputPass">
          Tipo:
          <select
            id="select-role"
            name="select-role"
            data-testid="admin_manage__select-role"
            defaultValue="seller"
          >
            <option value="seller">seller</option>
            <option value="customer">customer</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ !(emailRegex() && passRegex() && nameRegex()) }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
