import { useForm } from '@react-hook/form';

const Contact = () => {
  const { register, handleSubmit, errors } = useForm({
    onSubmit: async (data) => {
      // In a real app, send to backend API
      console.log('Form submitted:', data);
      alert('Thank you for contacting us!');
    }
  });

  return (
    <div className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  className="form-control" 
                  id="message"
                  rows="5"
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    }
                  })}
                ></textarea>
                {errors.message && <div className="text-danger">{errors.message}</div>}
              </div>
              
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;