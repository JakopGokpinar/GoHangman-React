import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import UserConsumer from './context';
import Loading from './loading';
import Form from './registerForm';
import './style.css';
import './context';
import link from './backendLink'

var asker = false;
export default class menu extends Component {
    state = {
        username : "",
        isSearching : false,
        isMatchFind : false,
        playMusic : true,
    }

    audio = new Audio("/music.mp3");
    startMusic = () => {
        if(this.state.playMusic)
            this.audio.play();
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    register = async (dispatch,e) => {
        e.preventDefault();

        const response = await axios.get(link + "/register.php?username="+this.state.username);
        dispatch({type:"REGISTER_USER",payload:response.data});
        console.log(response["data"]);
        if(response["data"] === "register successful"){
            document.getElementById("warning").innerHTML = "";
            document.getElementById("form").id = "form2";
            
            setTimeout(() => [
                this.setState({
                    isSearching : true
                }),
                setInterval(() =>{
                    this.state.isMatchFind ? clearInterval(this) : this.findMatch()
                },500)
            ],1500)  
        }  
        else if(response["data"] === "register unsuccessful"){
            document.getElementById("warning").innerHTML = "This name already taken!"
        }        
    }
    
    findMatch = async () => {
        console.log("searching");
        const response = await axios.get(link + "/findMatch.php");
        if(response["data"].includes("match find")){
            var arr = response["data"].split(",");
            if(arr[1] === "asker"){
                asker = true;
            }
            console.log("in match"); 
            this.setState({
                isSearching : false,
                isMatchFind : true
            })
                         
        }
    }

    render() {
        const {isMatchFind,isSearching} = this.state;
        return (
            <UserConsumer>{
                value => {
                    const {dispatch} = value;
                    return(
                        <div id="body">
                            <div onLoad={this.startMusic() } >
                                { isSearching ? 
                                    <Loading/>
                                : !isMatchFind ?
                                    <Form className="container" 
                                        dispatch={dispatch} 
                                        register={this.register} 
                                        changeInput={this.changeInput}>
                                    </Form>
                                :
                                    <Redirect to="/match"/>
                                }
                            </div>    
                        </div>
                    )
                }       
            }</UserConsumer>
        )
    }
}

export {asker};
