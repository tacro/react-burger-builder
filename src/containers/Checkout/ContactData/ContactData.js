import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';


class ContactData extends Component {
    state = {
      orderForm: {
          name: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'your name',
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false,
          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Street',
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false,
          },
          zipcode: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'ZIP code',
            },
            value: '',
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5
            },
            valid: false,
            touched: false,
          },
          country: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Country',
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false,
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'your e-mail',
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false,
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
              ]
            },
            value: 'fastest',
            validation: {},
            valid: true,
            touched: false,
          }
      },
      formIsValid: false,
    }

    orderHandler = (event) => {
      // alert('continue');
      event.preventDefault();
      const formData = {};
      for (let formElemId in this.state.orderForm) {
        formData[formElemId] = this.state.orderForm[formElemId].value;
      }
      const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData
      }
      this.props.onOrderBurger(order);
    }

    checkValidity(val, rules) {
      let isValid = true;
      if (!rules) {
        return true;
      }

      if (rules.required) {
        isValid = val.trim() !== '' && isValid;
      }

      if(rules.minLength) {
        isValid = val.length >= rules.minLength && isValid;
      }

      if(rules.minLength) {
        isValid = val.length <= rules.maxLength && isValid;
      }

      return isValid
    }

    inputChangedHandler = (e, inputId) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputId]
      };
      updatedFormElement.value = e.target.value;
      updatedFormElement.valid = this.checkValidity(
                                    updatedFormElement.value,
                                    updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputId] = updatedFormElement;

      let formIsValid = true;
      for( let inputId in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputId].valid && formIsValid;
      }

      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
      const formELementsArray=[];
      for (let key in this.state.orderForm) {
        formELementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }

      let form = ( <form onSubmit={this.orderHandler}>
         {formELementsArray.map(elem => (
           <Input
             key={elem.id}
             elementType={elem.config.elementType}
             elementConfig={elem.config.elementConfig}
             value= {elem.config.value}
             invalid={!elem.config.valid}
             shouldValidate = {elem.config.validation}
             touched={elem.config.touched}
             changed={(e) => this.inputChangedHandler(e, elem.id)}
            />
         ))}
         <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
       </form>);
      if(this.props.loading){
        form = <Spinner />;
      }
      return (
        <div className={classes.ContactData}>
         <h4>Enter your contact data</h4>
        {form}
        </div>
      )
    }
}

const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
