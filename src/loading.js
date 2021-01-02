import React from 'react';

function Loading() {
    return (
        <div>
            <div className="d-flex justify-content-center">
            <div
                className="spinner-border text-danger" 
                style={{width : "3rem", height : "3rem",marginTop : "20rem"}} 
                role="status">
            </div>
            </div>
            <div className="d-flex justify-content-center">
                <div 
                    className="text-light mt-2"
                    style={{marginBottom : "5rem"}} >
                    Finding Match...
                </div>
            </div>  
        </div>
    ) 
}

export default Loading;
