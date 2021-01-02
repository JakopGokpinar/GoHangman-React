import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Man from './man';
import Word from './word';
import GuessForm from './guessForm';
import Popup from './popup';
import {asker} from './mainMenu';
import './game.css';
import link from './backendLink';


export default class game extends Component {
    constructor(props){
        super(props);
        getValues = getValues.bind(this);
        makeGuess = makeGuess.bind(this);
        setValue = setValue.bind(this);
        checkRoundFinish = checkRoundFinish.bind(this);
        checkGameOver = checkGameOver.bind(this)
    }
    state = {
        player1 : "",
        player2 : "",
        score1 : 0,
        score2 : 0,
        bodyArray : [" O\n","/","|","\\ \n","/ ","\\"],
        wordArray : [],
        usedWords : [],
        selectedWord : "",
        title : "",
        bodyIndex : 0,
        isAsker : asker,  
        isRoundBegin : false,
        isGameOver : false,
        gameOverMessage : ""
    }
  
    checkWordAndCateg = async () => {

        const {title,selectedWord} = this.state;
        if(title !== "" && selectedWord !== ""){
            var wordarray = [];
            for (let i = 0; i < selectedWord.length; i++) {
                if(selectedWord[i] === " ")
                    wordarray.push(' ');      
                else 
                    wordarray.push("__ ");       
            }
            this.setState({ 
                wordArray : wordarray,
                isRoundBegin : true 
            });
        }
    }

    checkTime = async () => {
        var line = document.getElementById("time-line");
        if(line.offsetWidth === 0){
            if(!this.state.isAsker){
                const res = await axios.get(link + "/setValue.php?column=bodyindex");
                console.log(res["data"]);
            }
            line.style.webkitAnimation = 'none';
            setTimeout(function() {
                line.style.webkitAnimation = '';
            }, 10);
        }
    }
    componentDidMount(){
        setInterval(() => {
            const {isRoundBegin,isGameOver} = this.state;
            if(isGameOver === false){
                checkGameOver()
                getValues()
                !isRoundBegin && this.checkWordAndCateg()
                isRoundBegin && this.checkTime()
                isRoundBegin && checkRoundFinish()
            }           
        },1000)
    }
    
    render() {
        const {player1,player2,score1,score2,title,usedWords,bodyArray,bodyIndex,wordArray,isAsker,isRoundBegin,isGameOver,gameOverMessage} = this.state;
        return (
            <div>
                {!isRoundBegin ?
                    (isAsker ?
                    <Popup condition="ask" title="Time to Ask"/> 
                        :
                    <Popup condition="answer" title="Time to Guess"/>  )              
                                :
                    <div>
                        <Navbar
                            player1={player1}
                            player2={player2}
                            score1={score1}
                            score2={score2}
                            title={title}/>
                        <hr id="time-line"/>
                        <Man bodyArray={bodyArray} bodyIndex={bodyIndex}/>
                        <Word wordArray={wordArray}/>
                        <GuessForm usedWords={usedWords} makeGuess={makeGuess} isAsker={isAsker}/>
                        {isGameOver && <Popup condition="over" title={gameOverMessage}/>}
                    </div>
                }
            </div>
        )
    }
}

var getValues = async function getValues() {
    var response = await axios.get(link + "/getValues.php");

    if(response["data"] !== "values failed"){
        const {usedWords,selectedWord} = this.state;
        var array = response["data"];

        var useds = usedWords.slice();
        if(!useds.includes(array["usedword"])){
            useds.push(array["usedword"]);
        }
        this.setState({
            player1 : array["player1"],
            player2 : array["player2"],
            score1 : array["score1"],
            score2 : array["score2"],
            usedWords : useds,
            title : array["title"],
            selectedWord : array["selectedword"].toUpperCase(),
            bodyIndex : array["bodyindex"],
        })
        if(array["guessedword"] !== "" && selectedWord[array["guessedword"]] !== -1){
            for (let i = 0; i < selectedWord.length; i++) {
                if(array["guessedword"] === selectedWord[i]){
                    setValue(i,array["guessedword"]);
                }
            } 
        }   

        if(array["linestatus"] === "true"){
            var line = document.getElementById("time-line");
            line.style.webkitAnimation = 'none';
            setTimeout(function() {
                line.style.webkitAnimation = '';
            }, 10);
        }
        
          
    } else{
        console.log(response);
    }  
}

var makeGuess = async function makeGuess(){
    var {usedWords,selectedWord,bodyIndex} = this.state;
    var guess = document.getElementById("guessed").value.toUpperCase();
    var line = document.getElementById("time-line");

        if(selectedWord.indexOf(guess) !== -1){
            for (let i = 0; i < selectedWord.length; i++) {
                if(guess === selectedWord[i]){
                    const res = await axios.get(link + "/setValue.php?column=guessedword&value=" + guess);
                    const res2 = await axios.get(link + "/setValue.php?column=guessedindex&value=" + i);
                    console.log(res);
                    console.log(res2)
                }
            } 
        }         
        else {
            if(usedWords.includes(guess)){
                return alert("You tried that letter!");
            }
            let bodyindex = parseInt(bodyIndex) + 1;
            const res = await axios.get(link + "/setValue.php?column=usedword&value=" + guess);
            const res2 = await axios.get(link + "/setValue.php?column=bodyindex&value=" + bodyindex);
            console.log(res);
            console.log(res2);
        }

        const res3 = await axios.get(link + "/setValue.php?column=linestatus&value=true");
        console.log(res3);

        setTimeout(async function() {
            const res4 = await axios.get(link + "/setValue.php?column=linestatus&value=false");
            console.log(res4);
        }, 1000)
        if(!this.state.isAsker){
            line.style.webkitAnimation = 'none';
            setTimeout(function() {
                line.style.webkitAnimation = '';
            }, 10);
        }

}

var setValue = async function setValue(index,value) {
    var newArray = this.state.wordArray.slice();
    newArray[index] = value;
    this.setState({
        wordArray : newArray
    });
}

var checkRoundFinish = async function checkRoundFinish() {
    const {isAsker,bodyIndex,wordArray,selectedWord} = this.state;
    console.log("check round finish")
    if(bodyIndex >= 6){

        if(!isAsker){
            const a = await axios.get(link + "/setScore.php?condition=lose");
            console.log(a["data"])
            console.log("you lose")
        }
        //setTimeout(() => {
            this.setState({
                wordArray : [...selectedWord].map((e,i) => wordArray[i] = e),
                usedWords : [],
                isRoundBegin : false,
                isAsker : !isAsker,
            }) 
       // },100)         
    }
    else {
       // if(selectedWord !== ""){
        for (let i = 0; i < selectedWord.length; i++) {
            if(wordArray[i] !== selectedWord[i]){
                console.log("devam")
                return false;
            }
        }
       // }
        if(!isAsker){
            const b =  await axios.get(link + "/setScore.php?condition=win");
            console.log(b["data"])
            console.log("you won")
        }

        //setTimeout(() => {
            this.setState({
                wordArray : [...selectedWord].map((e,i) => wordArray[i] = e),
                usedWords : [],
                isRoundBegin : false,
                isAsker : !isAsker,
            })
        //},100)
        
    } 
}

var checkGameOver = async function checkGameOver(){
    const {score1,score2} = this.state;
    
    if(parseInt(score1) >= 100 || parseInt(score2) >= 100){
        
        console.log("over")
        const response = await axios.get(link + "/gameOver.php")
        console.log(response["data"])
        if(response["data"].includes("won game")){
            console.log("won")
            this.setState({ 
                gameOverMessage : "You won the Game  :)",
                isRoundBegin : true,
                isGameOver : true
            })
        } 
        else if(response["data"].includes("lost game")){
            console.log("lost")
            this.setState({ 
                gameOverMessage : "You lost the Game  :(",
                isRoundBegin : true,
                isGameOver : true 
            })
        } else{
            console.log("else")
            console.log(response);
        }
        /*setTimeout(() => {
            this.setState({
                isRoundBegin : true,
                isGameOver : true,
            })
        },1000)*/    
    }   
}
