
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import useField from "../hooks/useField";

const Signup = () => {
  const navigate = useNavigate();
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const phone_number = useField("text");
  const gender = useField("text");
  const date_of_birth = useField("date");
  const membership_status = useField("text");
  const bio = useField("text");
  const address = useField("text");
  const email = useField("email");


  const { signup, error } = useSignup("https://coding-marathon-3-be-noauth.onrender.com/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      name: name.value,
      username: username.value,
      password: password.value,
      phone_number: phone_number.value,
      gender: gender.value,
      date_of_birth: date_of_birth.value,
      membership_status: membership_status.value,
      bio: bio.value,
      address: address.value,
    });

    if (!error) {
      navigate("/"); // Navigate to home page after successful signup
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} required />

        <label>Username:</label>
        <input {...username} required />

        <label>Email:</label>
        <input {...email} required />

        <label>Password:</label>
        <input {...password} required />

        <label>Phone Number:</label>
        <input {...phone_number} required />

        <label>Gender:</label>
        <input {...gender} required />

        <label>Date of Birth:</label>
        <input {...date_of_birth} required />

        <label>Membership Status:</label>
        <input {...membership_status} required />

        <label>Bio:</label>
        <textarea {...bio}></textarea>

        <label>Address:</label>
        <input {...address} required />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
