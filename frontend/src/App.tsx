import React, { useState, useEffect } from "react";
import JobList from "./components/JobsList";
import axios from "axios";
import { Job } from "./models/models";

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<Boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverUrl = process.env.REACT_APP_SERVER_URL!;
        const response = await axios.get<Job[]>(serverUrl);
        setJobs(response.data);
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <JobList jobs={jobs} />
    </>
  );
};

export default App;
