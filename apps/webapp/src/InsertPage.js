import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function InsertPage() {
  const [catalogForm, setCatalogForm] = useState({ name: '', description: '', price: '' });

  const handleCatalogInputChange = (e) => {
    const { name, value } = e.target;
    setCatalogForm({ ...catalogForm, [name]: value });
  };

  const postCatalogData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_CATALOG_API}`, catalogForm);
      console.log('Catalog data posted:', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error posting catalog data:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Insert New Product</h1>
        <div className="form-container">
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
          <button onClick={postCatalogData}>Submit</button>
        </div>
      </header>
    </div>
  );
}

export default InsertPage;