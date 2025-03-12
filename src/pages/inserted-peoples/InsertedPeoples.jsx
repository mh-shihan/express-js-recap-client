import { useLoaderData } from "react-router-dom";
import People from "../../components/people/People";
import { useState } from "react";

const InsertedPeoples = () => {
  const loadedInsertedPeoples = useLoaderData();
  const [insertedPeoples, setInsertedPeoples] = useState(loadedInsertedPeoples);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/inserted-peoples/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          const remainingPeoples = insertedPeoples.filter(
            (people) => people._id !== id
          );
          setInsertedPeoples(remainingPeoples);
          alert("Deleted Successfully!");
        }
      });
  };
  return (
    <div>
      <p className="text-center font-medium text-2xl my-4">
        Total Inserted People : {insertedPeoples.length}
      </p>
      {
        <div className="grid grid-cols-5 gap-2 mx-20  mb-20">
          {insertedPeoples.map((people) => (
            <People
              key={people._id}
              people={people}
              handleDelete={handleDelete}
            ></People>
          ))}
        </div>
      }
    </div>
  );
};

export default InsertedPeoples;
