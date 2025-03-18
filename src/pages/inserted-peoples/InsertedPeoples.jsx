import People from "../../components/people/People";
import { useEffect, useState } from "react";
import useAuthInfo from "../../hooks/useAuthInfo";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const InsertedPeoples = () => {
  // const [insertedPeoples, setInsertedPeoples] = useState([]);
  const { user } = useAuthInfo();
  const fetchInsertedPeoples = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/inserted-peoples?email=${user?.email}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching inserted peoples:", error);
    }
  };

  const {
    refetch,
    isPending,
    data: insertedPeoples = [],
  } = useQuery({
    queryKey: ["insertedPeople"],
    queryFn: fetchInsertedPeoples,
  });

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/inserted-peoples/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Deleted Successfully.", {
            style: {
              border: "1px solid #D32F2F", // Dark red border
              padding: "16px",
              color: "#D32F2F", // Red text color
              backgroundColor: "#FFEBEE", // Light red background for visibility
            },
            iconTheme: {
              primary: "#D32F2F", // Red icon color
              secondary: "#FFCDD2", // Lighter red for contrast
            },
          });
        }
      });
  };
  return (
    <div>
      <p className="text-center font-medium text-2xl my-4">
        Total Inserted People : {insertedPeoples.length}
      </p>
      {isPending && (
        <span className="loading loading-dots loading-3xl text-center"></span>
      )}
      {
        <div className="grid grid-cols-5 gap-2 mx-20  mb-20">
          {insertedPeoples &&
            insertedPeoples?.map((people) => (
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
