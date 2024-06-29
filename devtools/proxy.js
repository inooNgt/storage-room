var express = require("express");
var request = require("request");
var axios = require("axios");
var app = express();
app.use("/", async function (req, res) {
  var url = `https://bfiles.pingan.com.cn/brcp/stp/openapi/appgw/appservicegateway/live/home/lives?timestamp=1719586641962`;
  try {
    let { data } = await axios.get(url, {
      responseType: "stream",
    });
    console.log("data", data);
    data.pipe(res);
  } catch (error) {
    res.send(error);
    console.log("error", error);
  }
  // data.pipe(res);
  // req.pipe(request(url)).pipe(res);
});
app.listen(process.env.PORT || 3000);
console.log("app listen on http://127.0.0.1:3000/");
