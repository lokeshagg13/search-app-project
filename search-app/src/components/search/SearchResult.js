import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../ui/Loader";
import Notification from "../ui/Notification";

import classes from "./SearchResult.module.css";

const GET_ALL_IMAGES_URL = "/api/images/all";
const SEARCH_IMAGE_URL = "/api/images/search";

// Getting all images from backend server (used as default when nothing is searched by user or user resets the search)
async function getAllImagesFromBackend(axiosPrivate, nextCursor) {
  let response;
  try {
    // Add request URL parameter for pagination
    const params = new URLSearchParams();
    if (nextCursor) {
      params.append("nextCursor", nextCursor);
    }

    // Send request for getting all images to backend
    response = await axiosPrivate.get(`${GET_ALL_IMAGES_URL}?${params}`);

    return { status: "SUCCESS", ...response.data };
  } catch (error) {
    if (response?.data) return { status: "FAILED", ...response.data };
    else return { status: "FAILED", ...response };
  }
}

// Search image from backend server using a search expression provided by user
async function searchImagesFromBackend(
  axiosPrivate,
  searchExp,
  nextCursor = null
) {
  let response;
  try {
    // Adding request body parameters for pagination of images and searchExp to be passed as input
    const requestBody = { searchExp };
    if (nextCursor) {
      requestBody["nextCursor"] = nextCursor;
    }

    // Sending request to backend server for searching image
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
  // For checking if images are loaded or not
  const [isLoading, setIsLoading] = useState(true);
  // For storing image metadata
  const [imageList, setImageList] = useState([]);
  // For storing cursor to next set of images (in case number of images > 9) to allow pagination
  const [nextCursor, setNextCursor] = useState(null);
  // In case of error
  const [errorMsg, setErrorMsg] = useState(null);

  // Each time, the search exp is changed or empty, the call to either of the above two functions is made
  // to get image results and store in a list
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let result;
      // If searchExp is null, then get all images otherwise according to the searchExp
      if (!searchExp) {
        result = await getAllImagesFromBackend(axiosPrivate);
      } else {
        result = await searchImagesFromBackend(axiosPrivate, searchExp);
      }
      // Checking and setting states based on api response
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

  // Function to handle getting next set of images (pagination) when "Load More" button is clicked
  async function handleLoadMoreClick() {
    let result;
    setIsLoading(true);
    window.scroll({
      bottom: document.body.scrollHeight,
      left: 0,
    });
    // If searchExp is null, then get all images otherwise according to the searchExp
      
    if (!searchExp) {
      result = await getAllImagesFromBackend(axiosPrivate, nextCursor);
    } else {
      result = await searchImagesFromBackend(
        axiosPrivate,
        searchExp,
        nextCursor
      );
    }
    // Checking and setting states based on api response
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

  // Grid used for showing image results (3X3 in a basic laptop screen but responsive to screen size using CSS)
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
