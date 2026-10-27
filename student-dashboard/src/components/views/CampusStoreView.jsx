import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  INITIAL_PRODUCTS,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  selectCartItems,
  selectCartCount,
  selectSubtotal,
  selectDiscountAmount,
  selectCartTotal,
  selectDiscountPercent,
  selectCouponCode
} from '../../store/cartSlice';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';
import InputField from '../common/InputField';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package
} from 'lucide-react';

export default function CampusStoreView() {
  const dispatch = useDispatch();
  const { showSuccess, showInfo } = useToast();

  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const subtotal = useSelector(selectSubtotal);
  const discountAmount = useSelector(selectDiscountAmount);
  const total = useSelector(selectCartTotal);
  const discountPercent = useSelector(selectDiscountPercent);
  const couponCode = useSelector(selectCouponCode);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [couponInput, setCouponInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const categories = ['All', 'Textbooks', 'Lab Kits', 'Merchandise', 'Stationery'];

  const filteredProducts = selectedCategory === 'All'
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    showSuccess(`Added "${product.name}" to cart!`);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    dispatch(applyCoupon(couponInput));
    if (couponInput.toUpperCase() === 'CSE2026' || couponInput.toUpperCase() === 'CHITKARA15') {
      showSuccess(`Coupon ${couponInput.toUpperCase()} applied: 15% Student Discount!`);
    } else if (couponInput.toUpperCase() === 'APEX10') {
      showSuccess(`Coupon ${couponInput.toUpperCase()} applied: 10% Discount!`);
    } else {
      showInfo('Invalid coupon code. Try "CSE2026" or "CHITKARA15"');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      dispatch(clearCart());
      showSuccess('Order placed successfully via Campus Academic Credit!');
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Syllabus Alignment Badge & Title */}
      <div className="dashboard-card" style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)',
        borderLeft: '5px solid var(--accent-purple)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', fontWeight: 700 }}>
                ⚡ Mini Project: Shopping Cart (Redux Toolkit)
              </span>
              <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                Global State Architecture
              </span>
            </div>
            <h2 className="heading-lg" style={{ margin: 0 }}>Campus Academic Store & Bookstore</h2>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Procure prescribed course textbooks, embedded hardware kits, and student supplies with Redux state tracking.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-card)',
            padding: '10px 18px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--card-shadow)'
          }}>
            <ShoppingBag size={22} style={{ color: 'var(--accent-purple)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Cart Status</span>
              <strong style={{ fontSize: '1rem', color: 'var(--text-heading)' }}>
                {cartCount} Items • ₹{total}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Products on Left (7 cols), Shopping Cart on Right (5 cols) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        alignItems: 'flex-start'
      }}>
        
        {/* Products Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: `1.5px solid ${selectedCategory === cat ? 'var(--primary)' : 'var(--border-color)'}`,
                  backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '18px'
          }}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="dashboard-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div style={{
                  height: '140px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  position: 'relative'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {product.courseCode}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                      {product.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>
                      ★ {product.rating}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                    {product.name}
                  </h4>

                  <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.4, margin: '0 0 14px 0', flex: 1 }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)' }}>
                      ₹{product.price}
                    </span>

                    <Button
                      size="sm"
                      icon={Plus}
                      onClick={() => handleAddToCart(product)}
                      style={{ padding: '6px 12px' }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart Drawer / Panel (Right Column) */}
        <div className="dashboard-card" style={{
          position: 'sticky',
          top: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          borderRadius: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={20} style={{ color: 'var(--primary)' }} />
              <h3 className="heading-md" style={{ margin: 0, fontSize: '1.1rem' }}>
                Your Cart ({cartCount})
              </h3>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={() => dispatch(clearCart())}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Trash2 size={13} /> Clear
              </button>
            )}
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)' }}>
              <Package size={42} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>Your cart is empty</p>
              <span style={{ fontSize: '0.8rem' }}>Browse textbooks and lab kits on the left to add items.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ₹{item.price} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-card)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-main)'
                      }}
                    >
                      <Minus size={12} />
                    </button>

                    <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-card)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-main)'
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.875rem', minWidth: '55px', textAlign: 'right' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Code Section */}
          {cartItems.length > 0 && (
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Coupon (e.g. CSE2026)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '0.825rem',
                  outline: 'none'
                }}
              />
              <Button type="submit" variant="secondary" size="sm">
                Apply
              </Button>
            </form>
          )}

          {/* Price Breakdown */}
          {cartItems.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                  <span>Student Discount ({discountPercent}%)</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Campus Delivery</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>FREE (Hostel / Dept)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '4px' }}>
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleCheckout}
                isLoading={isCheckingOut}
                icon={Sparkles}
                style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
              >
                Proceed to Checkout
              </Button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <ShieldCheck size={14} style={{ color: '#10b981' }} />
                <span>Verified with Apex University Academic Credit</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Complete Modal */}
      {orderComplete && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div className="dashboard-card" style={{ width: '420px', textAlign: 'center', padding: '32px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 className="heading-md" style={{ marginBottom: '8px' }}>Order Placed Successfully!</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '20px' }}>
              Your order token <strong>#ORD-2026-CSE89</strong> has been generated. Materials will be delivered to your CSE departmental locker within 24 hours.
            </p>

            <Button
              variant="primary"
              onClick={() => setOrderComplete(false)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Back to Campus Store
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
