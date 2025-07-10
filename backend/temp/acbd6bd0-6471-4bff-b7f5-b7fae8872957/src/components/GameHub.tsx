import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'
import { fetchGames } from '../services/gameService'
import '../styles/GameHub.css'

const GameHub: React.FC = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetchGames().then(data => setGames(data))
  }, [])

  return (
    <div className="game-hub">
      <h1>Latest Penguin Games</h1>
      <div className="game-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default GameHub