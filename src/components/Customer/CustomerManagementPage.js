import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';
import './Customer.css';

const CustomerManagementPage = () => {
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [log, setLog] = useState([]);

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
      } else {
        await addDoc(collection(db, 'customers'), customer);
        setLog([...log, 'Cliente cadastrado com sucesso!']);
      }
      setCustomer({ name: '', email: '', phone: '' });
      fetchCustomers();
    } catch (error) {
      setLog([...log, `Erro ao cadastrar/atualizar cliente: ${error.message}`]);
    }
  };

  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(customersList);
    } catch (error) {
      setLog([...log, `Erro ao buscar clientes: ${error.message}`]);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setCustomer(customer);
  };

  const handleDelete = async (customerId) => {
    try {
      await deleteDoc(doc(db, 'customers', customerId));
      setLog([...log, 'Cliente deletado com sucesso!']);
      fetchCustomers();
    } catch (error) {
      setLog([...log, `Erro ao deletar cliente: ${error.message}`]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customerPage">
      <h2>Gerenciamento de Clientes</h2>
      <CustomerForm customer={customer} handleChange={handleChange} handleSubmit={handleSubmit} selectedCustomer={selectedCustomer} />
      <h3>Clientes Cadastrados</h3>
      <CustomerTable customers={customers} handleEdit={handleEdit} handleDelete={handleDelete} />
      <h3>Logs</h3>
      <div className="log">
        {log.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
    </div>
  );
};

export default CustomerManagementPage;
