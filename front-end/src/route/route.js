import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../home/home';
import Checkout from '../checkout/checkout';
import NavBar from '../base/base_appbar';
import Footer from '../base/base_footer';
import Error from '../error/error';
import Detail from "../detail/detail";
const AppRoute = () => (
  <BrowserRouter>
    <div>
        <NavBar/>
        <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/boardgame/:id" component={Detail} exact={true} />
            <Route path="/checkout" component={Checkout} exact={true} />
            <Route path="/error" component={Error} exact={true} />
        </Switch>
        <Footer/>
    </div>
  </BrowserRouter>
);
export default AppRoute;
