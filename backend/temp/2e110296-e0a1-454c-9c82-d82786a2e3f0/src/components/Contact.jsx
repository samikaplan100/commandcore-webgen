import React from 'react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <section className="contact">
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Name" />
        <input {...register('email')} placeholder="Email" />
        <textarea {...register('message')} placeholder="Message" />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}