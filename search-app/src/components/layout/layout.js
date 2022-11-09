import { Fragment } from "react";

import MainNavigation from "./elements/main-navigation";

import classes from "./layout.module.css";

// For basic layout of every app page
function Layout(props) {
  // Must always include navbar attached to the children around which the <Layout> component will be wrapped
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
