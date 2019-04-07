# IIIFTreeCreeper
Webpage to navigate IIIF manifest collections in human viewable mode. 

These pages are designed to use the Durham University Library IIIF collection manifest tree that is based at http://iiif.durham.ac.uk/manifests/trifle/collection/index - to use in a different context change this variable start_json_data_url at line 20. It also uses the Mirador viewer located at https://iiif.durham.ac.uk/index.html which has been modified to accept manifest and canvas variables (see Javascript added to https://iiif.durham.ac.uk/index.html by viewing source) These work with the Durham University Library implementation of IIIF (based upon arks - see https://www.durhampriory.ac.uk/about-the-project/technology/ark-urls/) and may need to be adapted to work in other contexts.

This is a simple example of using handlebars.js to navigate and extract values from JSON. The main file is DULIIIFTree.html, which displays IIIF collections as buttons and manifests as links that open Mirador to view the content. DULIIIFdaoer.html is accessed using the EAD links button to the right of any manifest and loads a page giving an EAD <dao> element that can be pasted into an EAD catalogue to link to that image within a manifest (using the Durham Mirador viewer). It also allows for individual JP2K files from the manifest to be loaded and using code at https://bl.ocks.org/mejackreed/6936585f435b60aa9451ae2bc1c199f2 the xywh co-ordinates for an area can be copied to give the IIIF image api conformant url for that part of the page and a base64 encoded link to a manifest, canvas and xywh area to be copied (see draft version at https://preview.iiif.io/api/import-to-viewers/api/content-state/0.2/)

A working example is at http://fautedemieux.net/DULIIIFTree.html

## Working with images

Here is an individual page from a book loaded by clicking the image cropper button, selecting the treecreeper rather than the nuthatch.
![alt text](https://user-images.githubusercontent.com/10447781/54477425-a4492380-47ff-11e9-8e1d-b662951adbd8.png)
The cropping box can be adjusted to the area required, which will update the url at the top and the four figures in the bottom right corner.
The url at the top is the IIIF image api compliant url to load the part of the image highlighted - https://iiif.durham.ac.uk/iiif/trifle/32150/t2/mz/02/t2mz029p4773/aafd43ee0d77e078a2f097f3d0c1e225.jp2/1693,3303,878,1167/full/0/default.jpg (this works but our image server currently crashes with many of these, for which apologies).
The json fragment at the bottom is the link to open this in a content-state compliant viewer - the copy content-state 64 button copies a base64 encoded version of this into your clipboard. This can be sent to a compatible viewer thus: https://iiif.durham.ac.uk/index.html?iiif-content=eyJAaWQiOiJodHRwczovL2lpaWYuZHVyaGFtLmFjLnVrL21hbmlmZXN0cy90cmlmbGUvMzIxNTAvdDIvbXovMDIvdDJtejAyOXA0NzczL2NhbnZhcy90MnQ2MTA4dmMxOWYjeHl3aD0xNjkzLDMzMDMsODc4LDExNjciLCJAdHlwZSI6IkNhbnZhcyIsIndpdGhpbiI6eyJAaWQiOiAiaHR0cHM6Ly9paWlmLmR1cmhhbS5hYy51ay9tYW5pZmVzdHMvdHJpZmxlLzMyMTUwL3QyL216LzAyL3QybXowMjlwNDc3My9tYW5pZmVzdCIsIkB0eXBlIjoiTWFuaWZlc3QifX0=
The remaining copyable fields give the current IIIF manifest and canvas, the base JPG2000 file and the selected area related to the whole image.
arboretum.html provides access to some IIIF collections
