# Cloudflare Dynamic IP Updater

1. [API it uses](https://github.com/cloudflare/node-cloudflare)</a>
2. [To get all the data you need to fill in](https://api.cloudflare.com/#zone-list-zones)</a>
3. [Where is my API key?](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-CloudFlare-API-key)

## setting up

create a data.json in src/ with this data:

```javascript
{
  email: 'your cloudflare registered email',
  apiKey: 'see link above',

  interval: 'ms interval befor updating again',

  bodys: [
    {
      // data to update
      // how to get data? see link above
      // example:
      "id": "1234364963a456792b5e6a5243122f0",
      "type": "A",
      "name": "example.com",
      "proxiable": true,
      "proxied": true,
      "ttl": 1,
      "locked": false,
      "zone_id": "1234bf76f8b466545a3d7645daa",
      "zone_name": "example.com",
      "created_on": "2018-07-13T12:45:05.823980Z"
    }
  ]
}
```
