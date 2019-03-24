function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

var manifest_url = getQueryStringValue("manifest");

var canvas_url = getQueryStringValue("canvas");

// var jp2kfilename = decodeURIComponent(window.location.search.substr(1)).slice(2);
var jp2kfilename = getQueryStringValue("jp2k");
var baseUrl = jp2kfilename;

var map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0,
});

var iiifLayer = L.tileLayer.iiif(baseUrl + '/info.json', {
  tileSize: 512
}).addTo(map);

var areaSelect = L.areaSelect({
  width:100, height:100
});

areaSelect.addTo(map);

$('#urlArea').html(baseUrl)

areaSelect.on('change', function() {
  var bounds = this.getBounds();
  var zoom = map.getZoom();
  var min = map.project(bounds.getSouthWest(), zoom);
  var max = map.project(bounds.getNorthEast(), zoom);
  var imageSize = iiifLayer._imageSizes[zoom];
  var xRatio = iiifLayer.x / imageSize.x;
  var yRatio = iiifLayer.y / imageSize.y;
  var region = [
    Math.floor(min.x * xRatio),
    Math.floor(max.y * yRatio),
    Math.floor((max.x - min.x) * xRatio),
    Math.floor((min.y - max.y) * yRatio)
  ];
  if ($("#LinkText").val() === 'undefined')
  {
      link_label01 = "Link target";
  }
  else 
  {
    link_label01 = $("#LinkText").val();   
  }
  var url = baseUrl + '/' + region.join(',') + '/full/0/default.jpg';
$('#urlArea').html(
    '<table><tr><td><form action=""><input type="text" id="LinkText" size="100" value="'+link_label01+'" /><span> Link text</span></form></td></tr><tr><td><a href="' + url + '" target=_blank>' + url + '</a>' +
    '&nbsp; &nbsp; <button type="button" class="btn" data-clipboard-text="'+ url + '">Copy</button></td></tr></table>'
  );
var happy = '{"@context": "http://iiif.io/api/presentation/0/context.json", "id": "'+canvas_url+'_xywh='+region+
'", "type": "Annotation", "motivation": ["highlighting"], "resource":{"type":"dctypes:Text","format":"text/plain","chars":"'+link_label01+
'"}, "target": {"id":"'+canvas_url+'#xywh='+region+'","type":"Canvas","partOf":{"id": "'+manifest_url+'","type":"Manifest"}}}';
  var happy64 = btoa(happy);
$('#footer').html(
    '<table><tr><td>'+happy+'</td><td><button type="button" class="btn" data-clipboard-text="'+ happy64 + '">Copy content-state 64</button></td><td></td><td></td></tr><tr><td>' + manifest_url +
    '<button type="button" class="btn" data-clipboard-text="'+ manifest_url + '">Copy manifest</button></td></tr><tr><td>' + canvas_url + '<button type="button" class="btn" data-clipboard-text="'+
    canvas_url + '">Copy canvas</button></td></tr><tr><td>' + baseUrl  + '<button type="button" class="btn" data-clipboard-text="'+ baseUrl +
    '">Copy</button></td> &nbsp; &nbsp; &nbsp; &nbsp; <td></td><td>' + region.join(',') + '<button type="button" class="btn" data-clipboard-text="'+ region.join(',') + '">Copy</button></td></table>'
  );
 });
