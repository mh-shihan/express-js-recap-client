import HomePeople from "../../components/home-people/HomePeople";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const fetchPeople = async () => {
    try {
      const response = await fetch("http://localhost:5000/peoples");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const { isPending, data: peoples = [] } = useQuery({
    queryKey: ["peoples"],
    queryFn: fetchPeople,
  });

  return (
    <>
      <h1 className="text-5xl font-bold text-center">Express Recap</h1>
      <p className="mt-20 mb-6 text-3xl font-bold text-center ">
        Total People : {peoples.length}
      </p>
      {isPending && (
        <span className="loading loading-dots loading-3xl text-center"></span>
      )}
      <div className="grid grid-cols-5 gap-2 mx-20  mb-20">
        {peoples.map((people) => (
          <HomePeople key={people.id} people={people}></HomePeople>
        ))}
      </div>
    </>
  );
};

export default Home;
