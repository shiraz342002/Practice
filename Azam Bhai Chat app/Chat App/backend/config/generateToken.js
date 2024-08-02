const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  console.log("before", id);
  id = "647c178832ba966d19ba664b";
  console.log("after", id);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
