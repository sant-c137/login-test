import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const log = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        history.push("/dashboard");
      }

      const token = response.data.authorisation.token;
      Cookies.set("token", token, { expires: 365 });

      console.log("Login successful");
    } catch (error) {
      console.error("Login failed", error.response.data);
    }
  };

  useEffect(() => {
    log();
  }, []);

  return (
    <div>
      <div className="col-sm-6 offset-3">
        <h1 className="reg">Login</h1>
        <br />
        <form onSubmit={(e) => log(e)}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Password"
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
