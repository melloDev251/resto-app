import React, { useState } from "react";

const AddReview = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("rating");
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              type="text"
              id="name"
              className="form-control"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              className="custom-select"
              id="rating"
              onChange={(e) => setRating(e.target.value)}
            >
              <option>select your rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            name="review"
            value={reviewText}
            id="review"
            cols="30"
            rows="10"
            className="form-control"
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddReview;
