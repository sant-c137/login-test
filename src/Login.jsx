import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const log = async (e) => {
    e.preventDefault();

    /*      await axios.post('http://127.0.0.1:8000/api/login',{'email':email,'password':password}).then((res)=>console.log(res));

    }
    useEffect(()=>{log()},[])*/
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        window.location.pathname = "dashboard";
      }

      // Assuming the server returns a token upon successful login
      const token = response.data.authorisation.token;

      // Save the token to localStorage
      // localStorage.setItem('authToken', token);

      //save in cookies
      // Cookie.setItem('authToken',token)
      Cookies.set("token", token, { expires: 365 });

      console.log("Login successful");
    } catch (error) {
      console.error("Login failed", error.response.data);
    }
  };
  useEffect(() => {
    log();
  }, []);

  // Save the token to localStorage

  return (
    <div>
      <div className="col-sm-6 offset-3">
        <h1 className="reg">Login</h1>
        <br></br>
        <form
          onSubmit={(e) => {
            log(e);
          }}
        >
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email"
          />
          <br></br>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Password"
          />
          <br></br>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
