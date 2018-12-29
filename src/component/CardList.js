import { List, Row, Col} from 'antd';
import React from 'react';
import ShowCard from './Card';
// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;


// class CardList extends React.Component{
//     constructor(){
//         super();
//         // console.log("props is"+this.props)
//         // console.log("props pics"+this.pictures)
//         this.state={
//             pics : pictures
//         }

//         console.log("state"+this.state)
//     }

//     // componentDidMount(){
//     //     const { pics } = this.props;
//     //     console.log("hhhh"+this.props)
//     //     console.log("dfsd"+pics)
//     //     this.setState={
//     //         pics: pics
//     //     }
//     // }
//     onDeleteHandler = (id) => {
//         this.state.pics.splice(id, 1);
//         this.setState({ pics:this.state.pics });

//         // let { savedReactions } = this.state;
         
//         // for(var i = savedReactions.length - 1; i > -1; i--) {
//         //     if(savedReactions[i].key === key) {
//         //       console.log("Deleting gif with key: ", key);
//         //         savedReactions.splice(i, 1);
//         //         localStorage.setItem("mysavedreactions", JSON.stringify(savedReactions));
//         //         this.setState({ savedReactions });
//         //     }
//         // }
//       }
    
//       render(){
          
//         return (
//             <List grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4, }}
//             dataSource={this.state.pics}
//             renderItem={(item,i)=>(
//                 <List.Item type="flex" align="middle">
//                     <ShowCard id={i} key = {i} item={item} onDelete={this.onDeleteHandler}/>
//                 </List.Item>
//             )}        
//             />
//         )
//       }

//     }

// export default CardList

        // <Row type="flex" justify="center" align="top">
        //     dataSource={pics}
        //     renderItem={(item,i)=>(
        //         <Col span={2}>
        //             <ShowCard id={i} key = {i} item={item}/>
        //         </Col>
        //     )}
           
        // </Row>

/*
        <div>
           {
            pics.map((post,i) => {
                return <ShowCard key={i} item={post}/>
            })
           }
        </div> 
*/
    // );
// }

// export default CardList;

// onDeleteHandler = (id) => {
//     pics.splice(id, 1);
//     this.setState({ pics:pics });
// }

const CardList = ({pics}) =>{ 

   

        // let { savedReactions } = this.state;
         
        // for(var i = savedReactions.length - 1; i > -1; i--) {
        //     if(savedReactions[i].key === key) {
        //       console.log("Deleting gif with key: ", key);
        //         savedReactions.splice(i, 1);
        //         localStorage.setItem("mysavedreactions", JSON.stringify(savedReactions));
        //         this.setState({ savedReactions });
        //     }
        // }


    return (
        <List grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4, }}
        dataSource={pics}
        renderItem={(item,i)=>(
            <List.Item type="flex" align="middle">
                <ShowCard id={i} key = {i} item={item}/>
            </List.Item>
        )}        
        />


        // <Row type="flex" justify="center" align="top">
        //     dataSource={pics}
        //     renderItem={(item,i)=>(
        //         <Col span={2}>
        //             <ShowCard id={i} key = {i} item={item}/>
        //         </Col>
        //     )}
           
        // </Row>

/*
        <div>
           {
            pics.map((post,i) => {
                return <ShowCard key={i} item={post}/>
            })
           }
        </div> 
*/
    );
}

export default CardList;