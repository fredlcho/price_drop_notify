import React from 'react';
import './App.css';

const request = require('request')

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
        let price;
        if (htmlDoc.getElementsByClassName('price-standard pdp-space-price')[0] == null){
            price = htmlDoc.getElementsByClassName('price-sales pdp-space-price sale-price-only')[0].innerHTML;
            console.log(price);
        }else{
          price = htmlDoc.getElementsByClassName('price-standard pdp-space-price')[0].innerHTML;
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
          <img id ="dapicture" alt ="enter a link above" src = {this.state.picture}/>
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
function App() {
    return(


      <div className = "App-header">
        <h1>enter a link below:</h1>
        <Thething />
      </div>
    );
}


export default App;
