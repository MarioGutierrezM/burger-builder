import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => { return sum + el}, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          pruchaseCanceled={this.purchaseCancelHandler}
          pruchaseContinued={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  const { ADD_INGREDIENT, REMOVE_INGREDIENT } = actionTypes;
  return {
    onIngredientAdded: (ingName) => dispatch({ type: ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
