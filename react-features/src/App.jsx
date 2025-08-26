

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ProductFilter from './features/ProductFilter';
import StateDemo from './features/StateDemo';
import EffectDemo from './features/EffectDemo';
import ParllelAPI from './features/ParllelAPI';


function App() {
  const products = [
    { id: 1, name: 'iPhone 15', category: 'electronics', price: 999, rating: 4.8 },
    { id: 2, name: 'Samsung Galaxy S24', category: 'electronics', price: 899, rating: 4.7 },
    { id: 3, name: 'Nike Air Max', category: 'clothing', price: 150, rating: 4.5 },
    { id: 4, name: 'Adidas Ultraboost', category: 'clothing', price: 180, rating: 4.6 },
    { id: 5, name: 'React Handbook', category: 'books', price: 29, rating: 4.9 },
    { id: 6, name: 'MacBook Pro', category: 'electronics', price: 2499, rating: 4.9 },
    { id: 7, name: "Levi's Jeans", category: 'clothing', price: 89, rating: 4.3 },
    { id: 8, name: 'JavaScript Guide', category: 'books', price: 39, rating: 4.7 },
  ];

  return (
    <BrowserRouter>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="flex pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-filter" element={<><Sidebar /><main className='flex-1 p-8'><ProductFilter products={products} /></main></>} />
            <Route path="/state-demo" element={<><Sidebar /><main className='flex-1 p-8'><StateDemo /></main></>} />
            <Route path="/effect-demo" element={<><Sidebar /><main className='flex-1 p-8'><EffectDemo /></main></>} />
            <Route path="/parllel-api" element={<><Sidebar /><main className='flex-1 p-8'><ParllelAPI /></main></>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
