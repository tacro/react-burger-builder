import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  // componentWillUpdate () {
  //   console.log('modal willUpdate');
  // }
  
  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'transalateY(0)' : 'transalateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            zIndex: this.props.show ? '500' : '-100'
          }}>
          {this.props.children}
        </div>
      </>
    );
  };
}

export default Modal;
