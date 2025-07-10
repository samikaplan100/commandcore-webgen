const GameList = () => {
  const games = [
    {
      title: "Polar Pursuit",
      image: "https://images.unsplash.com/photo-1505881874301-5b31364f53c4?auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      platform: "PC, PS5, Xbox",
      description: "A fast-paced racing game set in the Arctic Circle."
    },
    {
      title: "Antarctic Adventures",
      image: "https://images.unsplash.com/photo-1484936151872-3c6325c5751f?auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      platform: "PC, Nintendo Switch",
      description: "Explore the frozen wonders of Antarctica in this open-world game."
    },
    {
      title: "Snowflake Showdown",
      image: "https://images.unsplash.com/photo-1582719478294-66a9a9e402d1?auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      platform: "PC, Mobile",
      description: "A casual puzzle game with a wintery twist."
    }
  ];

  return (
    <div className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Popular Games</h2>
        <div className="row g-4">
          {games.map((game, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 game-card">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{game.title}</h5>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">{game.platform}</span>
                    <div className="text-warning">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`bi bi-star-fill ${i < Math.floor(game.rating) ? 'text-warning' : 'text-muted'}`}></span>
                      ))}
                    </div>
                  </div>
                  <p className="card-text">{game.description}</p>
                  <a href="#" className="btn btn-outline-primary btn-sm">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;