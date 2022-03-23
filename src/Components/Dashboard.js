import React, { Component } from 'react'
import APIContainer from './APIContainer';
import BasicAppBar from './BasicAppBar';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.data = 'accounts assets customers datapoints devices documents forms invites media messages namespaces orders patients relationships rules templates users workflows'.split(' ');
    }

    render() {
        return (
            <div>
                <BasicAppBar></BasicAppBar>
                <APIContainer data={this.data}></APIContainer>
            </div>
        );
    }
}