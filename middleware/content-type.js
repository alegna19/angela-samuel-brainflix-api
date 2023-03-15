const checkContentType = (req, res, next) => {
  console.log("Checking POST request content type...");

  if (
    req.method === "POST" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).json({
      error: true,
      message: "This API only accepts JSON data for a POST requset body",
    });
  }

  next();
};

module.exports = checkContentType;
