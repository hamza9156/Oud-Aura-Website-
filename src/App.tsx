import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                  <div className="text-luxury-gold text-6xl font-serif">404</div>
                  <h1 className="text-luxury-ivory text-2xl font-serif">Page Not Found</h1>
                  <a href="/" className="btn-primary mt-4">Go Home</a>
                </div>
              } />
            </Routes>
          </div>
          <Footer />
          <CartDrawer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
