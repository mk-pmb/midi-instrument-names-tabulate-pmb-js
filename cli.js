#!/usr/bin/env node
/*jslint indent: 2, maxlen: 80, node: true */
/* -*- coding: UTF-8, tab-width: 2 -*- */
'use strict';

var tabu = require('./tbl.js'), fs = require('fs');

function cli(data, destFmt, destFile) {
  if (typeof data === 'string') { data = require(data); }
  var render = cli[destFmt], output;
  if (!render) {
    throw new Error('Unsupported output format: ' + String(destFmt));
  }
  output = render(data);
  if (destFile) { return fs.writeFile(destFile, output + '\n'); }
  console.log(output);
}


cli.html = function (data) {
  return tabu.tmpl(tabu.htmlPage, {
    title: String(data.patchSetName || 'Unnamed') + ' Sound Set',
    css: 'style1.css',
    body: tabu.renderHtml(data),
  })(data);
};


module.exports = cli;
if (require.main === module) { cli.apply(null, process.argv.slice(2)); }
