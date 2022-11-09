import { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

import classes from "./SearchRes.module.css";

const SEARCH_IMAGE_URL = "/api/images/search";

async function getImagesFromBackend(searchExp, auth) {
  let response;
  try {
    response = await axios.post(
      SEARCH_IMAGE_URL,
      JSON.stringify({ searchExp }),
      {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

function SearchRes(props) {
  const { searchExp } = props;
  const { auth } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    getImagesFromBackend(searchExp, auth).then((result) => {
      if (result?.status == "SUCCESS") {
        setErrorMsg(null);
        setImageList(result.resources);
      } else {
        setImageList([]);
        if (result?.message) {
          setErrorMsg(result.message);
        } else
          setErrorMsg("Error while searching for images. Please try again");
      }
    });
  }, [searchExp]);

  return (
    <div className={classes.imageGrid}>
      {imageList.map((image) => (
        <img
          className={classes.imageElement}
          key={image.public_id}
          id={image.public_id}
          src={image.url}
          alt={image.public_id}
        />
      ))}
    </div>
  );
}

export default SearchRes;
