import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const navigate = useNavigate();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { setUser } = context;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      newUser,
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      navigate("/home");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center">
      <div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3>Email</h3>
          <input
            required
            type="email"
            placeholder="johndoes@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3>Enter a Password</h3>
          <input
            required
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3>FirstName</h3>
          <input
            required
            type="text"
            placeholder="john"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />

          <h3>Lastname</h3>
          <input
            type="text"
            placeholder="doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <button>Create account</button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
