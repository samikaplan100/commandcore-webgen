const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="text-center">
          <h1 className="display-4">Welcome to Penguin Gamers</h1>
          <p className="lead">Your ultimate gaming community</p>
          <a className="btn btn-light btn-lg" href="/games" role="button">
            Explore Games
          </a>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Join Us?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Expert Community</h5>
                  <p className="card-text">Connect with experienced gamers worldwide.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Game Tutorials</h5>
                  <p className="card-text">Learn advanced techniques and strategies.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Monthly Contests</h5>
                  <p className="card-text">Compete for exciting prizes and recognition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;