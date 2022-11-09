import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../ui/Loader";
import Notification from "../ui/Notification";

import classes from "./SearchResult.module.css";

const GET_ALL_IMAGES_URL = "/api/images/all";
const SEARCH_IMAGE_URL = "/api/images/search";

async function getAllImagesFromBackend(axiosPrivate, nextCursor) {
  let response;
  try {
    const params = new URLSearchParams();
    if (nextCursor) {
      params.append("nextCursor", nextCursor);
    }

    response = await axiosPrivate.get(`${GET_ALL_IMAGES_URL}?${params}`);

    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

async function searchImagesFromBackend(
  axiosPrivate,
  searchExp,
  nextCursor = null
) {
  let response;
  try {
    const requestBody = { searchExp };
    if (nextCursor) {
      requestBody["nextCursor"] = nextCursor;
    }

    response = await axiosPrivate.post(
      SEARCH_IMAGE_URL,
      JSON.stringify(requestBody)
    );

    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

function SearchResult(props) {
  const { searchExp } = props;
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let result;
      if (!searchExp) {
        result = await getAllImagesFromBackend(axiosPrivate);
      } else {
        result = await searchImagesFromBackend(axiosPrivate, searchExp);
      }
      if (result?.status === "SUCCESS") {
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
      setIsLoading(false);
    };
    fetchData();
  }, [searchExp]);

  async function handleLoadMoreClick() {
    let result;
    setIsLoading(true);
    window.scroll({
      bottom: document.body.scrollHeight,
      left: 0
    });
    if (!searchExp) {
      result = await getAllImagesFromBackend(axiosPrivate, nextCursor);
    } else {
      result = await searchImagesFromBackend(
        axiosPrivate,
        searchExp,
        nextCursor
      );
    }
    if (result?.status === "SUCCESS") {
      setErrorMsg(null);
      setImageList((imageList) => [...imageList, ...result.resources]);
      setNextCursor(result.next_cursor || null);
    } else {
      setNextCursor(null);
      if (result?.message) {
        setErrorMsg(result.message);
      } else setErrorMsg("Error while searching for images. Please try again");
    }
    setIsLoading(false);
  }

  return (
    <>
      {!errorMsg && imageList?.length > 0 && (
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
      )}
      {errorMsg && <Notification type="error" message={errorMsg} />}
      {!errorMsg && !isLoading && imageList?.length === 0 && (
        <Notification type="error" message="No Search Results found" />
      )}
      {!errorMsg && isLoading && <Loader />}
      <div className={classes.actions}>
        {nextCursor && <button onClick={handleLoadMoreClick}>Load More</button>}
      </div>
    </>
  );
}

export default SearchResult;
