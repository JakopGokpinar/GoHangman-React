import React from 'react';
import ReactDOM from 'react-dom';
import {UserProvider} from './context';
import App from './App';
import './style.css';


class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            playMusic : true,
            isRegistered : false,
        };
    }
    
       
    render(){
        return(
            <div>
                <UserProvider>
                    <App/>
                </UserProvider>
            </div>
        )
    }
}

ReactDOM.render(<Main/>,document.getElementById('root')); 
    