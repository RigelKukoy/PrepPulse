const errorHandler = (err, req, res, next) => {
  console.log("Error Stack:", err.stack);
  console.log("Request Body:", req.body); // Log the request body

  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message,
    requestBody: req.body || "No body received", // Include request body in the response
  });
};

export default errorHandler;
