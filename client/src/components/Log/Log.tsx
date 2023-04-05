import style from "../../styles/Log/Log.module.css";
import MiniFooter from "../MiniFooter/MiniFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { loginUser } from "../../redux/actions/Users";
import swal from "sweetalert";
import SocialNetworks from "../Social networks/SocialNetworks";

function Log(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" && password === "") {
      swal({
        title: "All the fields are required",
        className: `${style.alert}`,
        icon: "warning",
      });
    } else if (email === "") {
      swal({
        title: "Email is required",
        className: `${style.alert}`,
        icon: "warning",
      });
    } else if (password === "") {
      swal({
        title: "Password is required",
        className: `${style.alert}`,
        icon: "warning",
      });
    } else {
        try {
            dispatch(loginUser(email, password));
            nav("/home");
        } catch (error) {
            swal({
                title: `Error: ${error}`,
                className: `${style.alert}`,
                icon: "error",
              }); 
        }
    }
  };

  return (
    <div className={style.container}>
      <form className={style.content} onSubmit={(e) => handleLogin(e)}>
        <div className={style.Logo}></div>
        <h2 className={style.title}>Log In</h2>
        <input
          className={style.input}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          name="email"
          id="email"
        />
        <input
          className={style.input}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        <div className={style.underinputs}>
          <div className={style.checkbox}>
            <input type="checkbox" id="checkbox" />
            <label>Remember Me</label>
          </div>
          <a>Forgot password?</a>
        </div>
        <button type="submit" className={style.btn}>
          LOG IN
        </button>
        <section>
          <p>Or Log In with</p>
          <div className={style.iconContainer}>
            <SocialNetworks />
          </div>
          <p>
            Don't have an account?<a href="/register"> Sign Up</a>
          </p>
        </section>
      </form>
      <MiniFooter />
    </div>
  );
}

export default Log;
