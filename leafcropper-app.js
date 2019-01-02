var jp2kfilename = decodeURIComponent(window.location.search.substr(1)).slice(2);

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
  var url = baseUrl + '/' + region.join(',') + '/full/0/default.jpg';
  $('#urlArea').html(
    '<a href="' + url + '" target=_blank>' + url + '</a>' + '&nbsp; &nbsp; <button type="button" class="btn" data-clipboard-text="'+ url + '">Copy</button>'
  )
  $('#footer').html(
    '<table><tr><td>' + baseUrl  + '<button type="button" class="btn" data-clipboard-text="'+ baseUrl + '">Copy</button></td> &nbsp; &nbsp; &nbsp; &nbsp; <td></td><td>' + region.join(',') + '<button type="button" class="btn" data-clipboard-text="'+ region.join(',') + '">Copy</button></td></tr></table>'
  )
});