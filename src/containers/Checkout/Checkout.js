import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

  onCheckoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCanceled={this.onCheckoutCanceledHandler}
          onCheckoutContinued={this.onCheckoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);