import React, { Component } from "react";
import './style.css';

  
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
    constructor() {
      super();
      this.state = {
        count: 1
      };

    }

  componentDidMount() {
    fetch(
      'https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json'
    ).then((res) => res.json())
      .then((data) => {
        if (data != null) {
          this.setState({
            count: data
          });
        }
      });
  }
  
    incrementCount = () => {
      if(this.state.count < 1000) {
        this.setState({
          count: this.state.count + 1
        });
      }
    };
  
    decrementCount = () => {
      this.setState({
        count: this.state.count - 1
      });
    };

    handleChange = (event) => { 
      this.setState({count: event.target.value});  
    }
  
    render() {
      let { count } = this.state;
      return (
        <div className="app">
          <div>
            <div class="buttons">
              <span class="left"><Button title={"-"} action={this.decrementCount} /></span>
              <input type="number" class="inp" value={this.state.count} onChange={this.handleChange}/>
              <span class="right"><Button title={"+"} action={this.incrementCount} /></span>
            </div>
            <span class="cval"><Cval title={"Counter value : " + count} /></span>
          </div>
        </div>
      );
    }
  }