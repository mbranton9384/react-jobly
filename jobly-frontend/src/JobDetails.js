import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import './JobDetails.css'; 

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false); 

  useEffect(() => {
    async function getJob() {
      let job = await JoblyApi.getJob(id);
      setJob(job);
    }
    getJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await JoblyApi.applyToJob(id); 
      setApplied(true); 
    } catch (error) {
      console.error('Application failed', error);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Salary: {job.salary ? `$${job.salary}` : 'N/A'}</p>
      <p>Equity: {job.equity ? job.equity : 'N/A'}</p>
      <button 
        className={applied ? "applied-button" : "apply-button"} 
        onClick={handleApply}
        disabled={applied} 
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobDetails;


