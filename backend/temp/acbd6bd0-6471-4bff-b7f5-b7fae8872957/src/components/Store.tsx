import React, { useState } from 'react'
import StoreItem from './StoreItem'
import { purchaseGame } from '../services/storeService'
import '../styles/Store.css'

const Store: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Penguin Skates', price: 19.99, stock: 100 },
    { id: 2, name: 'Antarctic Adventure', price: 29.99, stock: 50 }
  ])

  const handlePurchase = (itemId: number) => {
    purchaseGame(itemId).then(() => {
      setItems(items.map(item => 
        item.id === itemId ? { ...item, stock: item.stock - 1 } : item
      ))
    })
  }

  return (
    <div className="store">
      <h1>Penguin Game Store</h1>
      <div className="store-grid">
        {items.map(item => (
          <StoreItem key={item.id} item={item} onPurchase={handlePurchase} />
        ))}
      </div>
    </div>
  )
}

export default Store