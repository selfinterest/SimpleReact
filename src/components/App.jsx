import React from 'react';
import Note from './Note.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return <Note />;
    }
}