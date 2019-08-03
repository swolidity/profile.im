import React, { createContext } from "react";
import App, { Container } from "next/app";
import fetch from "isomorphic-unfetch";
import cookies from "next-cookies";
import CurrentUserContext from "../context/currentUser";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { jwt } = cookies(ctx);

    let user = null;

    if (jwt) {
      const res = await fetch(`${process.env.API_URL}/auth`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cache: "no-cache",
          cookie: `jwt=${jwt}`
        },
        credentials: "include"
      });

      user = await res.json();
    }

    return { pageProps, user };
  }

  render() {
    const { Component, pageProps, user } = this.props;

    return (
      <Container>
        <CurrentUserContext.Provider value={user}>
          <Component {...pageProps} />
        </CurrentUserContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
