let MouseScrollPos = 25;
let Ball;
let SpaceMan;

let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let h = 20;

//Stars
const starColorsHsb = [
  [226,  72, 86],
  [ 61, 100, 94],
  [267,  71, 75],
  [309,  60, 93],
  [  3,  81, 82]
];
let stars;

function preload() {
  Ball = loadModel('models/PrismBall.obj');
  SpaceMan = loadModel('models/SpaceMan.obj');
}

function setup () {
  createCanvas(windowWidth, windowHeight, WEBGL);
  c1 = color(100, 0, 125);
  c2 = color(0, 125, 255);
  pg = createGraphics(256,256);
  //create sliders
  for (var i = 0; i < 6; i++) {
    if (i === 2) {
      sliderGroup[i] = createSlider(10, 400, 200);
    } else {
      sliderGroup[i] = createSlider(-400, 400, 0);
    }
    h = map(i, 0, 6, 5, 85);
    sliderGroup[i].position(10, height + h);
    sliderGroup[i].style('width', '80px');
  }
  function r() {
  	return random(-700, 700);
	}

  stars = Array.apply(null, Array(1000)).map(() => [
  	createVector(r(), r(), r()),
  	int(random(starColorsHsb.length))
  ]);
}


function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  MouseScrollPos += event.delta;
  //uncomment to block page scrolling
  //return false;
}


function draw () {
   //-----------------------scene setup-----------------------//
  background(0);

  //camera(xAxisCamera-1000, yAxisCamera, zAxisCamera, xAxisCamera, yAxisCamera, 0, 0.0, 1.0, 0.0);
  //translate(0, 0, 600);
  X = sliderGroup[0].value();
  Y = sliderGroup[1].value();
  Z = sliderGroup[2].value();
  centerX = sliderGroup[3].value();
  centerY = sliderGroup[4].value();
  centerZ = sliderGroup[5].value();
  camera(MouseScrollPos + X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
  
  //-----------------------Scene Lighting-----------------------//
  var locX = height / 2;
  var locY = width;
  //ambientMaterial(250);
  directionalLight(255, 0, 255, 0.25, 0.25, 0);
  directionalLight(0, 150, 250, 0, 0, -10);
  pointLight(0, 0, 255, locX, locY, 250);
  //specularMaterial(50, 900, 100);
  //-----------------------Scene Objects-------------------------//
  strokeWeight(0.1)
  stroke(96,72,167);
  rotate(120);
  rotateX(frameCount * 0.003);
  //rotateY(frameCount * 0.002);
  rotateZ(frameCount * 0.002);
  scale(2);
  model(SpaceMan);

  //Stars
  rotateZ(frameCount / 100);
  for (const star of stars) {
    push();
    const pos = star[0];
    const z = cos(frameCount / 150) * 500;
    translate(pos.x, pos.y, z + pos.z);
    stroke(...starColorsHsb[star[1]]);
    sphere(1);
    pop();
  }
}