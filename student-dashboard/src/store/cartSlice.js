import { createSlice } from '@reduxjs/toolkit';

// Initial items available in the Academic Campus Store
export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Core Database System Concepts (8th Ed)',
    category: 'Textbooks',
    price: 650,
    rating: 4.8,
    courseCode: '24CSE0209',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    description: 'Comprehensive textbook covering SQL, ACID properties, indexing, and NoSQL fundamentals.'
  },
  {
    id: 'prod-2',
    name: 'Discrete Mathematical Structures Guide',
    category: 'Textbooks',
    price: 499,
    rating: 4.6,
    courseCode: '24MTH0104',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=400',
    description: 'Solved problems on graph theory, combinatorics, relations, and proof methods.'
  },
  {
    id: 'prod-3',
    name: 'Arduino Mega Embedded Robotics Lab Kit',
    category: 'Lab Kits',
    price: 1850,
    rating: 4.9,
    courseCode: '24CSE0211',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=400',
    description: 'Complete microcontroller hardware kit with breadboard, sensors, jumper wires, and OLED display.'
  },
  {
    id: 'prod-4',
    name: 'Modern React & Redux Toolkit Companion',
    category: 'Textbooks',
    price: 550,
    rating: 4.9,
    courseCode: '25CSE0203',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    description: 'Front End Engineering II quick reference book covering SPA routing, Context API, and RTK.'
  },
  {
    id: 'prod-5',
    name: 'Apex University CSE Zip Hoodie',
    category: 'Merchandise',
    price: 999,
    rating: 4.7,
    courseCode: 'CAMPUS',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400',
    description: 'Premium fleece hoodie with embroidered Apex University CSE Crest and thumb holes.'
  },
  {
    id: 'prod-6',
    name: 'Engineering Laboratory Record Notebook (Pack of 3)',
    category: 'Stationery',
    price: 240,
    rating: 4.5,
    courseCode: 'GENERAL',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    description: 'Hardbound ruled practical records approved by CUIET Examination Cell.'
  }
];

const initialState = {
  items: [
    {
      ...INITIAL_PRODUCTS[0],
      quantity: 1
    }
  ],
  couponCode: '',
  discountPercent: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = '';
      state.discountPercent = 0;
    },
    applyCoupon: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      state.couponCode = code;
      if (code === 'CSE2026' || code === 'CHITKARA15') {
        state.discountPercent = 15;
      } else if (code === 'APEX10') {
        state.discountPercent = 10;
      } else {
        state.discountPercent = 0;
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon
} = cartSlice.actions;

// Redux Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectDiscountAmount = (state) => {
  const subtotal = selectSubtotal(state);
  return Math.round((subtotal * (state.cart.discountPercent || 0)) / 100);
};

export const selectCartTotal = (state) => {
  const subtotal = selectSubtotal(state);
  const discount = selectDiscountAmount(state);
  return Math.max(0, subtotal - discount);
};

export const selectDiscountPercent = (state) => state.cart.discountPercent;
export const selectCouponCode = (state) => state.cart.couponCode;

export default cartSlice.reducer;
