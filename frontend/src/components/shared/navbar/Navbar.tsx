import React from "react";
import { getAllCourses, getBootcamps } from "services/api";

const Navbar = () => {
  const [offset, setOffset] = React.useState(0); // Pagination

  const fetchData = async () => {
    const data = await getBootcamps({ offset });
    console.log(data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return <div className="text-indigo-950 font-sans text-4xl">Navbar</div>;
};

export default Navbar;
