import { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import Notification from "../ui/Notification";

import classes from "./SearchResult.module.css";

const GET_ALL_IMAGES_URL = "/api/images/all";
const SEARCH_IMAGE_URL = "/api/images/search";

async function getAllImagesFromBackend(auth, nextCursor) {
  let response;
  try {
    const params = new URLSearchParams();
    if (nextCursor) {
      params.append("nextCursor", nextCursor);
    }

    response = await axios.get(`${GET_ALL_IMAGES_URL}?${params}`, {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
      },
    });

    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

async function searchImagesFromBackend(searchExp, auth, nextCursor = null) {
  let response;
  try {
    const requestBody = { searchExp };
    if (nextCursor) {
      requestBody["nextCursor"] = nextCursor;
    }

    response = await axios.post(SEARCH_IMAGE_URL, JSON.stringify(requestBody), {
      headers: {
        authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

function SearchResult(props) {
  const { searchExp } = props;
  const { auth } = useContext(AuthContext);
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (!searchExp) {
        result = await getAllImagesFromBackend(auth);
      } else {
        result = await searchImagesFromBackend(searchExp, auth);
      }
      if (result?.status == "SUCCESS") {
        setErrorMsg(null);
        setImageList(result.resources);
        setNextCursor(result.next_cursor || null);
      } else {
        setImageList([]);
        setNextCursor(null);
        if (result?.message) {
          setErrorMsg(result.message);
        } else
          setErrorMsg("Error while searching for images. Please try again");
      }
    };
    fetchData();
  }, [searchExp]);

  async function handleLoadMoreClick() {
    let result;
    if (!searchExp) {
      result = await getAllImagesFromBackend(auth, nextCursor);
    } else {
      result = await searchImagesFromBackend(searchExp, auth, nextCursor);
    }
    if (result?.status == "SUCCESS") {
      setErrorMsg(null);
      setImageList((imageList) => [...imageList, ...result.resources]);
      setNextCursor(result.next_cursor || null);
    } else {
      setNextCursor(null);
      if (result?.message) {
        setErrorMsg(result.message);
      } else setErrorMsg("Error while searching for images. Please try again");
    }
  }

  return (
    <>
      <div className={classes.imageGrid}>
        {errorMsg && <Notification type="error" message={errorMsg} />}
        {!errorMsg && imageList?.length == 0 && (
          <Notification type="error" message="No Search Results found" />
        )}
        {!errorMsg &&
          imageList?.length > 0 &&
          imageList.map((image) => (
            <img
              className={classes.imageElement}
              key={image.public_id}
              id={image.public_id}
              src={image.url}
              alt={image.public_id}
            />
          ))}
      </div>
      <div className={classes.actions}>
        {nextCursor && <button onClick={handleLoadMoreClick}>Load More</button>}
      </div>
    </>
  );
}

export default SearchResult;