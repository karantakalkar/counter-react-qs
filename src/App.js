import React, { Component } from "react";
import './style.css';

  export default class Loader extends Component {
    render() {
      return (
        <span class="load"><div class="loader"></div>&emsp;&emsp; Saving counter value</span>
      )
    }
  }

  export default class Button extends Component {
    render() {
      return <button onClick={this.props.action}>{this.props.title}</button>;
    }
  }

  export default class Cval extends Component {
    render() {
      return <p>{this.props.title}</p>;
    }
  }

  export default class App extends Component {

    max = process.env.MAX_VALUE != undefined ? process.env.MAX_VALUE : 1000;


    constructor() {
      super();
      this.state = {
        count: 1,
        showLoader: false
      };
    }

  componentDidMount() {
    fetch(
      'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/karant.json'
    ).then((res) => res.json())
     .then((data) => {
        if (data != null) {
          this.setState({
            count: data
          });
        }
      });
  }

  setCounter(count) {
    this.state.showLoader = true;
    fetch(
      'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({karant: count})
      }
    ).then(() => {
      this.setState({
        showLoader:  false
      });
    })
  }
  
    incrementCount = () => {
      if(this.state.count < this.max) {
        this.setCounter(this.state.count + 1)
        this.setState({
          count: this.state.count + 1
        });
      }
    };
  
    decrementCount = () => {
      this.setCounter(this.state.count - 1)
      this.setState({
        count: this.state.count - 1
      });
    };

    handleChange = (event) => { 
      if(Number(event.target.value) <= this.max) {
        this.setCounter(Number(event.target.value))
        this.setState({count: Number(event.target.value)});  
      } else {
        event.target.value = `${this.max}`;
      }
    }
  
    render() {
      let { count, showLoader } = this.state;
      return (
        <div className="app">
          <div>
            {showLoader && <Loader/>}
            <p></p>
            <div class="buttons">
              <span class="left"><Button title={"-"} action={this.decrementCount} /></span>
              <input type="number" max= {this.max} class="inp" value={this.state.count} onChange={this.handleChange}/>
              <span class="right"><Button title={"+"} action={this.incrementCount} /></span>
            </div>
            <span class="cval"><Cval title={"Counter value : " + count} /></span>
          </div>
        </div>
      );
    }
  }