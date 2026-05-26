import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'MacBook Air M3', category: 'Laptops', price: 114900, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80', description: 'Supercharged by M3 chip, 13.6-inch Liquid Retina display.' },
    { id: 2, name: 'Dell XPS 13', category: 'Laptops', price: 135000, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=900&auto=format&fit=crop&q=80', description: 'Bezel-less InfinityEdge display, 12th Gen Intel Core i7.' },
    { id: 3, name: 'ASUS ROG Zephyrus', category: 'Laptops', price: 159990, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&auto=format&fit=crop&q=80', description: 'Ultra-slim gaming laptop with RTX 40-series graphics.', stock: 5 },
    { id: 4, name: 'HP Spectre x360', category: 'Laptops', price: 124999, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&auto=format&fit=crop&q=80', description: '2-in-1 convertible with stunning 4K OLED touch display.' },
    { id: 5, name: 'Microsoft Surface Laptop', category: 'Laptops', price: 98000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&auto=format&fit=crop&q=80', description: 'Sleek design with Alcantara keyboard and vibrant PixelSense screen.' },
    { id: 6, name: 'Lenovo Legion Slim', category: 'Laptops', price: 145000, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80', description: 'Portable power for gamers and creators alike.' },
    { id: 7, name: 'Apple AirPods Pro 2', category: 'Airdopes', price: 24900, image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=900&auto=format&fit=crop&q=80', description: 'Active Noise Cancellation and personalized Spatial Audio.' },
    { id: 8, name: 'Sony WF-1000XM5', category: 'Airdopes', price: 21990, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&auto=format&fit=crop&q=80', description: 'Industry-leading noise cancellation and breathtaking sound quality.' },
    { id: 9, name: 'Samsung Galaxy Buds 2 Pro', category: 'Airdopes', price: 14999, image: 'https://m.media-amazon.com/images/I/61WRrNa6BIL._SX522_.jpg', description: 'Seamless 24-bit Hi-Fi audio with comfortable fit.' },
    { id: 10, name: 'boAt Airdopes 441', category: 'Airdopes', price: 1999, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=900&auto=format&fit=crop&q=80', description: 'IWP technology, IPX7 water resistance, and energetic bass.' },
    { id: 11, name: 'JBL Live Free 2', category: 'Airdopes', price: 8499, image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=900&auto=format&fit=crop&q=80', description: 'Signature JBL sound with adaptive noise cancellation.' },
    { id: 12, name: 'Nike Air Jordan 1 Low', category: 'Shoes', price: 10295, image: 'data:image/webp;base64,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', description: 'Legendary style with premium leather and iconic Air cushioning.' },
    { id: 13, name: 'Nike Ultraboost 5.0', category: 'Shoes', price: 17999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80', description: 'Unbeatable energy return and comfortable Primeknit upper.' },
    { id: 14, name: 'Nike RS-X Reinvent', category: 'Shoes', price: 8999, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=80', description: 'Retro-future design with bulky silhouette and bold colors.' },
    { id: 15, name: 'Wildcraft Terra Backpack', category: 'Bags', price: 2999, image: 'https://m.media-amazon.com/images/I/71KMyqg1DuL._AC_UL320_.jpg', description: 'Durable trekking backpack with ergonomic support.' },
    { id: 16, name: 'American Tourister 32L', category: 'Bags', price: 2499, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&auto=format&fit=crop&q=80', description: 'Spacious laptop backpack with multiple organizers.' },
    { id: 17, name: 'Premium Leather Tote', category: 'Bags', price: 4500, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80', description: 'Handcrafted full-grain leather tote for daily essentials.' },
    { id: 18, name: 'CG Bag', category: 'Bags', price: 3200, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop&q=80', description: 'Slim and professional messenger bag for office use.' },
    { id: 19, name: 'Gym Duffel Pro', category: 'Bags', price: 1899, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=900&auto=format&fit=crop&q=80', description: 'Dedicated shoe compartment and water-resistant fabric.' },
    { id: 20, name: 'Canvas Travel Weekender', category: 'Bags', price: 3999, image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900&auto=format&fit=crop&q=80', description: 'Spacious and stylish bag for short getaways.' },
    { id: 21, name: 'Abstract Canvas Art', category: 'Wall Decors', price: 4599, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&auto=format&fit=crop&q=80', description: 'Large modern abstract painting on high-quality canvas.' },
    { id: 22, name: 'Vintage Metal Wall Clock', category: 'Wall Decors', price: 2899, image: 'https://m.media-amazon.com/images/I/615DzQn1C6L._AC_UL320_.jpg', description: 'Oversized industrial style clock with silent movement.' },
    { id: 23, name: 'Macrame Wall Hanging', category: 'Wall Decors', price: 1499, image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=900&auto=format&fit=crop&q=80', description: 'Hand-woven bohemian macrame art for a cozy vibe.' },
    { id: 24, name: 'Round Sunburst Mirror', category: 'Wall Decors', price: 5499, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&auto=format&fit=crop&q=80', description: 'Decorative sunburst wall mirror with gold finish.' },
    { id: 25, name: 'Framed Forest Print', category: 'Wall Decors', price: 1999, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&auto=format&fit=crop&q=80', description: 'Soothing nature photography in a minimalist black frame.' },
  ],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.unshift({ ...action.payload, id: Date.now(), price: Number(action.payload.price) });
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...action.payload, price: Number(action.payload.price) };
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
