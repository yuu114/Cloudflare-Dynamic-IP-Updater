const jData = require('./data.json');
const http = require('http');
const fs = require('fs');
const cf = require('cloudflare')({
  email: jData.email,
  key: jData.apiKey
});

function updateIP(newIP) {
  const ip = newIP.replace('\n', '');
  const newTime = new Date().toISOString();

  for (let i = 0; i < jData.bodys.length; i++) {
    const newBody = jData.bodys[i];
    newBody.content = ip;
    newBody.modified_on = newTime;

    cf.dnsRecords.edit(jData.bodys[i].zone_id, jData.bodys[i].id, newBody)
      .then(res => {})
      .catch(err => {
        if (err) console.error(err);
      });
  }
  console.log('updated IP addresses');
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
      }
    });
  });
}

setInterval(getNewIP, jData.interval);
