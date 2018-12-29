// import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom"
// import { IndexPage } from "./page";
import Login from "./page/login";
import Register from "./page/register";

import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { IndexPage } from "./page";

export class MainRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path={'/'} component={Login}/>
                    <Route path={"/index"} component={IndexPage} />
                    <Route exact path={"/register"} component={Register} />
                    {/*<Route exact path={"/likes"} component={IndexPage} />*/}
                </Switch>
            </HashRouter>
        );
    }
}
//
// const Router = () => {
//     return (
//         <BrowserRouter>
//             <Switch>
//                 <Route exact path="/" component={IndexPage} />
//                 {/*<Route exact path="/login" component={Login} />*/}
//                 {/*<Route exact path="/register" component={Register} />*/}
//
//             </Switch>
//         </BrowserRouter>
//     );
// };
//
// export default Router;
