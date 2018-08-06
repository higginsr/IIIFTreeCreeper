# IIIFTreeCreeper
Webpage to navigate IIIF manifest collections in human viewable mode. 

These pages are designed to use the Durham University Library IIIF collection manifest tree that is based at http://iiif.durham.ac.uk/manifests/trifle/collection/index - to use in a different context change this variable start_json_data_url at line 20. It also uses the Mirador viewer located at https://iiif.durham.ac.uk/index.html which has been modified to accept manifest and canvas variables (see Javascript added to https://iiif.durham.ac.uk/index.html by viewing source) These work with the Durham University Library implementation of IIIF (based upon arks - see https://www.durhampriory.ac.uk/about-the-project/technology/ark-urls/) and may need to be adapted to work in other contexts.

This is a simple example of using handlebars.js to navigate and extract values from JSON. The main file is DULIIIFTree.html, which displays IIIF collections as buttons and manifests as links that open Mirador to view the content. DULIIIFdaoer.html is accessed using the EAD links button to the right of any manifest and loads a page giving an EAD <dao> element that can be pasted into an EAD catalogue to link to that image within a manifest (using the Durham Mirador viewer).

A working example is at http://fautedemieux.net/DULIIIFTree.html
