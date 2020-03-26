class Interaction {
  constructor (d1, f1, d2) {
    this.d1 = d1;
    this.f1 = f1;
    this.d2 = d2
  }

  static Null() {
    return new Interaction(0,0,0);
  };

  static Rand() {
    return new Interaction(
      random(30)+10,
      random(-0.5,0.5),
      random(200)
    );
  };
}

class ParticleTypes {

  constructor () {
    this.numTypes = 6;

    this.colorType = [];
    this.colorType.push(color(200,50,50));
    this.colorType.push(color(50,200,50));
    this.colorType.push(color(50,50,200));

    this.colorType.push(color(200,200,50));
    this.colorType.push(color(50,200,200));
    this.colorType.push(color(200,50,200));

    this.I = [];
    this.resetInteraction();
    //this.I[0][0].d1 = 20;
    //this.I[0][0].f1 = 0.1;
    //this.I[0][0].d2 = 100;

    //this.I[1][1].d1 = 20;
    //this.I[1][1].f1 = 0.1;
    //this.I[1][1].d2 = 20;

    //this.I[2][2].d1 = 20;
    //this.I[2][2].f1 = 0.1;
    //this.I[2][2].d2 = 20;
  };

  resetInteraction() {
    for ( var i = 0; i < this.numTypes; i++) {
      this.I[i] = [];
      for ( var j = 0; j < this.numTypes; j++) {
        //this.I[i][j] = Interaction.Null(); 
        this.I[i][j] = Interaction.Rand(); 
      }
    }
    console.log(this.I);
  };

  getColorType( num ) {
    return this.colorType[num];
  };
  
  getNumTypes() {
    return this.numTypes;
  }

  interactionForce( p1, p2 ) {
    var aux;
    var i = this.I[p1.type][p2.type];
    var d = p5.Vector.dist(p2.position,p1.position);
    var d0 = p2.d/2 + p1.d/2;

    aux = p5.Vector.sub(p2.position,p1.position);

    if ( d < d0 ) {
      aux.limit(1 - d / (p2.d/2 + p1.d/2) );
      aux.mult(-1);

      return aux;
    } 

    if ( d < i.d1 ) {
      aux.limit((d - d0)/(i.d1 - d0) );
      aux.mult(i.f1);

      return aux;
    }

    if ( d < i.d2 ) {
      aux.limit(1-(d - i.d1)/(i.d2 - i.d1) );
      aux.mult(i.f1);

      return aux;
    }
  };
}
