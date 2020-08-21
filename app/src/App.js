import React, {Component} from 'react';
import './App.css';
import AddressList from "./AddressList";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddressEdit from "./AddressEdit";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={AddressList}/>
                    <Route path='/edit/:id' component={AddressEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
