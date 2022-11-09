import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={classes.loader}>
      <img src="/images/spinning-loading.gif" alt="Loading..." />
    </div>
  );
}

export default Loader;
