import Image from "next/image";

import classes from "./loader.module.css";

function Loader() {
  return (
    <div className={classes.loader}>
      <Image
        src="/images/spinning-loading.gif"
        alt="Loading..."
        width={300}
        height={200}
      />
    </div>
  );
}

export default Loader;