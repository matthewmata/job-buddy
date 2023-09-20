import React from "react";
import { Job } from "../models/models";

const JobPosting: React.FC<{ jobData: Job }> = ({ jobData }) => {

  const jobSalary =
    jobData.salary !== "n/a" ? jobData.salary : "See Job Posting";
  const jobDescription =
    jobData.description !== "n/a" ? jobData.description : "See Job Posting";
  return (
    <li>
        <a href={jobData.url}>
      <h2>{jobData.title}</h2>
      <span>@ {jobData.companyLocation}</span>
      <span>{jobSalary}</span>
      <h3>About</h3>
      <p>{jobDescription}</p>
      <p>{jobData.date}</p>
        </a>
    </li>
  );
};

export default JobPosting;
