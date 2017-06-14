# Dependencies

These script are multi-platform, but rely on **NodeJS** to run.

# Configs deploy

_Soon on npm_

 * Edit the content of the files `config.js` e `connections.js` accordingly;
 * Install the dependencies: run `npm install`
    - Windows: `node deploy (production | local)` 
    - Linux/Mac: `./deploy (production | local)` ;

# Local deploy

To avoid git from traching config changes on your local deploy, execute:

```bash
git update-index --assume-unchanged connections.js
```

This will prevent git from ask you to commit your local connection data.