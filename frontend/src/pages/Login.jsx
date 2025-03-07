import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const username = useField("username");
  const password = useField("password");
  const { login } = useLogin("http://localhost:4000/api/users/login");

  const errorText = "Incorrect username or password. Please try again."

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ username: username.value, password: password.value });
    if (!response) {
      alert(errorText);
      return
    }
    setUser(response);
    navigate("/");
  };
  
  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
      <label>Usernam:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;