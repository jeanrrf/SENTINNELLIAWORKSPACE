import React from 'react';

const CustomerForm = ({ customer, handleChange, handleSubmit, selectedCustomer }) => {
  return (
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
      <button type="submit">{selectedCustomer ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
};

export default CustomerForm;