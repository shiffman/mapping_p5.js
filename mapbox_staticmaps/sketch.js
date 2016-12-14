var mapimg;
var bounds;
var rbounds;

var x1 = 2.3522;
var y1 = 48.8566;

var x2 = 8.6821;
var y2 = 50.1109;
var zoom = 5;

var projection;

function setup() {
  angleMode(RADIANS);
  projection = new SphericalMercator();
  var size = [800, 600];
  createCanvas(size[0], size[1]);
  //var center = [2.3522, 48.8566];
  var center = [x1, y1];

  bounds = geoViewport.bounds(center, zoom, size);
  // -west, -south, +east, +north order.

  console.log(bounds);
  rbounds = [];
  for (var i = 0; i < bounds.length; i++) {
    rbounds[i] = radians(bounds[i]);
  }

  var imgurl = 'https://api.mapbox.com/styles/v1/shiffman/ciwnzqxww005e2qnxepqmkax3/static/' +
    center.join(',') + ',' +
    zoom + '/' +
    size.join('x') +
    '?access_token=' + 'pk.eyJ1Ijoic2hpZmZtYW4iLCJhIjoiQmpHeUpfWSJ9.oeJv73FjnroBxI1GQ3bU_Q';

  mapimg = createImg(imgurl, ready);

}

function mercX(lon) {
  lon = radians(lon);
  return (256 / PI) * pow(2, zoom) * (lon + PI);
}

function mercY(lat) {
  lat = radians(lat);
  return (256 / PI) * pow(2, zoom) * (PI - log(tan((PI / 4.0) + (lat / 2.0))));
}


function ready() {
  mapimg.hide();

  background(0);
  image(mapimg, 0, 0);


  var cx = mercX(x1);
  var cy = mercY(y1);
  var mx = mercX(x2);
  var my = mercY(y2);

  fill(0, 255, 0);
  translate(width / 2, height / 2);
  console.log(mx - cx, my - cy);
  ellipse(mx - cx, my - cy, 16, 16);
}
