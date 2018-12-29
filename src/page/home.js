import React from "react";
import CardList from '../component/CardList'
import axios from "axios"

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;

class Home extends React.Component {
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }  

    componentDidMount(){
        // ipcRenderer.send('request-image','all');
        // ipcRenderer.on('show-all-image',(event, arg) => {
        //     this.setState({
        //         posts: arg
        //     })
        //     console.log(this.state.posts)
        // })
        
    
        axios.get("http://35.243.234.68:8000/wallpapers/index")
            .then(response => {
                console.log(response)
                console.log(response.data)
                this.setState({
                    posts: response.data
                })      
            })  
            .catch(error => {
                    console.log(error);
            });
        console.log(this.state.posts);
        

    //    ipcRenderer.on('show-search-result',(event, arg) => {
    //     this.setState({
    //         posts: arg
    //     });
    //     console.log(this.state.posts)     
    // });
    }
    render(){       
        return (
            <div>      
                <CardList pics={this.state.posts} />         
            </div>
        );
    }

}
export default Home;