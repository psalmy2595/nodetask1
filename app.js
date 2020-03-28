//  import packages to use in funtions
const fs = require('fs');
const http = require('http'); 
const url = require('url') ;
const querystring =require('querystring');

   // use backticks for multi line

fs.readFile('./index.html', function (error, myHtml) {
  http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    const reqUrl = url.parse(req.url, true);
    // res.write("<h1> hello world </h1>")
    //if statement to get message frm user and save in file
    if (reqUrl.pathname == "/message" && req.method == "POST") {
      req.on("data", data => {
        let queryData = "";
        queryData += data;
        querystring.parse(queryData);
        console.log(queryData);
        const message = queryData.split("=")[1].replace("+", " ");
        fs.writeFile("message.txt", message, err => {
          if (err) {
            console.log("Error", err);
          }
          console.log("sumbitted succesfully");
          res.write(`<center><h1>sumbitted succesfully <br><a href='/'>Go back<a/></center></h1>`)
          res.end();
        });
        // console.log("message", message);
      });
    } else {
      res.write(myHtml);
      
      res.end();
    }
   
  })
  .listen(8080);
})
