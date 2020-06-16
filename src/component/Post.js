import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Header from './Header.js';


class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            age: this.props.age,
            birthday: this.props.birthday,
            email: this.props.email,
            name: this.props.name,
        }
    }

    changeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.valueAsNumber || e.target.value
        });
    }

    submitHandler = e => {
        e.preventDefault();
        console.log(JSON.stringify(this.state));

        //post to api
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(this.state);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("/todo", requestOptions)
        .then(async response => {
            const data = await response.json();
            let message = (data && data.message) || response.statusText;
            if (!response.ok) {
                return Promise.reject(message);
            }
            let ok  = message;
            return alert('Status: ' + ok);
            
        })
        .catch(error => {
            alert('There was an error: '+ error + ' Try again' );
        });



    }

    render(props) {
        return (
            <div>
                <Header/>
               <h1>Welcome to post form</h1>
                <form onSubmit={this.submitHandler}>
                    <label>Age:</label><br/>
                    <input type="number" name="age" value={this.props.age} onChange={this.changeHandler}></input><br/>
                    <label>Birthday:</label><br/>
                    <input type="text" name="birthday" value={this.props.birthday} onChange={this.changeHandler}></input><br/>
                    <label>Email:</label><br/>
                    <input type="text" name="email" value={this.props.email} onChange={this.changeHandler}></input><br/>
                    <label>Name:</label><br/>
                    <input type="text" name="name" value={this.props.name} onChange={this.changeHandler}></input><br/>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    }
}

export default Post;