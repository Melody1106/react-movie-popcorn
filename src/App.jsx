import { useEffect } from "react";

import { fetchDataFromApi } from "./utils/api";

function App() {
  useEffect(function () {
    apiTesting();
  }, []);
  const apiTesting = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      console.log(res);
    });
  };
  return <div className="app">App</div>;
}

export default App;