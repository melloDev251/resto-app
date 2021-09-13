import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestoApi from "../api/RestoApi";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StartRating from "../components/StarRating";
import { RestoContext } from "../context/RestoContext";

const Detail = (props) => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestoContext);

  // const {reviews, setReviews} = useContext(RestoContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestoApi.get(`/${id}`);
        console.log(res);
        setSelectedRestaurant(res.data.data);
      } catch (err) {}
    };
    fetchData();
  }, [setSelectedRestaurant, id]);

  return (
    <>
      <h3 className="mt-5" style={{ letterSpacing: "5px" }}>
        Détails restaurant
      </h3>
      <hr className="mb-4" />
      <div>
        {selectedRestaurant && (
          <>
            <h1 className="text-center display-3">
              {" "}
              {selectedRestaurant.restaurant.name}{" "}
            </h1>
            <div className="text-center">
              <StartRating
                rating={selectedRestaurant.restaurant.average_rating}
              />
              <span className="text-warning ml-1">
                {selectedRestaurant.restaurant.count
                  ? `(${selectedRestaurant.restaurant.count})`
                  : "(0)"}
              </span>
            </div>
            <div className="mt-3 ml-3">
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
            <AddReview />
          </>
        )}
      </div>
    </>
  );
};

export default Detail;
