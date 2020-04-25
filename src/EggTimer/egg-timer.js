import React, {Component} from 'react'
import soundfile from '../audio/service-bell.mp3'
import Sound from 'react-sound'


class EggTimer extends Component {
    constructor(props){
        super(props);
        this.state = {
            break: false,
            study: false,
            eggCount: 0,
            minutes: 0,
            seconds: 0,
            playStatus: Sound.status.STOPPED,
            time: 1
        }
    }
    handleTimeValue = time =>{
        this.setState({
            time: Number(time)
        })
    }
    //function when the timer is done
    handleTimeOut(){
        console.log('time has stopped')
        this.setState({
            playStatus: Sound.status.PLAYING,
            break: true,
            study: false,
            eggCount: this.state.eggCount + 1
        })
    }
    // create the minutes and seconds for the timer
    timer(futureTime){
        const timeNow = Date.now();
        const count = futureTime - timeNow;
        const seconds = Math.round((count/1000) % 60);
        const minutes = Math.floor((count/1000)/60)
        this.setState({
            seconds, minutes
        })
       return {
           seconds,
           minutes,
           count
       }
    }
    
   handleStart(e){
       e.preventDefault()
    this.setState({
        playStatus: Sound.status.STOPPED,
        study: true,
        break: false,
        minutes: 0,
        seconds: 0
    })
    const studyTime = this.state.time;
    //calculate the timer
    const futureTime = Date.now() + (studyTime * 60 * 1000)
    const timerFunction = () => this.timer(futureTime)
    const handleTimeOut = () => this.handleTimeOut()
    // set timeinterval for timer
    const timeInterval = setInterval(function(){
        const timer = timerFunction()
        if (timer.count < 1000){
            clearInterval(timeInterval)
            handleTimeOut();
        } 
    }, 1000)
   }    
    render(){
        return(
            <div>
                <form onSubmit={(e)=>{this.handleStart(e)}}>
                <select onChange={(e) =>this.handleTimeValue(e.target.value)}>
                    <option name='1 minute' value={1}>1 minute</option>
                    <option name='5 minutes' value={5}>5 minute</option>
                    <option name='15 minutes' value={15}>15 minutes</option>
                    <option name='30 minutes' value={30}>30 minutes</option>
                </select>
                <Sound url={soundfile} playStatus={this.state.playStatus} debugMode={false}/>
                {this.state.study && 
                <span className='time'><p>{`${this.state.minutes}:${this.state.seconds}`}</p></span>}
                {this.state.break &&
                <p>BREAK!</p>}
                <button type='submit'>Start</button>
                </form>
            </div>
        )
    }
}

export default EggTimer