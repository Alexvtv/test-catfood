import React from 'react';
import {Product} from './components/Product.js';

export class App extends React.Component {

  constructor() {
    super();
    this.state = {  
      products: [
        {
          dish: "с фуа-гра", servings: ["10 ", "порций"], bonus: ["", "мышь в подарок"], weight: "0,5", additionally: "", status: "default", description: "Печень утки разварная с артишоками", id: 0 
        },
        {
          dish: "с рыбой", servings: ["40 ", "порций"], bonus: ["2 ", "мыши в подарок"], weight: "2", additionally: "", status: "selected", description: "Головы щучьи с чесноком да свежайшая сёмгушка", id: 1 
        },
        {
          dish: "с курой", servings: ["100 ", "порций"], bonus: ["5 ", "мышей в подарок"], weight: "5", additionally: "заказчик доволен", status: "disabled", description: "Филе из цыплят с трюфелями в бульоне", id: 2 
        }
      ]
    }
  }

  changeStatus = (id, realStatus) => {
    let productList = this.state.products;
    if(realStatus === 'default') {
      productList[id].status = 'selected'
    } else if (realStatus === 'selected') {
      productList[id].status = 'default'
    } else {
      return
    }
    this.setState({ products: productList })
  }
  
  render() {
    const productList = this.state.products.map(product => {
      return (
        <Product
          dish={product.dish}
          servings={product.servings}
          bonus={product.bonus}
          weight={product.weight}
          additionally={product.additionally}
          status={product.status}
          description={product.description}
          changeStatus={this.changeStatus}
          id={product.id}
          key={product.id}
        />
      )
    })

    return (
      <div className="App row justify-content-md-center">

        <h2>Ты сегодня покормил кота?</h2>

        <div className="col-md-11 col-12 content row justify-content-md-center">
          {productList}
        </div>

        <div className="shadow">
        </div>
      </div>
    );
  }
}