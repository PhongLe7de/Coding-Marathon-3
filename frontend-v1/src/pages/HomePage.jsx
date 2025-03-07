import { useEffect, useState } from "react";
import JobListings from "../components/JobListings";

const Home = ({jobEdited, jobAdded, isAuthenticated, jobDeleted}) => {
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://coding-marathon-3-be-noauth.onrender.com/api/jobs");
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
    </div>
  );
};

export default Home;