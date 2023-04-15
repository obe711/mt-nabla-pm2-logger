# mt-nabla-pm2-logger





Create hidden directory in project

```
mkdir .sites
```
Create PM2 config file for each site to watch: 
Example pm2 config file `./.sites/LOGGER-example-pm2.config.json

```JSON
{
  "apps": [
    {
      "name": "LOGGER-example.com",
      "script": "./src/index.js",
      "instances": 1,
      "autorestart": true,
      "watch": false,
      "time": true,
      "env": {
        "NODE_ENV": "production",
        "OUT_LOG_FILE": "example-out-0.log",
        "ERROR_LOG_FILE": "example-error-0.log",
        "SITE_NAME": "example.com"
      },
      "log_type": "json",
      "merge_logs": true
    }
  ]
}
```

Run in production
```
CONFIG_FILE=./.sites/LOGGER-example-pm2.config.json yarn start:production
```