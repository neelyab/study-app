import React from 'react';
import EggTimer from './EggTimer/egg-timer'

function App() {
  return (
    <main className='App'>
      <nav>
        <li>About</li>
        <li>Home</li>
      </nav>
      <div className='egg-timer'>
        <EggTimer/>
      </div>
    </main>
  );
}

export default App;