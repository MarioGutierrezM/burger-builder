import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicius burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to Checkout ?</p>
      <Button btnType="Danger" clicked={props.pruchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.pruchaseContinued}>CONTINUE</Button>
    </Aux>
  )
}

export default OrderSummary;
