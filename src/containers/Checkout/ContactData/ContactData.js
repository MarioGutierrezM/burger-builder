import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import Styles from './ContactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4
        },
        valid: false,
        touch: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touch: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', display: 'Fastest'},
            { value: 'cheapest', display: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true,
        touch: false
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    
    const order = {
      ingredientes: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    //  .json in order to have compatibility with firebase
    axios.post('/orders.json', order)
      .then(res => {
        this.props.history.push('/');
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, id) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedForm[id] };

    updatedElement.value = event.target.value;
    updatedElement.touch = true;
    updatedElement.valid = this.checkValidity(updatedElement.value,  updatedElement.validation);
    updatedForm[id] = updatedElement;

    let formIsValid = true;
    for (let key in updatedForm) {
      formIsValid = updatedForm[id].valid && updatedForm[id].touch && formIsValid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== '';
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }
    return isValid;
  };

  render() {
    const orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    
    let form = (
      <form onSubmit={this.orderHandler}>
        {
          orderFormArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touch={formElement.config.touch}
            />
          ))
        }
        <Button btnType="Success" disabled={!this.state.formIsValid}> ORDER </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={Styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
