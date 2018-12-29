import { Card, Icon } from 'antd';
import React from 'react';
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

/*
<Meta
    title="random"
    description="test"
/>
*/
const { Meta } = Card;

export default class ShowCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            color1:"#000000",
            color2:"#000000",
            search:false,
            numLikes:0,
            numCollects:0,
            picUrl:"",
            wid:"",
            author:""
        }
    }


    handleLike(wid, id){
        var action
        if(this.state.color1 === "#000000") {
            this.setState({
                color1:"#eb2f96",
                numLikes:this.state.numLikes+1
            })
            action = 1
        } else if(this.state.color1 === "#eb2f96"){
            this.setState({
                color1:"#000000",
                numLikes:this.state.numLikes-1
            })
            action = -1
        } else{
            return
        }
        axios({
            url: 'http://35.243.234.68:8000/addLike',
            method: 'post',
            data: {
                wid:  wid,
                action: action 
            },
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                console.log("success");
                
                // this.props.onDeleteHandler(id)
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCollect(wid){
        var action
        if(this.state.color2 === "#000000") {
            this.setState({
                color2:"#eb2f96",
                numCollects:this.state.numCollects+1
            })
            action = 1
        } else if(this.state.color2 === "#eb2f96") {
            this.setState({
                color2:"#000000",
                numCollects:this.state.numCollects-1
            })
            action = -1
            console.log("wojianle!!!"+action)
        } else{
            return
        }
        axios({
            url: 'http://35.243.234.68:8000/addCollect',
            method: 'post',
            data: {
                wid:  wid,
                action: action
            },
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                console.log("success");
            })
            .catch(error => {
                console.log(error);
            });
    }


    componentDidMount(){
        const { item } = this.props;
        if (item.hasOwnProperty("urls")){
            this.setState({
                picUrl:item.urls.full,
                color1:"#ffffff",
                color2:"#ffffff",
                search:true
            })
        } else if(item.hasOwnProperty("url")){
            this.setState({
                picUrl : item.url,
                numLikes : item.likes,
                numCollects : item.collects,
                wid : item._id,
                author : item.username
            })
           
            if(item.isLiked === true){
                this.setState({
                    color1:"#eb2f96"
                })
            } else{
                this.setState({
                    color1:"#000000"
                })
            }
            if(item.isCollected === true){
                this.setState({
                    color2:"#eb2f96"
                })
            } else{
                this.setState({
                    color2:"#000000"
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.item !== this.props.item){
            const { item } = this.props;
            if (item.hasOwnProperty("urls")){
                this.setState({
                    picUrl:item.urls.full,
                    color1:"#ffffff",
                    color2:"#ffffff",
                    search:true
                })
            } else if(item.hasOwnProperty("url")){
                this.setState({
                    picUrl : item.url,
                    numLikes : item.likes,
                    numCollects : item.collects,
                    wid : item._id,
                    author : item.username
                })

                if(item.isLiked === true){
                    this.setState({
                        color1:"#eb2f96"
                    })
                } else{
                    this.setState({
                        color1:"#000000"
                    })
                }
                if(item.isCollected === true){
                    this.setState({
                        color2:"#eb2f96"
                    })
                } else{
                    this.setState({
                        color2:"#000000"
                    })
                }
            }
        }
    }

    render(){
        const { id } = this.props;
        const { item } = this.props;

        var meta;
        if(!this.state.search){
            meta = <Meta title={"Author:  "+this.state.author} description={this.state.numLikes+"  Likes     "+this.state.numCollects+"  Collects"}/>
        }

        return (
            <div id = {"pic_"+id} name = {this.state.wid}>
                <Card
                    type="inner"
                    style={{ width: 322}}
                    cover={<img alt="example" src={this.state.picUrl} style={{ width: 'auto' , height: 180}} />}
                    actions={
                        [<Icon type="heart" id = {"like_"+ id} theme="twoTone" twoToneColor={this.state.color1} onClick={()=>{this.handleLike(this.state.wid, id)}}/>,
                            <Icon type="folder-add" id = {"collect_"+ id} theme="twoTone" twoToneColor={this.state.color2} onClick={()=>this.handleCollect(this.state.wid)}/>,
                            <Icon type="setting" theme="twoTone" twoToneColor="#000000" onClick={() => {ipcRenderer.send("download-image", this.state.picUrl)}}/>]

                        }
                >
                {meta}
                </Card>

            </div>
        );
    }
}