import React from 'react';
import './about.css'

class About extends React.Component {
    render(){
        return(
            <div>
                <p className='about'>Inspired by the Pomodoro technique, this timer helps you commit to studying for the amount of time you choose.</p>
                   <p className='about'>Instead of a tomato timer, which is traditionally what the Pomodoro technique used, this study app uses an egg timer. 
                   Set the time limit, press start, and earn a fried egg for every study session you complete!
                </p>
            </div>
        )
    }
}

export default About;