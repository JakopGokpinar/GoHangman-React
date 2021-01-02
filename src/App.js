import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Game from './game';
import Menu from './mainMenu';

export default class App extends React.Component{

    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Menu}></Route>
                    <Route exact path="/match" component={Game}></Route>
                </Switch>
            </Router>
        )
    }
}