
<!--#echo json="package.json" key="name" underline="=" -->
midi-instrument-names-tabulate-pmb
==================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Make an overview table for your favorite MIDI patch set.
<!--/#echo -->


Usage
-----

`./cli.js module_name output_format [dest_file]`

* `module_name`: an identifier by which to `require()` your patch set data.
* supported `output_format`s: `html`
* `dest_file`: filename for output. missing/empty = stdout

```bash
$ ./cli.js midi-instrument-names-gm1-pmb html gm1.html
$ grep title gm1.html
  <title>GM1 Sound Set</title>
$ wkhtmltopdf --orientation Landscape gm1.html gm1.pdf
```


Security considerations
-----------------------

* The HTML generator does not escape any names in your patch set.
  It's meant as a feature.
  If you suspect your patch set data to abuse that freedom, defuse it.



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
