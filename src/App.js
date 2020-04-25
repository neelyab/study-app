import React from 'react';
import EggTimer from './EggTimer/egg-timer'
import './app.css'

function App() {
  return (
    <main className='App'>
      <nav>
        <li>About</li>
        <li>Home</li>
      </nav>
      <div className='body'>
        <EggTimer/>
      </div>
    </main>
  );
}

export default App;