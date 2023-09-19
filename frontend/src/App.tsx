import React, { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "./models/models";

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Job[] = await axios.get("http://localhost:6000/api/job-buddy");
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
