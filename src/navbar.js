import React from 'react';
import './game.css';

function Navbar({player1,player2,score1,score2,title}){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="navbar">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active ml-5 pt-2">
                        <p className="shadow-none bg-primary navbar-text text-light p-2 rounded" id="bg-darkness">{player1}</p>
                    </li>
                    <li className="nav-item ml-5 pt-2">
                        <p className="shadow-none bg-primary navbar-text text-light pr-3 pl-3 rounded-circle" id="bg-circle">{score1}</p>
                    </li>
                    <li className="nav-item pt-2">
                        <p className="navbar-text text-light" id="title">{title}</p>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active mr-5 pt-2">
                        <p className="shadow-none bg-primary navbar-text text-light pr-3 pl-3 rounded-circle" id="bg-circle">{score2}</p>
                    </li>
                    <li className="nav-item active mr-5 pt-2">
                        <p className="shadow-none bg-primary navbar-text text-light p-2 rounded" id="bg-darkness">{player2}</p>
                    </li>
                </ul>   
            </div>         
        </nav>
    )
}

export default Navbar;