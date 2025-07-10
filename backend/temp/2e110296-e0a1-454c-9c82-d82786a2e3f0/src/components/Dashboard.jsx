import React from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      {user ? <p>Welcome, {user.name}!</p> : <p>Please log in to view the dashboard.</p>}
    </section>
  );
}