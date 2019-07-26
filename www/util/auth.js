import Router from "next/router";
import nextCookie from "next-cookies";

export const auth = ctx => {
  const { jwt } = nextCookie(ctx);

  if (ctx.req && !jwt) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }

  if (!jwt) {
    Router.push("/login");
  }

  return token;
};
