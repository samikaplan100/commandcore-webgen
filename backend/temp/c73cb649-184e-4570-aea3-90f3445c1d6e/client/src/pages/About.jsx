const About = () => {
  return (
    <div className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">About Penguin Gamers</h2>
        <div className="row">
          <div className="col-md-6">
            <p>
              Penguin Gamers is a passionate community of gamers who love to play, learn, and grow together. 
              Founded in 2023, we've grown to become one of the fastest-growing gaming platforms online.
            </p>
            <p>
              Our mission is to create an inclusive environment where gamers of all levels can connect, 
              share knowledge, and participate in exciting gaming activities.
            </p>
          </div>
          <div className="col-md-6">
            <img 
              src="https://images.unsplash.com/photo-1591622906253-5bc6685a9f5d?auto=format&fit=crop&w=800&q=80" 
              alt="Gaming community" 
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;