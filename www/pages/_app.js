import React, { createContext } from "react";
import App, { Container } from "next/app";
import fetch from "isomorphic-unfetch";
import cookies from "next-cookies";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Router from "next/router";
import withGA from "next-ga";
import { LoggedInUserProvider } from "../hooks/useLoggedInUser";

import "normalize.css";

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
        <LoggedInUserProvider user={user}>
          <Component {...pageProps} />
        </LoggedInUserProvider>
      </Container>
    );
  }
}

export default withGA("UA-64366323-2", Router)(MyApp);
