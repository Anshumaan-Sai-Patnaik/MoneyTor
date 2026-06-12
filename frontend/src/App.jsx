import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './landingPage/!main'
import Signup from './landingPage/!main'
import About from './aboutPage/!main'
import Product from './productPage/!main'
import Pricing from './pricingPage/!main'
import Support from './landingPage/!main'
import NotFound from './notFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/support" element={<Support />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
