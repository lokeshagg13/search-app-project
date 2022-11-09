import { useEffect, useState } from "react";

import classes from "./SearchRes.module.css";
import resourceList from "../../api/mock-results.json";

function SearchRes() {
  const [imageList, setImageList] = useState([]);

  useEffect(
    () =>
      setImageList(
        resourceList.resources.filter((img) => img.resource_type == "image")
      ),
    []
  );

  return (
    <div className={classes.imageGrid}>
      {imageList.map((image) => (
        <img
          className={classes.imageElement}
          id={image.public_id}
          src={image.url}
          alt={image.public_id}
        />
      ))}
    </div>
  );
}

export default SearchRes;
