import React, { useState } from 'react';
import { db } from '../firebaseConfig';

const CustomerRegistrationPage = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('customers').add(customer);
      console.log('Cliente cadastrado com sucesso!');
      // Limpar o formulário após o cadastro
      setCustomer({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="name" value={customer.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={customer.email} onChange={handleChange} />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" name="phone" value={customer.phone} onChange={handleChange} />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CustomerRegistrationPage;
