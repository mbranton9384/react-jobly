import React, { useEffect, useState } from 'react';
import JoblyApi from './api';
import './Jobs.css';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (err) {
        console.error("Error loading jobs", err);
      }
    }
    getJobs();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobs-container">
      <h1>Jobs</h1>
      <input
        type="text"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="jobs-list">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>Salary: {job.salary ? `$${job.salary.toLocaleString()}` : 'N/A'}</p>
            <p>Equity: {job.equity || 'N/A'}</p>
            <button className="apply-button">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;


