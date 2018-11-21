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
            value: ''
          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Street',
            },
            value: ''
          },
          zipcode: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'ZIP code',
            },
            value: ''
          },
          country: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Country',
            },
            value: ''
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'your e-mail',
            },
            value: ''
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
              ]
            },
            value: ''
          }
      },
      loading: false
    }

    orderHandler = (event) => {
      // alert('continue');
      event.preventDefault();
      this.setState({loading: true});
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,

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

    render() {
      let form = ( <form>
         <Input inputtype='input' type='text' name='name' placeholder='your name' />
         <Input inputtype='input' type='email' name='email' placeholder='your email address' />
         <Input inputtype='input' type='text' name='street' placeholder='your street' />
         <Input inputtype='input' type='text' name='postal' placeholder='your postal code' />
         <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
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
