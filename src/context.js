import React, { Component } from 'react'
import axios from 'axios';

const UserContext = React.createContext();

const reducer = (state,action) => {
  
  switch(action.type){
    case "REGISTER_USER":
      return {
        isRegistered : true,
      }
    default:
      return state
  }
  
}
export class UserProvider extends Component {
    state = {
        isConnected : false,
        isRegistered : false,
        dispatch : action => {
          this.setState(state => reducer(state,action));
        }
      }
      componentDidMount = async () => {
        const response = await axios.get("/api/");
        console.log(response);
        this.setState({
          isConnected : true
        })
      }
      
    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;
export default UserConsumer;