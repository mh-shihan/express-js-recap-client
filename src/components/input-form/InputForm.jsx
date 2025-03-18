import toast from "react-hot-toast";
import useAuthInfo from "../../hooks/useAuthInfo";

const InputForm = () => {
  const { user } = useAuthInfo();
  console.log(user?.email);
  const handleInputFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = user?.email;
    const age = form.age.value;

    const userInfo = { name, email, age };
    console.log("Input form submitted", userInfo);

    // Create Post Method
    fetch("http://localhost:5000/peoples", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Inserted Successfully");
          // form.reset();
        }
      });
    // .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <h1 className="text-3xl text-center font-medium mb-4"> INSERT FORM</h1>
      <form
        onSubmit={handleInputFormSubmit}
        className="flex flex-col gap-4 w-1/4 border-2 border-fuchsia-700 p-10 rounded-lg bg-slate-400"
      >
        <input
          className="rounded-md"
          type="text"
          name="name"
          placeholder="name"
          id=""
        />
        <input
          className=" rounded-md"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          defaultValue={user?.email}
          id=""
        />
        <input
          className=" rounded-md"
          type="number"
          name="age"
          placeholder="age"
          id=""
        />
        <input
          className="border border-black rounded-md font-medium cursor-pointer bg-emerald-400"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default InputForm;
