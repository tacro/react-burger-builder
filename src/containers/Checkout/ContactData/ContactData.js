import React, { Component } from 'react';

import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


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
            valid: false
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
            valid: false
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
            valid: false
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
            valid: false
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
            valid: false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
              ]
            },
            value: '',
            valid: false
          }
      },
      loading: false
    }

    orderHandler = (event) => {
      // alert('continue');
      event.preventDefault();
      this.setState({loading: true});
      const formData = {};
      for (let formElemId in this.state.orderForm) {
        formData[formElemId] = this.state.orderForm[formElemId].value;
      }
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData
      }
      axios.post('/orders.json', order)
        .then(response => {
          this.setState({loading: false, purchasing: false});
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({loading: false, purchasing: false});
        });
    }

    checkValidity(val, rules) {
      let isValid = true;
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
      updatedOrderForm[inputId] = updatedFormElement;
      console.log(updatedFormElement);
      this.setState({orderForm: updatedOrderForm});
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
             changed={(e) => this.inputChangedHandler(e, elem.id)}
            />
         ))}
         <Button btnType='Success'>ORDER</Button>
       </form>);
      if(this.state.loading){
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

export default ContactData;
