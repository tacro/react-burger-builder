import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={classes.Modal}
        style={{
          transform: props.show ? 'transalateY(0)' : 'transalateY(-100vh)',
          opacity: props.show ? '1' : '0',
          zIndex: props.show ? '500' : '-100'
        }}>
        {props.children}
      </div>
    </>
);

export default modal;
