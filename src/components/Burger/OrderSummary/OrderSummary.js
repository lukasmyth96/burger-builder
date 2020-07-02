import React, { Component } from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {


    render() {

        let ingredientSummary = null;
        if (this.props.ingredients !== null){
            ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (<li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>)
            });
        }

        return (
            <Aux>
                <h3>Your Order</h3>
                <p> <strong> £{this.props.price.toFixed(2)} </strong> </p>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" click={this.props.cancelPurchase}> Cancel </Button>
                <Button buttonType="Success" click={this.props.continuePurchase}> Continue </Button>
            </Aux>
        );
    };
};

export default OrderSummary;