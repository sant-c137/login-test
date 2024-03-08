import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reg = async (e) => {
    e.preventDefault();

    /*await axios.post('http://127.0.0.1:8000/api/register',{'name':name , 'email':email , 'password':password}).then((res)=>{console.log(res)})*/

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        window.location.pathname = "dashboard";
      }

      // Assuming the server returns a token upon successful login
      const token = response.data.authorisation.token;

      // Save the token to localStorage
      localStorage.setItem("authToken", token);

      console.log("register successful");
    } catch (error) {
      console.error("register failed", error.response.data);
    }
  };
  useEffect(() => {
    reg();
  }, []);

  return (
    <>
      <div className="col-sm-6 offset-3">
        <h1 className="reg">Register</h1>
        <br></br>
        <form
          onSubmit={(e) => {
            reg(e);
          }}
        >
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Name"
          />
          <br></br>

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
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
