import { Link } from "react-router-dom";

const People = ({ people, handleDelete }) => {
  return (
    <div className="border-2 border-green-500 p-4 text-center rounded-lg">
      <p>Name: {people.name}</p>
      <p>Email: {people.email}</p>
      <p>Age: {people.age}</p>
      <button
        onClick={() => handleDelete(people._id)}
        className="btn btn-error mt-2 text-white"
      >
        X
      </button>
      <Link to={`/update/${people._id}`}>
        <button className="btn btn-primary ml-2 mt-2 text-white">Update</button>
      </Link>
    </div>
  );
};

export default People;
