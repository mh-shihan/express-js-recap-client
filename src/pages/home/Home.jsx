import { useEffect, useState } from "react";
import HomePeople from "../../components/home-people/HomePeople";

const Home = () => {
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch("http://localhost:5000/peoples");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPeoples(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-center">Express Recap</h1>
      <p className="mt-20 mb-6 text-3xl font-bold text-center ">
        Total People : {peoples.length}
      </p>
      <div className="grid grid-cols-5 gap-2 mx-20  mb-20">
        {peoples.map((people) => (
          <HomePeople key={people.id} people={people}></HomePeople>
        ))}
      </div>
    </>
  );
};

export default Home;
