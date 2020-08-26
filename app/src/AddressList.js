import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, ButtonGroup, Input, Table} from 'reactstrap';

class AddressList extends Component {
    state = {
        isLoading: true,
        addresses: [],
        address_search: undefined,
        firstName_search: undefined,
        lastName_search: undefined
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }


    async componentDidMount() {
        const response = await fetch('/addresses');
        const body = await response.json();
        console.log(body);
        this.setState({addresses: body, isLoading: false});
    }

    handleChange(event) {
        console.log("HERE");
        this.setState({firstName_search: event.target.value});
        console.log(this.state.firstName_search);
        this.setState({lastName_search: event.target.value});
        console.log(this.state.lastName_search);
        this.setState({address_search: event.target.value});
        console.log(this.state.address_search);
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
                        <h2>Address Book</h2>
                    </div>
                    <div>
                        <Input style={{width:"50%", display:"initial"}} name="search_firstName" id="search_firstName"
                               onChange={this.handleChange}/>
                        <button onClick={() => this.search_firstName()}>Search by First Name</button>
                    </div>
                    <div>
                        <Input style={{width:"50%", display:"initial"}} name="search_lastName" id="search_lastName"
                               onChange={this.handleChange}/>
                        <button onClick={() => this.search_lastName()}>Search by Last Name</button>
                    </div>
                    <div>
                        <Input style={{width:"50%", display:"initial"}} name="search_address" id="search_address"
                               onChange={this.handleChange}/>
                        <button onClick={() => this.search_address()}>Search by Address</button>
                    </div>
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
                                        <Button size="sm" color="primary"
                                                onClick={() => this.edit('/edit/' + address.id)}>Edit</Button>
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
                    <div className="float-margin-bottom">
                        <Button color="success" onClick={() => this.edit('/edit/new')}>Add Contact</Button>
                    </div>
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

    // search by address
    async search_address() {
        if(this.state.addresses === undefined || this.state.addresses.length === 0){
            const response = await fetch('/addresses');
            const body = await response.json();
            this.setState({addresses: body});
        } else{
            const response = await fetch('/addresses'+'?address='+this.state.address_search);
            const status = await response.status;
            console.log(status);
            if(status !== 204){
                const body = await response.json();
                console.log(body);
                this.setState({addresses:body});
            } else{
                this.setState({addresses:[]});
            }

        }
    }

    // search by first name
    async search_firstName(){
        if(this.state.addresses === undefined || this.state.addresses.length === 0){
            const response = await fetch('/addresses');
            const body = await response.json();
            this.setState({addresses: body});
        } else{
            const response = await fetch('/addresses'+'?firstName='+this.state.firstName_search);
            const status = await response.status;
            console.log(status);
            if(status !== 204){
                const body = await response.json();
                console.log(body);
                this.setState({addresses:body});
            } else{
                this.setState({addresses:[]});
            }
        }
    }


    // search by last name
    async search_lastName(){
        if(this.state.addresses === undefined || this.state.addresses.length === 0){
            const response = await fetch('/addresses');
            const body = await response.json();
            this.setState({addresses: body});
        } else{
            const response = await fetch('/addresses'+'?lastName='+this.state.lastName_search);
            const status = await response.status;
            console.log(status);
            if(status !== 204){
                const body = await response.json();
                console.log(body);
                this.setState({addresses:body});
            } else{
                this.setState({addresses:[]});
            }
        }
    }
}

export default AddressList;