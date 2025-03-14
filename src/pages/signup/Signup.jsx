import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../firebase/AuthProviders";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signupUser, updateUser } = useContext(AuthContext);
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const toastId = toast.loading("Loading.....");

    signupUser(email, password)
      .then(() => {
        updateUser(name).then(() => {
          const userInfo = { name, email };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                toast.success(`SignUp Successful`, { id: toastId });
              }
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className=" flex justify-center pt-10 bg-base-200 min-h-screen w-full">
      <div className="flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-4">Signup Now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">
            <fieldset className="fieldset">
              {/* Name */}
              <label className="fieldset-label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />

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
                Signup
              </button>
            </fieldset>
          </form>
          <p className="text-sm text-center">
            <span>Already Have an account </span>{" "}
            <Link to="/signin">
              <span className="text-blue-800 underline cursor-pointer font-semibold">
                Signin
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
