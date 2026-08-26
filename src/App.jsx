import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SkipLink from './components/SkipLink.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import ItemDetail from './pages/ItemDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Confirmation from './pages/Confirmation.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()
  const mainRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Move focus to the main region on route changes (but not on the very
    // first render) so assistive technology users get a clear signal that
    // the page content has changed, without stealing focus unexpectedly
    // on initial load.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (mainRef.current) {
      mainRef.current.focus()
    }
  }, [location.pathname])

  return (
    <div className="app-shell">
      <SkipLink />
      <Header />
      <main id="main-content" className="main-content" ref={mainRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:itemId" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<Confirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
