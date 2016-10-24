var google_speech = require('../index');
var fs = require('fs');

google_speech.ASR({
    developer_key: 'XXXXXXXXXXXXXXXXXx',
    stream: fs.createReadStream('data/sample.wav')
  }, function(err, httpResponse, xml){
    if(err){
        console.log(err);
      }else{
        console.log(httpResponse.statusCode, xml)
      }
    }
);
