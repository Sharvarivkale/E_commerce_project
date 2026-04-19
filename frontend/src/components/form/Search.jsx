import React from "react";
import { useSearch } from "../../context/search_context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data.data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 px-2 py-1 text-black rounded"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
