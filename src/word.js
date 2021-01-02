import React from 'react';
import './game.css';

export default function Word({wordArray}) {
    return (
        <div className="word" id="word-box">
            {wordArray}
        </div>
    )
}
