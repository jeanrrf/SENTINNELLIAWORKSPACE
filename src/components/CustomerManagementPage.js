import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"; 
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

const CustomerManagementPage = () => {
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [log, setLog] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCustomer) {
        await updateDoc(doc(db, 'customers', selectedCustomer.id), customer);
        setLog([...log, 'Cliente atualizado com sucesso!']);
        console.log('Cliente atualizado com sucesso!');
      } else {
        await addDoc(collection(db, 'customers'), customer);
        setLog([...log, 'Cliente cadastrado com sucesso!']);
        console.log('Cliente cadastrado com sucesso!');
      }
      setCustomer({ name: '', email: '', phone: '' });
      fetchCustomers();
      setSnackbarMessage('Operação realizada com sucesso!');
      setSnackbarOpen(true);
    } catch (error) {
      setLog([...log, `Erro ao cadastrar/atualizar cliente: ${error.message}`]);
      console.error(`Erro ao cadastrar/atualizar cliente: ${error.message}`);
      setSnackbarMessage(`Erro: ${error.message}`);
      setSnackbarOpen(true);
    }
  };

  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(customersList);
    } catch (error) {
      setLog([...log, `Erro ao buscar clientes: ${error.message}`]);
      console.error(`Erro ao buscar clientes: ${error.message}`);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setCustomer(customer);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <h4>Gerenciamento de Clientes</h4>
      <CustomerForm customer={customer} handleChange={handleChange} handleSubmit={handleSubmit} selectedCustomer={selectedCustomer} />
      <h5 style={{ marginTop: '20px' }}>Clientes Cadastrados</h5>
      <CustomerTable customers={customers} handleEdit={handleEdit} />
      <h5 style={{ marginTop: '20px' }}>Logs</h5>
      <div style={{ maxHeight: '200px', overflow: 'auto', padding: '10px', border: '1px solid #ccc' }}>
        {log.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
      {snackbarOpen && (
        <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', marginTop: '10px' }}>
          {snackbarMessage}
          <button onClick={handleSnackbarClose} style={{ marginLeft: '10px' }}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementPage;
