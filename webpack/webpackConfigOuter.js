const { join, } = require('path');
const { writeFile } = require('fs/promises');

/**
* out webpack config for debuging config work
* @param {*} config 
* @param {import('next/dist/server/config-shared').WebpackConfigContext} options 
*/
function webpackConfigOuter(config, options) {
 const nextDirPath = join(__dirname, '.next');

 let jsonObj = {
   config,
   options,
 };

 jsonObj = JSON.stringify(jsonObj, (key, value) => {
   if (typeof value === 'bigint') {
     return value.toString();
   } else if (typeof value === 'function') {
     return value.toString();
   }
   return value;
 }, 2);

 writeFile(join(nextDirPath, `config.${options.isServer ? 'server' : 'client'}.json`), jsonObj, 'utf-8');
};

module.exports = webpackConfigOuter;