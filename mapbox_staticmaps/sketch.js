var mapimg;
var bounds;
var rbounds;

var parisx = 2.3522;
var parisy = 48.8566;

var lbgx = 8.6821;
var lbgy = 50.1109;

function setup() {
  angleMode(RADIANS);
  var size = [800, 600];
  createCanvas(size[0], size[1]);
  //var center = [2.3522, 48.8566];
  var center = [parisx, parisy];
  var zoom = 5;
  bounds = geoViewport.bounds(center, zoom, size);
  // -west, -south, +east, +north order.
  console.log((bounds[1] + bounds[3])/2);

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

function mercatorY(lat) {
  lat = radians(lat);
  return log(tan((PI / 4.0) + (lat / 2.0)));
}


function ready() {
  mapimg.hide();

  background(0);
  image(mapimg, 0, 0);

  var mx = radians(lbgx);
  var my = radians(lbgy);

  console.log(bounds);
  console.log(mx, my);
  var x = map(mx, rbounds[0], rbounds[2], 0, width);
  var y = map(my, rbounds[3], rbounds[1], 0, height);
  console.log(x, y);

  fill(0, 255, 255);
  ellipse(x, y, 16, 16);

  var mx = radians(parisx);
  var my = radians(parisy);

  console.log(mx, my);
  var x = map(mx, rbounds[0], rbounds[2], 0, width);
  var y = map(my, rbounds[3], rbounds[1], 0, height);
  console.log(x, y);

  fill(0, 255, 0);
  ellipse(x, y, 16, 16);


  fill(255, 0, 0);
  //ellipse(width / 2, height / 2, 16, 16);
}
