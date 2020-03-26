var system;
var fr = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  system = new ParticleSystem();
  
  for ( var i = 0; i < 100; i++ ) {
    system.addParticle();
  }

  frameRate(60);
}

function draw() {
  background(51);
  push();
  translate(width/2,height/2);
  system.run();
  pop();

  textSize(32);
  fr = 0.9*fr + 0.1*frameRate();
  text(round(fr),0,height);
}

function mousePressed() {
  system.addParticle();
}
