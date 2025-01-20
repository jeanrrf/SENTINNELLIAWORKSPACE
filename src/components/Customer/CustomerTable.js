import React from 'react';

const CustomerTable = ({ customers, handleEdit, handleDelete }) => {
  return (
    <ul>
      {customers.map((cust) => (
        <li key={cust.id}>
          {cust.name} - {cust.email} - {cust.phone}
          <button onClick={() => handleEdit(cust)}>Editar</button>
          <button onClick={() => handleDelete(cust.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
};

export default CustomerTable;
