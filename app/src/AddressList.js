import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, ButtonGroup, Table} from 'reactstrap';
import Link from "react-router-dom";
import AddressEdit from "./AddressEdit";

class AddressList extends Component {
    state = {
        isLoading: true,
        addresses: [],
    };

    async componentDidMount() {
        const response = await fetch('/addresses');
        const body = await response.json();
        console.log(body);
        this.setState({addresses: body, isLoading: false});
    }

    render() {
        const {addresses, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="App-intro">
                        <h2>Address Book Contacts</h2>
                    </div>
                    <div className="float-margin-bottom">
                        <Button color="success" onClick={()=>this.edit('/edit/new')}>Add Contact</Button>
                    </div>
{/*                    <div className="float-right">
                        <input type="text" className="input" placeholder="Search..."/>
                    </div>*/}
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th bgcolor="white" width="30%"> First Name</th>
                            <th bgcolor="white" width="30%"> Last Name</th>
                            <th bgcolor="white" width="30%"> Address</th>
                            <th bgcolor="white" width="30%">Actions</th>
                        </tr>
                        {addresses.map(address =>
                            <tr key={address.id}>
                                <td> {address.firstName}</td>
                                <td> {address.lastName}</td>
                                <td> {address.address}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" color="primary" onClick={()=>this.edit('/edit/'+address.id)}>Edit</Button>
                                        <Button size="sm" color="danger"
                                                onClick={() => this.remove(address.id)}>Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </header>
            </div>
        )
    }


    async remove(id) {
        await fetch(`/addresses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            console.log(id + " deleted");
            let updatedGroups = [...this.state.addresses].filter(i => i.id !== id);
            this.setState({addresses: updatedGroups});
        });
    }

    edit(path) {
        this.props.history.push(path);
    }
}

export default AddressList;
