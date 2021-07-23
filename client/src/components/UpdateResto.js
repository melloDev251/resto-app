import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import RestoApi from "../api/RestoApi";
import { NavLink } from "react-router-dom";
// import { RestoContext } from "../context/RestoContext";

const UpdateResto = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const { id } = useParams();
  let history = useHistory();
  //   const { restaurant } = useContext(RestoContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestoApi.get(`/${id}`);
        console.log(res.data.data);
        setName(res.data.data.restaurant.name);
        setLocation(res.data.data.restaurant.location);
        setPriceRange(res.data.data.restaurant.price_range);
      } catch (err) {}
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RestoApi.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price range</label>
          <input
            type="number"
            className="form-control"
            id="price_range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-warning mr-1"
        >
          Update
        </button>
        <NavLink exact to="/">
          <button className="btn btn-danger">Go back</button>
        </NavLink>
      </form>
    </div>
  );
};

export default UpdateResto;
