import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render () {
    return (
      <>
        <Toolbar clicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <div>Toolbar, Sidebar</div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default Layout;
