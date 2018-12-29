import React from "react";
import CardList from '../component/CardList'

import Unsplash from 'unsplash-js';
import {toJson} from 'unsplash-js';

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;

class SearchResult extends React.Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        };
    }

    componentDidMount(){
        // keyword = this.props.match.params.keyword;
        var unsplash;
        unsplash = new Unsplash({
            //TODO: Put it in environment vars.
            applicationId: "1eccca646ffdcffd33a902794c5086f1701713c20b2eb943a458880100bb677d",
            secret: "891c91a86a0842e6648925e8048cc35ede9986969db514e4e0ae6d8d811f1130",
            callbackUrl: "http://35.243.234.68:8000/auth"
        });

        console.log(this.props);
        unsplash.search.photos(this.props.match.params.keyword, 1, 20)
            .catch(err => {
                console.log(err);
            })
            .then(toJson)
            .then(json => {
                this.setState({
                    posts: json.results
                });

                console.log(json);
            });

        console.log(this.state.posts);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.keyword !== this.props.match.params.keyword){
            var unsplash;
            unsplash = new Unsplash({
                //TODO: Put it in environment vars.
                applicationId: "1eccca646ffdcffd33a902794c5086f1701713c20b2eb943a458880100bb677d",
                secret: "891c91a86a0842e6648925e8048cc35ede9986969db514e4e0ae6d8d811f1130",
                callbackUrl: "http://35.243.234.68:8000/auth"
            });

            console.log(this.props);
            unsplash.search.photos(this.props.match.params.keyword, 1, 20)
                .catch(err => {
                    console.log(err);
                })
                .then(toJson)
                .then(json => {
                    this.setState({
                        posts: json.results
                    });
                    console.log(json);
                    this.forceUpdate();
                });

            console.log(this.state.posts);
        }
    }
    render(){
        return (
            <div>
                <CardList pics={this.state.posts} />
            </div>
        );
    }
}
export default SearchResult;