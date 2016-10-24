'use strict';

var request = require('request'),
    qs = require('querystring'),
    fs = require('fs'),
    path = require('path');

var GOOGLE_ASR_URL = 'https://www.google.com/speech-api/v2/recognize?';

var GoogleASR = function(options, done) {

    var file = {},
        params = {},
        debug = options['debug'] || false;

    //reqired
    params['key'] = options['developer_key'];
    file['filepath'] = options['file'];
    file['content-type'] = options['content-type'] || 'audio/l16; rate=16000;';
    params['lang'] = options['lang'] || 'ru-RU';
    //optional
    params['output'] = options['output'] || 'json';

    var full_url = GOOGLE_ASR_URL + qs.stringify(params);

    if (debug) {
        console.log({
            url: full_url,
            path: file['filepath'],
            'content-type': file['content-type']
        });
    }
    const stream = (options.stream && typeof options.stream == "object" && options.stream.readable) ? options.stream : fs.createReadStream(options.file);
    stream.pipe(request.post({
        url: full_url,
        headers: {
            'Content-Type': file['content-type'],
        },

    }, function(err, res) {
        if (err) return done(err);
        var text = res.body;
        if (text) text = text.split('\n')[1];
        if (!text) return done(null, {
            result: []
        });
        try {
            done(null, JSON.parse(text));
        } catch (ex) {
            done(ex);
        }
    }));
};

module.exports = GoogleASR;
