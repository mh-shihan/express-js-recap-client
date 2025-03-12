const HomePeople = ({ people }) => {
  return (
    <div className="border-2 border-green-500 p-4 text-center rounded-lg">
      <p>Name: {people.name}</p>
      <p>Email: {people.email}</p>
      <p>Age: {people.age}</p>
    </div>
  );
};

export default HomePeople;
