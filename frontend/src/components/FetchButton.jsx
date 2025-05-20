import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchButton = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const handleScrape = async () => {
    setMessage("Starting scrape...");
    try {
      await axios.post("http://127.0.0.1:5000/scrape");
      setMessage("Scraping started. Fetching results...");
    } catch (error) {
      setMessage("Error starting scrape.");
      console.error("Scraping error:", error);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/results");
        if (res.status === 200) {
          setData(res.data.data);
          setMessage("Scraping complete.");
        } else {
          setTimeout(fetchResults, 2000); // Poll every 2s until data is available
        }
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <button onClick={handleScrape}>Start Scraping</button>
      <p>{message}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default FetchButton;
