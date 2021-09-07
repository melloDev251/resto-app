import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <>
      <div className="row row-cols-3 mb-2">
        {reviews.map((rev) => {
          return (
            <>
              <div
                key={rev.id}
                className="card text-white bg-primary mb-3 mr-4"
                style={{ maxWidth: "30%" }}
              >
                <div className="card-header d-flex justify-content-between">
                  <span> {rev.name} </span>
                  <span>
                    <StarRating rating={rev.rating} key={rev.id} />
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text"> {rev.review} </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Reviews;
