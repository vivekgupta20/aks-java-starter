import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SuccessPage from './SuccessPage';

function App() {
  const [orderData, setOrderData] = useState(null);
  const [catalogForm, setCatalogForm] = useState({ name: '', description: '', price: '' });
  const [identityData, setIdentityData] = useState(null);
  const [catalogData, setCatalogData] = useState(null);
  const [orderForm, setOrderForm] = useState({ productId: '', quantity: '' });
  const [identityForm, setIdentityForm] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_ORDER_API}`);
      setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const handleCatalogInputChange = (e) => {
    const { name, value } = e.target;
    setCatalogForm({ ...catalogForm, [name]: value });
  };

  const postCatalogData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_CATALOG_API}`, catalogForm);
      console.log('Catalog data posted:', response.data);
      setCatalogData(response.data);
      navigate('/success'); // Redirect to success page
    } catch (error) {
      console.error('Error posting catalog data:', error);
    }
  };

  const fetchCatalogData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_CATALOG_API}`);
      setCatalogData(response.data);
    } catch (error) {
      console.error('Error fetching catalog data:', error);
    }
  };

  const fetchIdentityData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_IDENTITY_API}`);
      setIdentityData(response.data);
    } catch (error) {
      console.error('Error fetching identity data:', error);
    }
  };

  const postOrderData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ORDER_API}`, orderForm);
      console.log('Order data posted:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error posting order data:', error);
    }
  };

  const postIdentityData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_IDENTITY_API}`, identityForm);
      console.log('Identity data posted:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error posting identity data:', error);
    }
  };

  const openInsertPage = () => {
    window.location.href = '/insert';
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  const handleIdentityInputChange = (e) => {
    const { name, value } = e.target;
    setIdentityForm({ ...identityForm, [name]: value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webapp with Backend Integration</h1>
        <div className="button-container">
          <button onClick={fetchOrderData}>Fetch Order Data</button>
          <button onClick={fetchIdentityData}>Fetch Identity Data</button>
        </div>
        <div className="form-container">
          <h2>Insert Catalog Data</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={catalogForm.name}
            onChange={handleCatalogInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={catalogForm.description}
            onChange={handleCatalogInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={catalogForm.price}
            onChange={handleCatalogInputChange}
          />
          <button onClick={postCatalogData}>Submit Catalog Data</button>
        </div>
        <div className="fetch-container">
          <h2>View Products</h2>
          <button onClick={fetchCatalogData}>Fetch Catalog</button>
          <button onClick={openInsertPage}>Insert New Product</button>
        </div>
        <div className="button-container">
          <button onClick={postOrderData}>Post Order Data</button>
          <button onClick={postIdentityData}>Post Identity Data</button>
        </div>
        <div className="form-container">
          <h2>Insert Order Data</h2>
          <input
            type="text"
            name="productId"
            placeholder="Product ID"
            value={orderForm.productId}
            onChange={handleOrderInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={orderForm.quantity}
            onChange={handleOrderInputChange}
          />
          <button onClick={postOrderData}>Submit Order Data</button>
        </div>
        <div className="form-container">
          <h2>Insert Identity Data</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={identityForm.username}
            onChange={handleIdentityInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={identityForm.email}
            onChange={handleIdentityInputChange}
          />
          <button onClick={postIdentityData}>Submit Identity Data</button>
        </div>
      </header>
      <div className="data-container">
        {orderData && <pre>{JSON.stringify(orderData, null, 2)}</pre>}
        {identityData && <pre>{JSON.stringify(identityData, null, 2)}</pre>}
        {Array.isArray(catalogData) && catalogData.length > 0 ? (
          <div className="catalog-list">
            <h3>Catalog:</h3>
            <ul>
              {catalogData.map((product, index) => (
                <li key={index}>
                  <strong>{product.name}</strong>: {product.description} - ${product.price}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No catalog data available. Please add or fetch products.</p>
        )}
      </div>
      <Routes>
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
