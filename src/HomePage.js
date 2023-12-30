import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Wybierz quiz</h1>
      <Link to="/quiz1">Quiz 1</Link>
    </div>
  );
}

export default HomePage;
