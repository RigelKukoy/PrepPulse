//Standardized response function
const handleResponse = (res, statusCode, message, data = null) => {
  const response = { statusCode, message, data };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

export default handleResponse;
