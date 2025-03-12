import { useLoaderData, useNavigate } from "react-router-dom";

const Update = () => {
  const loadedPeople = useLoaderData();
  const navigate = useNavigate();

  const handleUpdatePeople = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const age = form.age.value;

    const updatedPeople = { name, email, age };
    console.log(updatedPeople);

    fetch(`http://localhost:5000/inserted-peoples/${loadedPeople._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedPeople),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          alert("Updated Successfully!");
          navigate("/inserted-peoples");
        }
      });
  };
  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h1 className="text-3xl text-center font-medium mb-4"> UPDATE FORM</h1>
      <form
        onSubmit={handleUpdatePeople}
        className="flex flex-col gap-4 w-1/4 border-2 border-fuchsia-700 p-10 rounded-lg bg-slate-400"
      >
        <input
          className="rounded-md"
          type="text"
          name="name"
          placeholder="name"
          defaultValue={loadedPeople?.name}
        />
        <input
          className=" rounded-md"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          defaultValue={loadedPeople?.email}
        />
        <input
          className=" rounded-md"
          type="number"
          name="age"
          placeholder="age"
          defaultValue={loadedPeople?.age}
        />
        <input
          className="border border-black rounded-md font-medium cursor-pointer bg-emerald-400"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default Update;
