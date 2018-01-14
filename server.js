const express = require('express'),
      request = require('request'),
      path    = require('path'),
      app     = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/*', function(req, res) {
  let url = 'http://pro-tekconsulting.com'+ req.baseUrl;
  let r = null;
  if(req.method === 'POST') {
    r = request.post({uri: url, json: req.body});
  } else {
    r = request(url);
  }

  req.pipe(r).pipe(res);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))
