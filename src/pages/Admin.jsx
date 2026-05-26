import { useMemo, useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {AddBusinessOutlined,SaveOutlined,DeleteOutlined,Close,EditOutlined} from '@mui/icons-material';

import './Admin.css';
import axios from "axios";

const emptyProduct = {
  name: '',
  category: '',
  price: '',
  image: '',
  description: '',
  stock: '',
};

const Admin = () => {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState(emptyProduct);

  const [editingId, setEditingId] = useState(null);

  const editingProduct = useMemo(
    () =>
      products.find(
        (product) => product.id === editingId
      ),

    [editingId, products],
  );

  const handleChange = (event) => {

    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

  };

  const resetForm = () => {

    setForm(emptyProduct);

    setEditingId(null);

  };
const fetchProducts = async () => {

  try {

    const res = await axios.get(
      "https://e-commerce-production-68a9.up.railway.app/products"
    );

    setProducts(res.data);

  } catch (error) {

    console.log(error);

  }

};
useEffect(() => {

  fetchProducts();

}, []);
  const handleSubmit = async (event) => {

    event.preventDefault();

    const payload = {

      ...form,

      price: Number(form.price),

      image:
        form.image ||
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80',

    };

    try {

      if (editingId) {

        await axios.put(

          `https://e-commerce-production-68a9.up.railway.app/products/${editingId}`,

          payload

        );
        fetchProducts();
        alert("Product Updated Successfully");

      } else {

        await axios.post(

          "https://e-commerce-production-68a9.up.railway.app/products",

          payload

        );
        fetchProducts();
        alert("Product Added Successfully");

      }

      resetForm();

    } catch (error) {

      console.log(error);

      alert("Operation Failed");

    }

  };

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `https://e-commerce-production-68a9.up.railway.app/products/${id}`
      );
      fetchProducts();
      alert("Product Deleted Successfully");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  const startEditing = (product) => {

    setEditingId(product.id);

    setForm({

      name: product.name,

      category: product.category,

      price: product.price,

      image: product.image,

      description: product.description,

    });

  };

  return (

    <div className="page admin-page">

      <header className="section-heading align-left">
        <h1>Product management</h1>
        <p>
          Add new products, update existing
          products, or delete inventory from
          the premium storefront.
        </p>
      </header>

      <div className="admin-layout">

        <div className="admin-form-card">

          <div className="admin-form-title">

            <AddBusinessOutlined fontSize="large" />

            <div>

              <h2>
                {editingProduct
                  ? 'Update product'
                  : 'Add product'}
              </h2>

              <p>
                {editingProduct
                  ? editingProduct.name
                  : 'Create a new storefront item'}
              </p>

            </div>

          </div>

          <form
            className="form-stack"
            onSubmit={handleSubmit}
          >

            <label>

              <span>Product name</span>

              <input
                className="input-field"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                required
              />

            </label>

            <label>

              <span>Category</span>

              <input
                className="input-field"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Audio, Style, Home..."
                required
              />

            </label>

            <label>

              <span>Price (₹)</span>

              <input
                className="input-field"
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={handleChange}
                placeholder="299"
                required
              />

            </label>

            <label>

              <span>Image URL</span>

              <input
                className="input-field"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
              />

            </label>

            <label>

              <span>Description</span>

              <textarea
                className="input-field"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short premium product description"
                required
              />

            </label>

            <div className="form-actions">

              {editingId && (

                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >

                  <Close fontSize="small" />

                  Cancel

                </button>

              )}

              <button
                type="submit"
                className="primary-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >

                <SaveOutlined fontSize="small" />

                {editingId
                  ? 'Save Update'
                  : 'Add Product'}

              </button>

            </div>

          </form>

        </div>

        <section className="admin-products">

          {products.map((product) => (

            <article
              key={product.id}
              className="admin-product-row"
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="product-details">

                <span>{product.category}</span>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

              </div>

              <strong>
                ₹{product.price.toLocaleString('en-IN')}
              </strong>

              <div className="row-actions">

                <button
                  className="icon-button"
                  onClick={() =>
                    startEditing(product)
                  }
                  aria-label={`Edit ${product.name}`}
                >

                  <EditOutlined />

                </button>

                <button
                  className="icon-button danger"
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  aria-label={`Delete ${product.name}`}
                >

                  <DeleteOutlined />

                </button>

              </div>

            </article>

          ))}

        </section>

      </div>

    </div>

  );

};

export default Admin;