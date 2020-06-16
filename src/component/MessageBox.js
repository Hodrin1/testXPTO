import React, { Component } from 'react';

class MessageBox extends Component {
    render(response) {
        return (
            <div>
                <textarea>{{response}}</textarea>
            </div>
        );
    }
}

export default MessageBox;