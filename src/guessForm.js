import React from 'react';
import './game.css';

export default function GuessForm({usedWords,makeGuess,isAsker}) {
    return (
        <div>
            <div className="card mt-5 bg-dark" id="guess-form">                            
                <div className="card-body " >
                    <div className="form-group mb-4">
                        <input 
                            style={{height : "18rem"}}
                            type="text-area"
                            id="used-area"
                            className="form-control"
                            value={usedWords}
                            disabled
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input 
                            type="text"
                            id="guessed"
                            placeholder="Write guess..."
                            className="form-control" 
                            disabled={isAsker ? true : false}
                        />
                    </div>
                    <button 
                        className="btn btn-danger btn-block" 
                        type="button"
                        onClick={makeGuess}
                        disabled={isAsker ? true : false}>
                        Guess It!
                    </button>
                </div>
            </div>
        </div>
    )
}
