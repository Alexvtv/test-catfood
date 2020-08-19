import React from 'react';

import catImg from '../img/cat.png';

export class Product extends React.Component {

	constructor() {
    super();
    this.state = { 
    	hovered: false
    }
  }

	content = () => {
		return (
			<div>
				{((this.props.status === "selected") && (this.state.hovered)) ?
				(<p className="grey tagline cancel">Котэ не одобряет?</p>) :
				(<p className="grey tagline">Сказочное заморское яство</p>)
				}

    		<h1>Нямушка</h1>
    		<h5>{this.props.dish}</h5>
    		<p className="grey"><span className="bold">{this.props.servings[0]}</span> {this.props.servings[1]}</p>
    		<p className="grey"><span className="bold">{this.props.bonus[0]}</span> {this.props.bonus[1]}</p>
    		<img src={catImg} />
    		<div className="weight">
    			<h2>{this.props.weight}</h2>
    			<p>кг</p>
    		</div>
    	</div>
		)
	}

	onMouseEnter = () => {
		if(!this.state.hovered) {
			this.setState({ hovered: true })
		}
	}

	onMouseLeave = () => {
		if(this.state.hovered) {
			this.setState({ hovered: false })
		}
	}
  
  render() {

  	if(this.props.status === "selected") {

  		return (
    	  <div className="product col-xl-4 col-md-6 col-12 selected" onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseLeave}>
    	  	<div className="card" onClick={() => this.props.changeStatus(this.props.id, this.props.status)}>
    	  		{this.content()}
    	  	</div>
    	  	<p>{this.props.description}</p>
    	  </div>
    	);

  	} else if(this.props.status === "disabled") {

  		return (
    	  <div className="product col-xl-4 col-md-6 col-12 disabled">
    	  	<div className="card">
    	  		{this.content()}
    	  		<div className="block">
    	  		</div>
    	  	</div>
    	  	<p className="notice">Печалька, {this.props.dish} закончился</p>
    	  </div>
    	);

  	} else {

    	return (
    	  <div className="product col-xl-4 col-md-6 col-12">
    	  	<div className="card" onClick={() => this.props.changeStatus(this.props.id, this.props.status)}>
    	  		{this.content()}
    	  	</div>
    	  	<p>Чего сидишь? Порадуй котэ, <a href="#" onClick={() => this.props.changeStatus(this.props.id, this.props.status)}>Купи.</a></p>
    	  </div>
    	);

  	}
  }
}
