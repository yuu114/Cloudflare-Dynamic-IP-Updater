const jData = require('../data.json');
const http = require('http');
const fs = require('fs');
const cf = require('cloudflare')({
  email: jData.email,
  key: jData.apiKey
});

function updateIP(newIP) {
  const newTime = new Date().toISOString();

  const newBody = jData.body;
  newBody.content = newIP.replace('\n', '');
  newBody.modified_on = newTime;

  cf.dnsRecords.edit(jData.body.zone_id, jData.body.id, newBody).then(res => {
    fs.appendFile('../log/IPChangeLog.txt', `New IP: ${newIP}\r\n`, err => {
      if (err) console.error(err);
    });
    console.log(res);
  }).catch(err => {
    if (err) console.error(err);
  });
}

function getNewIP() {
  http.get('http://icanhazip.com', res => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', chunk => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        const parsedData = rawData;
        updateIP(parsedData);
      } catch (e) {
        console.error(e.message);
        fs.appendFile('../log/IPChangeLog.txt', `Error: ${e.message}\r\n`);
      }
    });
  });
}

setInterval(getNewIP, jData.interval);
