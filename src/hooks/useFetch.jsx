import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

function useFetch(url) {
  const [data, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setDate(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setDate(res);
        console.log("useFetch", res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err, "Something went wrong");
      });
  }, [url]);
  return { data, error, loading };
}

export default useFetch;
