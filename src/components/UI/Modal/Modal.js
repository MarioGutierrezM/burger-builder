import React, { Component } from 'react';
import Styles from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
  }

  render() {
    const { show, children, modalClosed } = this.props;
    return (
      <Aux>
        <div
          className={Styles.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
          }}
        > { children } </div>
        <Backdrop show={show} clicked={modalClosed}/>
      </Aux>
    );
  }
}

export default Modal;
