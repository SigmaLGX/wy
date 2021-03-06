'use strict';

const patBuilder = require('./.lib/patBuilder');
const staticResource = require('./.lib/staticResource');
const nunjucksBuilder = require('./.lib/nunjucksBuilder');

module.exports = {
  'GET /pat/:page.html': function(req, res, next) {
    patBuilder.build(req.params.page, res);
  },

  'GET /jj/:page.:ext': function(req, res, next) {
    nunjucksBuilder.build(`${req.params.page}.${req.params.ext}`, res);
  },

  'GET *.:ext': function(req, res, next) {
    const ext = req.params.ext.toLowerCase();
    if (['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'txt', 'less', 'scss'].indexOf(ext) >= 0) {
      staticResource.query(req, res, next);
    } else {
      next();
    }
  }
};
