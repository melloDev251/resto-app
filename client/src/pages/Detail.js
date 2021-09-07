import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestoApi from "../api/RestoApi";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
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
      <h3 className="mt-5" style={{letterSpacing:"5px"}}>Détails restaurant</h3>
      <hr className="mb-4" />
      <div>{selectedRestaurant && (
        <>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
            <AddReview />
        </>
      ) }</div>
    </>
  );
};

export default Detail;
