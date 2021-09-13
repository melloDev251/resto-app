const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config({ path: "./config/.env" });
const db = require("./config/db");

// middleware
app.use((req, res, next) => {
  console.log("Middleware started");
  next();
});

// express
// app.use(express.json())

// cors
const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// get all resto
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("select * from restaurants");
    const restoRatingData = await db.query(
      "select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );
    // console.log("results",results);
    console.log("restaurant data", restoRatingData);
    res.status(200).json({
      status: "success",
      results: restoRatingData.rowCount.length,
      data: {
        restaurant: restoRatingData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get one resto
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );
    console.log(restaurant.rows[0]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create resto
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try {
    const rb = req.body;
    const results = await db.query(
      "insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [rb.name, rb.location, rb.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update resto
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const rb = req.body;
    const results = await db.query(
      "update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [rb.name, rb.location, rb.price_range, req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// delete resto
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("delete from restaurants where id = $1", [
      req.params.id,
    ]);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// add review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const rb = req.body;
    const newReview = await db.query(
      "insert into reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning * ",
      [req.params.id, rb.name, rb.review, rb.rating]
    );
    // console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
