import React from "react";
import PostInput from "../components/idea/PostInput";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/idea/create-idea">
        <button
          type="button"
          className="w-[8rem] text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-3 py-2.5 text-center"
        >
          Add Ideas
        </button>
      </Link>
    </div>
  );
};

export default Home;
