function errorsHandler(err, req, res, next) {
  console.log(err.stack.split("\n")[0], "err:" + err.stack.split("\n")[1]);
  //console.log(err);
  res.status(err.statusCode || 500);
  res.json({
    status: err.statusCode || 500,
    error: err.message,
  });
}
export default errorsHandler;