import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

const emptyForm = {
  name: '',
  price: '',
  category: 'Electronics',
  image: '',
  description: '',
  featured: false,
  trending: false,
};

export default function AdminDashboard() {
  const { addProduct, deleteProduct, products, updateProduct } = useStore();
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  function handleChange(event) {
    const { checked, name, type, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    if (editingId) {
      updateProduct(editingId, payload);
      setEditingId(null);
    } else {
      addProduct(payload);
    }

    setFormData(emptyForm);
  }

  function startEditing(product) {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      featured: Boolean(product.featured),
      trending: Boolean(product.trending),
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setFormData(emptyForm);
  }

  return (
    <div className="container-shell grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="glass-card h-fit p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Admin</p>
        <h1 className="section-title mt-2">Manage storefront products</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Products</p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              {products.length}
            </p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Featured</p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              {products.filter((product) => product.featured).length}
            </p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Trending</p>
            <p className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              {products.filter((product) => product.trending).length}
            </p>
          </div>
        </div>

        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          <FormInput
            label="Product name"
            name="name"
            onChange={handleChange}
            placeholder="Enter product name"
            required
            value={formData.name}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormInput
              label="Price in USD"
              min="1"
              name="price"
              onChange={handleChange}
              placeholder="e.g. 199"
              required
              type="number"
              value={formData.price}
            />
            <FormInput
              as="select"
              label="Category"
              name="category"
              onChange={handleChange}
              options={[
                { value: 'Electronics', label: 'Electronics' },
                { value: 'Clothing', label: 'Clothing' },
                { value: 'Accessories', label: 'Accessories' },
              ]}
              value={formData.category}
            />
          </div>
          <FormInput
            label="Image URL"
            name="image"
            onChange={handleChange}
            placeholder="https://example.com/product.jpg"
            required
            value={formData.image}
          />
          <FormInput
            as="textarea"
            className="min-h-[130px] resize-none"
            label="Description"
            name="description"
            onChange={handleChange}
            placeholder="Describe the product"
            required
            value={formData.description}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
              <input
                checked={formData.featured}
                className="h-4 w-4 rounded accent-brand-500"
                name="featured"
                onChange={handleChange}
                type="checkbox"
              />
              <span className="font-semibold">Featured product</span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
              <input
                checked={formData.trending}
                className="h-4 w-4 rounded accent-brand-500"
                name="trending"
                onChange={handleChange}
                type="checkbox"
              />
              <span className="font-semibold">Trending product</span>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" variant="accent">
              <Plus size={16} />
              {editingId ? 'Update product' : 'Add product'}
            </Button>
            {editingId ? (
              <Button onClick={cancelEditing} variant="secondary">
                Cancel edit
              </Button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-500">
              Inventory
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              Current catalog
            </h2>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-[28px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <img
                  alt={product.name}
                  className="h-28 w-full rounded-[24px] object-cover sm:w-32"
                  src={product.image}
                />
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
                        {product.category}
                      </span>
                      {product.featured ? (
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white dark:bg-white dark:text-slate-950">
                          Featured
                        </span>
                      ) : null}
                      {product.trending ? (
                        <span className="rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-300">
                          Trending
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {formatCurrency(product.price)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => startEditing(product)} variant="secondary">
                      <Pencil size={16} />
                      Edit
                    </Button>
                    <Button onClick={() => deleteProduct(product.id)} variant="danger">
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
