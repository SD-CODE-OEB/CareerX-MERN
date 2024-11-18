import { useState, useEffect } from "react";
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, [url]);
  return [data];
};
