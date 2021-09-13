import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import RestoApi from "../api/RestoApi";
import { RestoContext } from "../context/RestoContext";
import StartRating from "./StarRating";

const RestoList = (props) => {
  const { restaurant, setRestaurant } = useContext(RestoContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestoApi.get("/");
        console.log("New Resto", res.data.data);
        setRestaurant(res.data.data.restaurant);
      } catch (err) {}
    };
    fetchData();
  }, [setRestaurant]);

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/resto/${id}/update`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestoApi.delete(`/${id}`);
      setRestaurant(
        restaurant.filter((resto) => {
          return resto.id !== id;
        })
      );
    } catch (err) {}
  };

  const handleClickedResto = (id) => {
    history.push(`/resto/${id}/detail`);
  };

  const renderRating = (resto) => {
    if(!resto.count) {
      return <span className="text-warning ml-3"> 0 reviews </span>

    }
    return (
      <>
        <StartRating rating={resto.id} />
        <span className="text-warning ml-3">({resto.count})</span>
      </>
    );
  };

  return (
    <>
      <div className="list-group">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {restaurant.map((resto) => {
              return (
                <>
                  <tr
                    onClick={() => handleClickedResto(resto.id)}
                    key={resto.id}
                    style={{ cursor: "pointer" }}
                  >
                    <td> {resto.id} </td>
                    <td> {resto.name} </td>
                    <td> {resto.location} </td>
                    <td> {"💲".repeat(resto.price_range)} </td>
                    <td> {renderRating(resto)} </td>
                    <td>
                      <button
                        className="btn btn-warning mr-1"
                        onClick={(e) => handleUpdate(e, resto.id)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => {
                          // if (window.confirm("Voulez vous supprimer ?")) {
                          // }
                          handleDelete(e, resto.id);
                          window.alert("delete successfully !");
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RestoList;
