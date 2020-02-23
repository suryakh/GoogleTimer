import React from 'react';
import './App.css';
import Stop_watch from './components/Stop_watch';
import Countdown from './components/Countdown';
import Display from './components/Display';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: false,
      show: "start",
      resetbtn: true,
      timer: {
        msec_count: 0,
        sec_count: 0,
        hr_count: 0,
        min_count: 0
      },
      pausedTimer: {
        msec_count: 0,
        sec_count: 0,
        hr_count: 0,
        min_count: 0
      },
      //  ---------------------countdown-------//
      sec: "",
      min: "",
      hr: "",
      countdown: { sec: 0, min: 0, hr: 0 },
      countstart: true,
      countReset: true,
      form: true,    //-----display input form
      labelshows: "start"
    }
  }

  //---- dataFrom timer-----------//
  datastop = (value) => {
    var temp = value
    this.setState({
      pausedTimer: temp
    })
  }


  //-----------start button label change-----//
  btnlabel = (id) => {
    if (id == true) {
      this.setState({
        show: "stop"
      })
    }
    else {
      this.setState({
        show: "start"
      })
    }
  }


  //---------reser button ------//
  reset = () => {
    let temp = {
      msec_count: 0,
      sec_count: 0,
      hr_count: 0,
      min_count: 0
    }
    this.setState({
      start: false,
      resetbtn: false,
      pausedTimer: temp
    })

  }
  //---------------------------Countdown--------------------------------//
  // -------user input----------//
  input = (e) => {
    this.setState({
      [e.target.name]: Number(e.target.value)
    })
  }


  //----------input stored in state object--------// 
  countInput = () => {
    if ((this.state.hr == "" && this.state.min == "" && this.state.sec == "")) {
      console.log("no")
      alert("timer should not blank")
    }
    else {
      console.log(this.state.hr, this.state.min, this.state.sec)
      console.log("yse")
      var temp = {
        hr: Number(this.state.hr),
        min: Number(this.state.min),
        sec: Number(this.state.sec)
      }
      this.setState({
        countdown: temp,
        form: false
      })
    }
  }


  //---------paused data From countdown----------//
  dataOut = (value) => {
    if (this.state.countReset == true) {
      this.setState({
        countdown: value
      })
    }
  }


  // -----------countdown reset function-----------//
  countReset = () => {
    let temp = {
      sec: 0, min: 0, hr: 0
    }
    this.setState({
      countdown: temp,
      countstart: true,
      countReset: false,
      form: true,
      sec: 0,
      min: 0,
      hr: 0
    })

  }

  //-------------countdown start button label------//
  label = (id) => {
    if (id == true) {
      this.setState({
        labelshows: "Start"
      })
    }
  }

  render() {
    return (

      <div className="App container border p-5">
        <div>

          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">StopWatch</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Count Down</a>
            </li>
          </ul>

          <div class="tab-content" id="myTabContent">

            {/*-------------- timer-------------------- */}

            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

              {/*-------------invoking Timer--------------------  */}

              {this.state.start && (<Stop_watch start={this.state.start} datastop={this.datastop} datasend={this.state.pausedTimer} btn={this.btnlabel} resetbtn={this.state.resetbtn} />)}

              {/* --------------disply component for display data----------- */}

              {!this.state.start && <Display valuesfrom={this.state.pausedTimer} start={this.state.start} reset={this.state.resetbtn} />}


              <button className="btn btn-dark m-3" style={{ background: `${this.state.start ? "red" : "green"}` }} onClick={() => this.setState({ start: !this.state.start, resetbtn: true })}>{this.state.show}</button>
              <button className="btn btn-light" onClick={this.reset}>reset</button>
            </div>

            {/* -------Countdown-------- */}

            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

              {/* -------------display counter----------- */}

              {this.state.countstart && <div className="container my-5">
                <div className="p-5">
                  <h1>
                    {this.state.countdown.hr} <small>h</small>: {this.state.countdown.min} <small>min</small>: {this.state.countdown.sec}<small>sec</small>
                  </h1>
                </div>
              </div>}

              {/* ---------------------Form for user input------------------ */}

              {this.state.form && <div className="container">
                <small>Give input here*</small>
                <div className="row">
                  <div className="col-6 offset-3">
                    <input className="col-2" name="hr" style={{ height: "60px", fontSize: "30px", border: "none" }} value={this.state.name} onChange={this.input} placeholder="00" />hr
              <input className="col-2" name="min" style={{ height: "60px", fontSize: "30px", border: "none" }} value={this.state.name} onChange={this.input} placeholder="00" />min
              <input className="col-2" name="sec" style={{ height: "60px", fontSize: "30px", border: "none" }} value={this.state.name} onChange={this.input} placeholder="00" />sec
              </div>
                </div>
                <div className="col-2 offset-5">
                  <button className="btn btn-warning" onClick={this.countInput}>Set</button></div></div>}

              {/* ---------invoking Countdown component----------- */}

              {!this.state.countstart && <Countdown dataIn={this.state.countdown} dataOut={this.dataOut} countReset={this.state.countReset} labelshows={this.label} />}

              {!this.state.form && <div> <button className="btn btn-dark m-5" style={{ background: `${this.state.countstart ? "green" : "red"}` }} onClick={() => this.setState({ countstart: !this.state.countstart, countReset: true, labelshows: "Stop" })}>{this.state.labelshows}</button>
                <button className="btn btn-light m-5" onClick={this.countReset}>Reset</button></div>}




            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
