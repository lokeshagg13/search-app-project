import { Fragment } from "react";

import MainNavigation from "./elements/main-navigation";

import classes from "./layout.module.css";

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
