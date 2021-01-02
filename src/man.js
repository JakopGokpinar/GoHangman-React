import React from 'react';
import './game.css';

export default function Man({bodyArray,bodyIndex}) {
    return (
        <div>
            <img src="/gallows.png" alt="daragaci" className="gallows"></img>
            <div id="man">
                {bodyArray.map((el,index) => 
                    <span  
                        key={el.toString()} 
                        style={{color : index < bodyIndex ? "#db0000" : "#ff9494"}}>
                        {el}
                    </span>)}
                </div>
        </div>
    )
}
