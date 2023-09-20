import React, { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "./models/models";

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<Boolean>(false);
  
  const serverUrl = process.env.REACT_APP_SERVER_URL!;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Job[] = await axios.get(serverUrl);
        console.log(response);
        setJobs(response);
      } catch (err) {
        setError(true);
      }
    }
    fetchData();

  }, [])

  return <div>Test</div>;
};

export default App;
