import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
    }

    updatePurchaseable = (updatedIngredients) => {
        const numIngredients = Object.keys(updatedIngredients).map(igKey => {
            return updatedIngredients[igKey];
        }).reduce((sum, el) => {return sum + el;}, 0)
        this.setState({purchaseable: numIngredients > 0});
    };

    startPurchaseHandler = () => {
        this.setState({purchasing: true});
    };

    closeModalHandler = () => {
        this.setState({purchasing: false});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = oldCount + 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseable(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = oldCount - 1;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceSubtraction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseable(updatedIngredients);
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;     
        }

        return (
            <Aux>

                <Modal show={this.state.purchasing}
                       closeModal={this.closeModalHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    startPurchase={this.startPurchaseHandler}
                    disabledInfo={disabledInfo}/>
            </Aux>
        );
    }

}

export default BurgerBuilder;