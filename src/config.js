var urlLocal = "http://localhost:3000";
var urlAws = "http://18.194.131.211:3000";

var urlBackend = (process.env.NODE_ENV == "development")? urlLocal :urlAws;

export default urlBackend;