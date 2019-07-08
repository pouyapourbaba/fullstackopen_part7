const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  let authorization = request.get("authorization");
  // console.log("authorization ", authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.substring(7);
    request.token = token;
    if (!token) {
      response.status(401).json({ error: "token missing or invalid" });
    }
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
