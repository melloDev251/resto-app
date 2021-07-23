import React, { useContext, useState } from "react";
import RestoApi from "../api/RestoApi";
import { RestoContext } from "../context/RestoContext";

const AddResto = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("price range");

  const { addRestaurant } = useContext(RestoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RestoApi.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      console.log(res);
      addRestaurant(res.data.data.restaurant);
      setName("");
      setLocation("");
      setPriceRange("");
    } catch (err) {}
  };

  return (
    <div className=" mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              name="name"
              id="name"
              required
              value={name}
              type="text"
              className="form-control"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              value={location}
              type="text"
              className="form-control"
              placeholder="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              className="custom-select mr-sm-2"
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option>price range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button onClick={handleSubmit} type="submit" className="btn btn-info">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResto;
