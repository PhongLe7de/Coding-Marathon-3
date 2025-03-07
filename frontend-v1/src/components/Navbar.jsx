import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated, user, setUser }) => {
  const handleClick = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };
  
  useEffect(() => {
    console.log("new user", user);
  }, [user]);

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Products</h1>
      </Link>
      <div className="links">
        {user && (
          <div>
            <Link to="/jobs/add-job">Add Job</Link>
            <span>{user.username}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
