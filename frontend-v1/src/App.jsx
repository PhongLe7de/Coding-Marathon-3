import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import Navbar from "./components/Navbar";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [jobAdded, setJobAdded] = useState(false);
  const [jobEdited, setJobEdited] = useState(false);
  const [jobDeleted, setJobDeleted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    if(user){
      setIsAuthenticated(true)
    }
  },[user])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          user={user}
          setUser={setUser}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  jobAdded={jobAdded}
                  jobEdited={jobEdited}
                  jobDeleted={jobDeleted}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/jobs/:id"
              element={<JobPage isAuthenticated={isAuthenticated}  setJobDeleted={setJobDeleted} />}
            />
            <Route
              path="/jobs/add-job"
              element={
                isAuthenticated ? (
                  <AddJobPage setJobAdded={setJobAdded} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/edit-job/:id"
              element={
                isAuthenticated ? (
                  <EditJobPage setJobEdited={setJobEdited} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
