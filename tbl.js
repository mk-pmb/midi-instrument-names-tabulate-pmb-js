/*jslint indent: 2, maxlen: 80 */
/* -*- tab-width: 2 -*- */
/*global define: true, module: true, require: true */
((typeof define === 'function') && define.amd ? define : function (factory) {
  'use strict';
  var m = ((typeof module === 'object') && module), e = (m && m.exports);
  if (e) { m.exports = (factory(require, e, m) || m.exports); }
})(function () {
  'use strict';
  var EX = {};

  function ifObj(x, d) { return ((x && typeof x) === 'object' ? x : d); }

  function tmpl(t, dd, x) {
    x = (x || tmpl);
    return function (data) {
      if (dd && ifObj(data)) { data = Object.assign({}, dd, data); }
      function insVar(m, v) { return (v ? data[m && v] : data); }
      function frag(f) {
        if (f.prop) { f = (f.obj || x)[f.prop]; }
        if (f.call) { f = f.call(x, data); }
        if (f.map) { return f.map(frag).join('\n'); }
        return f.replace(/&\$(\w*);/g, insVar);
      }
      return frag(t);
    };
  }
  EX.tmpl = tmpl;

  EX.colOl = function (data, indent) {
    if (!data) { throw new Error('No data?'); }
    var ind = (indent || ''), offset = (+data.from || 0),
      perRow = (+data.maxRows || 10);
    return data.items.map(function (item, idx) {
      var li = ind + '  <li><span>' + item + '</span></li>';
      if (idx % perRow) { return li; }
      return (idx ? [ ind + '</ol>' ] : []
        ).concat(ind + '<ol start="' + (idx + offset) + '">', li);
    }).concat(ind + '</ol>');
  };

  EX.listChap = function (dd) {
    return tmpl([
      '<chapter name="&$name;" class="&$cls;"><h2>&$name;</h2>',
      function colSp2(data) { return EX.colOl(data, '  '); },
      '  <hr class="unfloat">',
      '</chapter>',
    ], dd);
  };

  EX.renderHtml = function renderHtml(data) {
    function instFam(fam) {
      return EX.listChap({ cls: 'instr',
        items: data.instruments.slice(fam.from - 1, fam.upto),
        })(fam);
    }
    return tmpl([
      data.families.map(instFam),
      EX.listChap()({ cls: 'drums', name: 'Drums',
        from: data.drumsOffset, items: data.drums,
        }),
    ])();
  };

  EX.htmlPage = [
    '<!DOCTYPE html><html><head>',
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    '  <title>&$title;</title>',
    '  <link rel="stylesheet" type="text/css" href="&$css;">',
    '</head><body>',
    '&$body;',
    '</body></html>',
  ];










  return EX;
});
