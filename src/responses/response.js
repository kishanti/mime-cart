function Response() {
    this.status = 200;
    this.ResponseCode = 1;
    this.success = true;
    this.message = "";
    this.data = {};
  }
  
  function successResponse(code, message, data) {
    let res = new Response();
    res.status = 200;
    res.ResponseCode = code;
    res.success = true;
    res.message = message;
    res.data = data;
    return res;
  }
  
  function badRequest(code, message) {
    let res = new Response();
    res.status = 400;
    res.ResponseCode = code;
    res.success = true;
    res.message = message;
    res.data = {};
    return res;
  }
  
  function notFound(code, message, data) {
    let res = new Response();
    res.status = 404;
    res.ResponseCode = code;
    res.success = true;
    res.message = message;
    res.data = data;
    res.err = data;
  
    return res;
  }
  
  function validationError(code, message, data, err) {
    let res = new Response();
    res.status = 422;
    res.ResponseCode = code;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
    return res;
  }
  
  function serverError(code, message, data, err) {
    let res = new Response();
    res.status = 500;
    res.ResponseCode = code;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
  
    return res;
  }
  
  function failAuthorization(code, message, data, err) {
    let res = new Response();
    res.status = 409;
    res.ResponseCode = code;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
  
    return res;
  }
  
  function forbidden(code, message, data, err) {
    let res = new Response();
    res.status = 403;
    res.ResponseCode = code;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
  
    return res;
  }
  
  function requestTimeOut(code, message, data, err) {
    let res = new Response();
    res.status = 408;
    res.ResponseCode = code;
    res.success = false;
    res.message = message;
    res.ResponseData = data;
    res.err = err;
  
    return res;
  }
  
  function invalidToken(code, message, data, err) {
    let res = new Response();
    res.status = 401;
    res.ResponseCode = code;
    res.success = false;
    res.message = message;
    res.ResponseData = data;
    res.err = err;
  
    return res;
  }
  
  module.exports = {
    successResponse,
    serverError,
    notFound,
    validationError,
    failAuthorization,
    requestTimeOut,
    forbidden,
    badRequest,
    invalidToken,
  };
  