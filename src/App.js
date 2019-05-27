import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

const request = require('request')

class Welcome extends React.Component{
  render(){
    return(
      <h1> Welcome, {this.props.nameaa}</h1>
    );
  };
}
function Hello(props){
    return <h1> Hello, {props.name}</h1>;
}

class Myclock extends React.Component{
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  render(){
    return(
      <div>
      <h1> it is now {this.state.date.toLocaleTimeString()}</h1>
      </div>
    );
  };

}

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state =
    {
      date: new Date(),
      haha: 'bye'
    };
  }

  componentDidMount(){
    this.timerID= setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      haha: 'hello',
      date:new Date()
    });
  }
  render(){
    return(
      <div>
        <h1> it is now {this.state.haha}.</h1>
        <h1> it is now {this.state.date.toLocaleTimeString()}.</h1>
      </div>
    );
  };
}
// function Comment(props) {
//   return (
//     <div className="Comment">
//       <UserInfo user = {props.author}/>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
class Thething extends React.Component{
  constructor(props){
    super(props);
    this.state={
      price:null,
      image:null
    };

    this.displaystuff = this.displaystuff.bind(this);
  };

  displaystuff(event){
    let link = event.target.value;
    var linksite = link.split(".")[1];
    var corsanywhere = "https://cors-anywhere.herokuapp.com/";
    console.log(link);
    this.displaystuff = this.displaystuff.bind(this);

    if(linksite === 'amazon'){
      request(corsanywhere+link,(err,res,body) =>{
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(body,'text/html');
        var price = htmlDoc.getElementById('priceblock_ourprice').innerHTML;
        var picture = htmlDoc.getElementsByClassName('a-button-text');
        // var images = picture.getElementsByTagName('img');
        // console.log(picture);
        price = price.substring(1);
        this.setState({price:price});
        console.log(this.state.price);
      });

      // return price;
    }else if(linksite === 'uniqlo'){
      request(corsanywhere+link,(err,res,body) =>{
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(body,'text/html');
        console.log(htmlDoc);
        if (htmlDoc.getElementsByClassName('price-standard pdp-space-price')[0] == null){
            var price = htmlDoc.getElementsByClassName('price-sales pdp-space-price sale-price-only')[0].innerHTML;
            console.log(price);
        }else{
          var price = htmlDoc.getElementsByClassName('price-standard pdp-space-price')[0].innerHTML;
        }
        // var price = htmlDoc.getElementsByClassName('price-standard pdp-space-price')[0].innerHTML;
        // console.log(price);
        // var picture = htmlDoc.getElementsByClassName('a-button-text');
        // var images = picture.getElementsByTagName('img');
        // console.log(picture);
        // price = price.substring(1);
        var piclink = htmlDoc.getElementsByTagName('img')[3];
        var picsrc = piclink.src;
        console.log(picsrc);
        this.setState({price:price,
                       picture:picsrc
          });
        // console.log(this.state.price);
      });
    }
    // console.log(linksite);

  }

  render(){
    return(
      <div>
      <div className="theinput">
        <input type="text" onChange={this.displaystuff}/>
      </div>
      <div className = "iteminfo">
        <div className = "picture-class">
          <h4>Your item</h4>
          <img id ="dapicture" src = {this.state.picture}/>
        </div>
      </div>
      <div className = "iteminfo">
        <div className = "price-class">
          <h4>The price</h4>
          <h3 id = "daprice">{this.state.price}</h3>
        </div>
      </div>
      </div>

    )
  }

}
class PricexItemDisplay extends React.Component{

}
function App() {
    return(


      <div className = "App-header">
        <h1>enter a link below:</h1>
        <Thething />
      </div>
    );
}


export default App;
