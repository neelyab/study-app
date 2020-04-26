import React from 'react';
import EggTimer from './EggTimer/egg-timer'
import './app.css'
import {Route, Link} from 'react-router-dom'
import About from './About/about'
function App() {
  return (
    <main className='App'>
      <nav>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </nav>
      <div className='body'>
        <Route 
        exact path='/'
        component={EggTimer}/>
      <Route
      path='/about'
      component={About}/>
      </div>
    </main>
  );
}

export default App;