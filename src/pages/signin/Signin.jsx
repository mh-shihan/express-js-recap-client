import { useContext } from "react";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProviders";
import toast from "react-hot-toast";
import GoogleLogin from "../../components/social-login/GoogleLogin";
import axios from "axios";

const Signin = () => {
  const { signinUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    console.log({ email, password });

    const toastId = toast.loading("Loading......");

    signinUser(email, password)
      .then((res) => {
        if (res?.user) {
          const user = res.user;
          //JWT
          axios
            .post("http://localhost:5000/jwt", user, { withCredentials: true })
            .then((res) => {
              console.log(res.data);
            });

          toast.success("SignIn Successful", { id: toastId });
          // navigate(location?.state ? location.state : "/", { replace: true });
        }
      })
      .catch((error) => {
        toast.error("Email or Username Is Not Correct", { id: toastId });
        console.log(error.message);
      });
  };
  return (
    <div className=" flex justify-center pt-10 bg-base-200 min-h-screen w-full">
      <div className="flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4">SignIn Now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <fieldset className="fieldset">
              {/* Email */}
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />

              {/* Password */}
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                SignIn
              </button>
            </fieldset>
          </form>
          <GoogleLogin></GoogleLogin>
          <p className="text-sm text-center">
            <span>Do not have any account? </span>{" "}
            <Link to="/signup">
              <span className="text-blue-800 underline cursor-pointer font-semibold">
                SignUP
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
