import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import './CompanyDetails.css';

function CompanyDetails() {
  const { handle } = useParams(); 
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      try {
        const fetchedCompany = await JoblyApi.getCompany(handle);
        setCompany(fetchedCompany);
      } catch (err) {
        console.error("Error loading company details", err);
      }
    }
    getCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="company-details-container">
      <h1>{company.name}</h1>
      <p>{company.description}</p>

      <div className="jobs-list">
        {company.jobs.map(job => (
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

export default CompanyDetails;

