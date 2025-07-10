import React from 'react'
import Header from './components/Header'
import GameHub from './components/GameHub'
import Store from './components/Store'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GameHub />} />
        <Route path="/store" element={<Store />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App