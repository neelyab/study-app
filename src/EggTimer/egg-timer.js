import React, {Component} from 'react'
import soundfile from '../audio/service-bell.mp3'
import Sound from 'react-sound'
import EggCount from '../EggCount/egg-count'
import './egg-timer.css'


class EggTimer extends Component {
    constructor(props){
        super(props);
        this.state = {
            timerOptions: true,
            break: false,
            study: false,
            eggCount: 0,
            minutes: 0,
            seconds: 0,
            playStatus: Sound.status.STOPPED,
            time: 1,
            stopped: false,
            count: 0
        }
    }
    intervalTimer = 0

    handleTimeValue = time => {
        this.setState({
            time: Number(time),
            playStatus: Sound.status.STOPPED
        })
    }
    //function when the timer is done
    handleTimeOut(){
        this.setState({
            playStatus: Sound.status.PLAYING,
            break: true,
            study: false,
            eggCount: this.state.eggCount + 1,
            timerOptions: true
        })
        clearInterval(this.intervalTimer)
    }
    // create the minutes and seconds for the timer
    timer(futureTime){
        const timeNow = Date.now();
        const count = futureTime - timeNow;

        this.setState({
            count
        })

        const seconds = Math.round((count/1000) % 60);
        const minutes = Math.floor((count/1000)/60);
        const timeLeft = this.state.count;
        let currentSeconds = seconds < 10 ? `0${seconds}`: seconds;
        let currentMinutes = minutes < 10 ? `0${minutes}`: minutes;
        this.setState({
            seconds:currentSeconds, 
            minutes:currentMinutes,
            count
        })
       return {
           timeLeft
       }
    }
    
    handleStop = ()=> {
        this.setState({
            stopped: true,
            timerOptions: true,
            study: false,
            count: 0,
            seconds: 0,
            minutes: 0,
            playStatus: Sound.status.STOPPED

        })
        clearInterval(this.intervalTimer)
    }

   handleStart(e){
    e.preventDefault()
    this.setState({
        playStatus: Sound.status.STOPPED,
        study: true,
        break: false,
        stopped: false,
        minutes: 0,
        seconds: 0,
        count: 0,
        timerOptions: false
    })
    const studyTime = this.state.time;

    //calculate the timer
    const futureTime = Date.now() + (studyTime * 60 * 1000)
    const timerFunction = () => this.timer(futureTime)
    const handleTimeOut = () => this.handleTimeOut()
    const {seconds, minutes} = this.state

    // set timeinterval for timer
    this.intervalTimer = setInterval(function(){
        const timer = timerFunction(futureTime)
        if (timer.timeLeft < 900){
            handleTimeOut();
        } 
        }, 1000)
    }   
    render(){
        return(
        <div>
            <div className='egg-count'>
                <EggCount eggCount={this.state.eggCount} />
            </div>
            <div className = 'egg-timer'>
                <form className='egg-timer-form' onSubmit={(e)=>{this.handleStart(e)}}>
                {this.state.timerOptions &&
                <div>
                    <label htmlFor='time-limit'>Select time limit:</label>
                    <select className='time-limit' onChange={(e) =>this.handleTimeValue(e.target.value)}>
                        <option name='1 minute' value={1}>1 minute</option>
                        <option name='5 minutes' value={5}>5 minute</option>
                        <option name='15 minutes' value={15}>15 minutes</option>
                        <option name='30 minutes' value={30}>30 minutes</option>
                    </select>
                    </div>}
                    <Sound url={soundfile} playStatus={this.state.playStatus} debugMode={false}/>

                    {this.state.study && 
                    <span className='time'><p>{`${this.state.minutes}:${this.state.seconds}`}</p></span>}

                    {this.state.break &&
                    <p class='break'>BREAK!</p>}

                    {this.state.study === false &&
                    <button type='submit'>Start</button>
                    }
                    {this.state.study && 
                    <button onClick={()=>{this.handleStop()}}>Stop/Reset</button>
                    }
                </form>
            </div>
        </div>
        )
    }
}

export default EggTimer