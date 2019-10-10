import React from 'react';
// import { withRouter } from 'react-router-dom'; // to add the router values to the props of this compoenent 
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import style from './Burger.css';

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey+i} type={igKey}/>
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>
    }
  
  return (
    <div className={style.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
};

export default Burger;
// export default withRouter(Burger);

