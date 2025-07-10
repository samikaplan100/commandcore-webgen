import React from 'react';
import { useData } from '../context/DataContext.jsx';

export default function Home() {
  const { data, fetchData } = useData();
  return (
    <section className="home">
      <h2>Welcome Home</h2>
      <button onClick={fetchData}>Load Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}