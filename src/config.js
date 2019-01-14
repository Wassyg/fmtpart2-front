var urlLocal = "http://localhost:3000";
var urlAws = "http://3.120.68.209:3000";

var urlBackend = (process.env.NODE_ENV == "development")? urlLocal : urlAws;

export default urlBackend;