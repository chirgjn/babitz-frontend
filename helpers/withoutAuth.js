import React, { Component } from "react";
import router from "next/router";
import "firebase/auth";
import firebase from "firebase/app";
import Loader from "../components/Loader.js";

import initFirebase from "../services/firebase.js";
initFirebase();

const withoutAuth = (Component) => {
  class withoutAuth extends React.Component {
    state = {
      loading: true,
    };
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          router.push("/Dashboard/dashboard");
        }
        this.setState({
          loading: false,
        });
      });
    };
    renderContent() {
      return <Component {...this.props} />;
    }
    render() {
      if (this.state.status == "Loading") {
        return <Loader />;
      }
      return <React.Fragment>{this.renderContent()}</React.Fragment>;
    }
  }
  return withoutAuth;
};

export default withoutAuth;
