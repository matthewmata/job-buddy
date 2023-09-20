import React from 'react';
import JobPosting from './JobPosting';
import { Job } from "../models/models";

const JobList: React.FC<{jobs: Job[]}> = ({ jobs }) => {
    return (
      <section>
        <ul>
          {jobs.map((jobData) => (
            <JobPosting jobData={jobData} />
          ))}
        </ul>
      </section>
    );
}

export default JobList;