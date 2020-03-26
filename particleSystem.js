class ParticleSystem  {
  constructor ( ) {
    this.particles = [];
    this.pt = new ParticleTypes();
    this.diameter = height > width ? width : height;
    this.dt = 1;
  }

  addParticle() {
    this.particles.push(new Particle(
      this,
      int(random(this.pt.getNumTypes())),
      createVector(
        random(-this.diameter/3,this.diameter/3),
        random(-this.diameter/3,this.diameter/3)
      )));
  };

  run() {
    // Run particles
    for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();
      if (this.isParticleOut(p)) this.keepInside(p);
      if (p.isDead) {
        this.particles.splice(i, 1);
      }
    }
    // Update phisics
    for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.update();
    }
    // Display all
    this.display();
  };

  display() {
    this.displayBorder();
    this.displayParticles();
  
  };

  displayBorder() {
    stroke(40);
    strokeWeight(5);
    fill(80);
    ellipse(0,0,this.diameter,this.diameter);
  };

  displayParticles() {
    for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.display();
    }
  }

  isParticleOut( p ) {
    if ( p.position.mag() > this.diameter/2 ) return true;
    return false;
  }

  keepInside( p ) {
    var force = p.position.copy();
    force.limit(1);
    force.rotate(PI);
    p.acceleration.add(force);
  }
};
