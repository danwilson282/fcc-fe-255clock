//import React from 'react';
import React, { useState, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';


function App() {

  return (
    <div className="App App-header">
      <header>
        <div className='h1'>25+5 Timer</div>
      </header>
      <SetTimer/>
    </div>
  );
}



class SetTimer extends React.Component {
  constructor(props) {
    super(props);
    //apply this to functions
    //this.handleChange = this.handleChange.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this)
    this.breakIncrement = this.breakIncrement.bind(this)
    this.sessionDecrement = this.sessionDecrement.bind(this)
    this.sessionIncrement = this.sessionIncrement.bind(this)
    this.reset = this.reset.bind(this)
    this.start_stop = this.start_stop.bind(this)
    this.state = {
      break: 5,
      session: 25,
      timerSecs: 1500,
      breakSwitch: false,
      startStop: false,
    }
  }
  
  // functions
 
  componentDidMount(){
    this.setState({
      timerSecs: this.state.session*60
    });
    this.interval = setInterval(() => this.tick(), 100);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  breakDecrement(){
    if (this.state.break>1){
      this.setState({
        break: this.state.break -1
      })
    }
  }
  sessionDecrement(){

    if (this.state.session>1){
      this.setState({
        session: this.state.session -1,
        timerSecs: (this.state.session-1)*60
      })
    }
  }
  breakIncrement(){
    if (this.state.break<60){
      this.setState({
        break: this.state.break +1
      })
    }
  }
  sessionIncrement(){
    if (this.state.session<60){
      this.setState({
        session: this.state.session +1,
        timerSecs: (this.state.session+1)*60
      })
    
  }
}
reset(){
  var audio = document.getElementById('beep')
  audio.pause();
  audio.currentTime = 0
  document.getElementById('timer-label').innerHTML = "Session"
  this.setState({
    break: 5,
      session: 25,
      timerSecs: 1500,
      breakSwitch: false,
      startStop: false,
  })
}
start_stop(){
  this.setState({
      startStop: !this.state.startStop,
  })
}
returnTime(){
  let time = this.state.timerSecs
  let mins = Math.floor(time/60)
  let secs = time % 60
  if (mins<10){
    mins='0'+mins
  }
  if (secs<10){
    secs='0'+secs
  }
  
  return mins+':'+secs
}
tick() {
  if (this.state.startStop){
    if (this.state.timerSecs<1){
      this.beep()
      //on a session go to break
      if (this.state.breakSwitch==false){
          this.setState({
          breakSwitch: true,
          timerSecs: this.state.break*60+1
      })
      document.getElementById('timer-label').innerHTML = "Break"
      }
      //on a break go to session
      else if (this.state.breakSwitch==true){
        this.setState({
        breakSwitch: false,
        timerSecs: this.state.session*60+1
    })
    document.getElementById('timer-label').innerHTML = "Session"
    }
      
    }
    this.setState(state => ({
      timerSecs: state.timerSecs - 1
    }));
  }
  
}
beep(){
  var audio = document.getElementById('beep')
  audio.pause();
  audio.currentTime = 0
  audio.play();
}

  render() {
    return (
      <div>
        <audio id="beep" src={"./audio/beep.wav"}></audio>
        <div className='row'>
          <div className='col-6'>
            <div id="break-label"><p>Break Length</p></div>
            <div className='row'>
              <div  onClick={()=>this.breakDecrement()} id="break-decrement" className='col-4'>
                <i className="fas fa-arrow-down"></i>
              </div>
              <div id="break-length" className='col-4'>
                {this.state.break}
              </div>
              <div  onClick={()=>this.breakIncrement()}  id="break-increment" className='col-4'>
                <i className="fas fa-arrow-up"></i>
              </div>
          </div>
          </div>
          <div className='col-6'>
            <div id="session-label"><p>Session Length</p></div>
            <div className='row'>
              <div onClick={()=>this.sessionDecrement()} id="session-decrement" className='col-4'>
                <i className="fas fa-arrow-down"></i>
              </div>
              <div id="session-length" className='col-4'>
                {this.state.session}
              </div>
              <div onClick={()=>this.sessionIncrement()} id="session-increment" className='col-4'>
                <i className="fas fa-arrow-up"></i>
              </div>
          </div>
          </div>
        </div>
        <div className='row'>
          <div id="timer-label" className='col'>
            Session
          </div></div>
          <div className='row'>
          <div id="time-left" className='col timer'>
          {this.returnTime()}
          </div>
          </div>
        
        <div className='row'>
          <div id="start_stop" onClick={()=>this.start_stop()} className='col-6'>
          <i className="fas fa-play"></i>
          <i className="fas fa-pause"></i>
          </div>
          <div id="reset" onClick={()=>this.reset()} className='col-6'>
          <i className="fas fa-sync"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

