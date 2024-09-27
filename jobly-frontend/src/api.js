import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "Unknown API error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Login to get a token
  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  // Signup to get a token
  static async signup(data) {
    let res = await this.request('auth/register', data, 'post');
    return res.token;
  }

  // Get details on a company by handle
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Get all jobs
  static async getJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  }

  // Apply to a job by job ID
  static async applyToJob(id) {
    let res = await this.request(`jobs/${id}/apply`, {}, "post");
    return res.applied;
  }

  // Get all companies
  static async getCompanies() {
    let res = await this.request('companies');
    return res.companies;
  }
}

export default JoblyApi;



