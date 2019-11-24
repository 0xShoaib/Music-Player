import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.LoaderWrapper}>
      <div className={classes.Loading}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
