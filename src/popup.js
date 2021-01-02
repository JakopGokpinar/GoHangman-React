import React, { Component } from 'react';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './game.css';

export default class popupForm extends Component {
    
    state = {
        show : true,
    }
    close = () => {
        this.setState({
            show : false,
        })
    }
    decide = async (e) => {
        e.preventDefault();
        var categ = document.getElementById("category").value;
        var word = document.getElementById("word").value;

        const response1 = await axios.get("/api/setValue.php?column=title&value=" + categ);
        const response2 = await axios.get("/api/setValue.php?column=selectedword&value="+word);

        console.log(response1);
        console.log(response2);
        this.setState({
            show : false
        })
    }
    render() {
        const {condition,title} = this.props;
        return (
            <Modal show={this.state.show} className="mt-5">
                <Modal.Header className="bg-primary text-light border-0">{title}</Modal.Header>
                <Modal.Body className="bg-dark pt-0" show="false">
                <hr id="time-line"></hr>
                    <form onSubmit={this.decide.bind(this)}>
                        {condition === "ask" ? 
                            <div className="askForm">
                                <div>
                                    <label className="text-light">Select Category</label>
                                    <select className="custom-select form-controll" id="category" required>
                                        <option value="">Choose...</option>
                                        <option value="Animal">Animal</option>
                                        <option value="Country">Country</option>
                                        <option value="Sport">Sport</option>
                                    </select> 
                                </div>
                                <div className="form-group mt-3">
                                    <label className="text-light">Select Word</label>
                                    <input type="text" className="form-control" id="word" required></input>
                                </div>
                                <div className="text-center w-80">
                                    <button type="submit" className="btn btn-danger  mt-2">OK</button>
                                </div>
                            </div>
                        :   (condition === "answer" ? 
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="spinner-border text-danger mt-3"   
                                            role="status">
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div 
                                            className="text-light mt-3 mb-2">
                                            Waiting...
                                        </div>
                                    </div>
                                </div>
                            :   condition === "over" &&
                                <div className="text-center">
                                    <div>
                                        <Link to="/">
                                            <button 
                                                className="btn btn-primary form-group mt-3" 
                                                id="menu-buttons">
                                                Back To Menu
                                            </button>
                                        </Link>      
                                    </div>
                                    <div>
                                        <button 
                                            type="button"
                                            className="btn btn-danger form-group mt-1 mb-4" 
                                            id="menu-buttons"
                                            onClick={this.close}>
                                            Close
                                            </button>
                                    </div>
                                </div>
                            )
                        }  
                    </form>
                </Modal.Body>
            </Modal>
        )  
    }
}
