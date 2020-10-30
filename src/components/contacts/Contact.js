import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Consumer} from '../../context'

export default class Contact extends Component {
    state={
        showContactInfo: false
    };
    
    onDeleteClick = async (id, dispatch) => {
        try{
            await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({type: 'DELETE_CONTACT', payload: id})
        } catch(e) {
            dispatch({type: 'DELETE_CONTACT', payload: id})
        }
    }


    render() {
        const {showContactInfo} = this.state
        const {contact} = this.props
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>
                                {contact.name}
                                <i 
                                    style={{cursor: 'pointer'}}
                                    onClick={()=>this.setState({showContactInfo: !this.state.showContactInfo})}
                                    className="fas fa-sort-down" 
                                />
                                <i 
                                    className="fas fa-times" 
                                    style={{cursor: 'pointer', float: 'right', color: 'red'}}
                                    onClick={this.onDeleteClick.bind(this, contact.id, dispatch)}    
                                />
                                <Link to={`contact/edit/${contact.id}`}>
                                    <i 
                                        className="fas fa-pencil-alt"
                                        style={{
                                            cursor: 'pointer',
                                            float: 'right',
                                            color: 'black',
                                            marginRight: '1rem',
                                        }}
                                    />
                                </Link>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                <li className="list-group-item">Email: {contact.email}</li>
                                <li className="list-group-item">Phone: {contact.phone}</li>
                            </ul>
                            ) : null}
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
