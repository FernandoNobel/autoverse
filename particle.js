// A simple Particle class
class Particle {
  constructor ( ps , type , position ) {
    this.ps = ps;
    this.type = type;
    this.c = ps.pt.getColorType(type);

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.position = position.copy();

    this.near = [];

    this.d = 12;
    this.highlight = false;
  }

  run() {
    this.neighbours();
    this.interactions();
  };

  // Method to update position
  update(){
    var dt = 1;

    this.velocity.add(this.acceleration.mult(dt));
    this.position.add(p5.Vector.mult(this.velocity,dt));
    // Reset acceleration to zero for the next loop.
    this.acceleration = createVector(0, 0);
    this.velocity.mult(1-0.2*dt);
  };

  // Method to display
  display() {
    strokeWeight(2);
    if ( !this.highlight) {
      stroke(40, this.lifespan);
      fill(this.c, this.lifespan);
    } else {
      stroke(127,0,0, this.lifespan);
      fill(200,0,0, this.lifespan);
    }
    ellipse(this.position.x, this.position.y, this.d, this.d);
  };

  neighbours() { 
    this.near = [];

    for (var i = this.ps.particles.length-1; i >= 0; i--) {
      var p = this.ps.particles[i];
      if ( p != this) {
          this.near.push(p);
      }
    }

  };

  interactions() {
    var force = createVector(0,0);

    for (var i = this.near.length-1; i >= 0; i--) {
      var p = this.near[i];
      force.add (this.ps.pt.interactionForce (this, p));
    }

    this.acceleration.add(force);
  }

  // Is the particle still useful?
  get isDead() {
    return false;
  };
};
