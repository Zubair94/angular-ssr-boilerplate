import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import {join} from 'path';

enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const enServer = require('./dist/server/en/main');
const bnServer = require('./dist/server/bn/main');

const languageEngines = [{
  id: 'bn',
  base: '/bn/',
  engine: ngExpressEngine({
    bootstrap: bnServer.AppServerModuleNgFactory,
    providers: [provideModuleMap(bnServer.LAZY_MODULE_MAP)]
  })
},
{
  id: 'en',
  base: '/en/',
  engine: ngExpressEngine({
    bootstrap: enServer.AppServerModuleNgFactory,
    providers: [provideModuleMap(enServer.LAZY_MODULE_MAP)]
  })
}];

// Load your engine
app.engine('html', (filePath, options, callback) => {
  options.engine(
    filePath,
    { req: options.req, res: options.res},
    callback
  )
});

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// handle en and wildcard file routes
app.get('*.*', express.static(DIST_FOLDER));

// handle routes for each language
Object.keys(languageEngines).forEach(key => {
  console.log(languageEngines[key].id);
  app.get(`${languageEngines[key].base}*`, (req, res) => {
    res.render(`${languageEngines[key].id}/index.html`, {
      req,
      res,
      engine: languageEngines[key].engine
    });
  });
});

app.get('*', (req, res) => {
  res.render(`${"en/index.html"}`, {req, res, engine: languageEngines[1].engine})
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});