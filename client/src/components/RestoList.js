import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import RestoApi from "../api/RestoApi";
import { RestoContext } from "../context/RestoContext";

const RestoList = (props) => {
  const { restaurant, setRestaurant } = useContext(RestoContext);
  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestoApi.get("/");
        setRestaurant(res.data.data.restaurant);
      } catch (err) {}
    };
    fetchData();
  }, [setRestaurant]);

  const handleUpdate = (id) => {
    history.push(`/resto/${id}/update`)
  }

  const handleDelete = async (id) => {
    try {
      await RestoApi.delete(`/${id}`);
      setRestaurant(restaurant.filter((resto)=>{
        return resto.id !== id
      }))
    } catch (err) {}
  };

  return (
    <>
      <div className="list-group">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {restaurant.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td> {item.name} </td>
                    <td> {item.location} </td>
                    <td> {"💲".repeat(item.price_range)} </td>
                    <td> reviews </td>
                    <td>
                      <button className="btn btn-warning mr-1" onClick={()=>handleUpdate(item.id)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if(window.confirm("Voulez vous supprimer ?")) {
                            handleDelete(item.id)
                          }
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
