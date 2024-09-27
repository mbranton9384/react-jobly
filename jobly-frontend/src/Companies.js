import React, { useEffect, useState } from 'react';
import JoblyApi from './api';
import { Link } from 'react-router-dom';
import './Companies.css';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getCompanies() {
      try {
        const companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Error loading companies", err);
      }
    }
    getCompanies();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="companies-container">
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="companies-list">
        {filteredCompanies.map(company => (
          <div key={company.handle} className="company-card">
            <Link to={`/companies/${company.handle}`}>
              <h3>{company.name}</h3>
              <p>{company.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;

