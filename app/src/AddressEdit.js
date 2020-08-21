import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class AddressEdit extends Component {

    emptyItem = {
        firstName: '',
        lastName: '',
        address: '',
    };

    constructor(props) {
        console.log("Con");
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        console.log(this.props.match.params);
        if (this.props.match.params.id !== 'new') {
            const addr = await (await fetch(`/addresses/${this.props.match.params.id}`)).json();
            this.setState({item: addr});
        }
    }

    handleChange(event) {
        console.log(event.target);
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        console.log("Name "+name+" "+value);
        item[name] = value;
        console.log("New item "+item)
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item.id+" Ud");
        await fetch('/addresses' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    render() {
        console.log("Rended");
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Address' : 'Add Address'}</h2>;

        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type="text" name="firstName" id="name" defaultValue={item.firstName || ''}
                               onChange={this.handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" defaultValue={item.lastName || ''}
                               onChange={this.handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" defaultValue={item.address || ''}
                               onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/addresses">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(AddressEdit);