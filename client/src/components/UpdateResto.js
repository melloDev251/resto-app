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
  // console.log(id);
  let history = useHistory();
  // const { restaurant } = useContext(RestoContext);

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
      {/* <h1> {restaurant[0].location} </h1> */}
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
          <label htmlFor="price_range">Price range (1 à 5)</label>
          <select
            className="custom-select mr-sm-2"
            id="price_range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>

          {/* <input
            type="number"
            className="form-control"
            id="price_range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          /> */}
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
