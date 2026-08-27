import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import ItemDetail from './pages/ItemDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Invoice from './pages/Invoice'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="app-shell">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/item/:dishId" element={<ItemDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/invoice/:orderId" element={<Invoice />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </HashRouter>
  )
}
