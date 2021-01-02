import React from 'react';

function Form({dispatch,register,changeInput}) {
    return (
        <div>
            <form method="post" className="text-center" id="form" onSubmit={register.bind(this,dispatch)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control border-dark" 
                        name="username" id="username-field" 
                        placeholder="Enter username..." 
                        onChange={changeInput}
                        required/>
                </div>
                <input type="submit" className="btn btn-danger mt-2" name="start" id="start-button" value="Start!"/>
                <p className="text-center text-danger mt-3" id="warning"></p>
            </form>
        </div>
    )
}

export default Form;
