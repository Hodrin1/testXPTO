import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <nav style={{display: "block"}}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/post">Post</a></li>
                    <li><a href="/patch">Patch</a></li>
                    <li><a href="/delete">Delete</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/list">List</a></li>
                </nav>
            </div>
        );
    }
}

export default Header;