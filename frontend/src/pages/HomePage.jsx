import { useEffect, useState } from "react";
import JobListings from "../components/JobListings";
import { Link } from "react-router-dom";
const Home = ({ jobEdited, jobAdded, isAuthenticated, jobDeleted }) => {
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);


  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchJobs = async () => {
      try {

        const res = await fetch(
          "https://coding-marathon-3-be-protected.onrender.com/api/jobs",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setJobs(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchJobs();
  }, [jobEdited, jobAdded, isAuthenticated, jobDeleted]);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && <JobListings jobs={jobs} />}
      <Link
        to="/jobs/add-job"
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "bold",
          textAlign: "center",
          display: "inline-block",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Add Job
      </Link>
    </div>
  );
};

export default Home;
