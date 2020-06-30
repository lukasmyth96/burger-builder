import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        sideDrawerVisible: false
    }

    toggleSideDrawerHandler = () => {
        // NOTE - this is the correct way to change state when it depends on the previous state as setState runs async
        this.setState( ( prevState ) => {
            return { sideDrawerVisible: !prevState.sideDrawerVisible };
        } );
    }

    render() {
        return (
        <>
            <Toolbar showSideDrawer={this.toggleSideDrawerHandler}/>
            <SideDrawer open={this.state.sideDrawerVisible} closeSideDrawer={this.toggleSideDrawerHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </>
        );
    }
}


export default Layout;