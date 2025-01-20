import React from 'react';

const CustomerTable = ({ customers, handleEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((cust) => (
          <tr key={cust.id}>
            <td>{cust.name}</td>
            <td>{cust.email}</td>
            <td>{cust.phone}</td>
            <td>
              <button onClick={() => handleEdit(cust)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;