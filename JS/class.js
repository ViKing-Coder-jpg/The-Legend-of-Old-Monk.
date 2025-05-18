class Sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    frameMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.frameCurrent = 0;
    this.frameElapsed = 0;
    this.frameHold = 5;
    this.offset = offset;
  }
  
  draw() {
    c.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    );
    
  }

  animateFrame() {
    this.frameElapsed++;
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    this.animateFrame();
  }
}

// character making
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imgSrc,
    scale = 1,
    frameMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined }
  }) {
    super({
      position,
      imgSrc,
      scale,
      frameMax,
      offset,
    });
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastkey;
    this.color = color;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
      initialOffsetX: attackBox.offset.x,
    };
    this.isAttacking;
    this.direction = 1;
    this.health = 100;
    this.attackCooldown = 1000;
    this.lastAttackTime = 0;
    this.attackConnected = false;
    this.frameCurrent = 0;
    this.frameElapsed = 0;
    this.frameHold = 5;
    this.sprites = sprites;
    this.isHit = false;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }

  update() {
    this.draw();
    if(!this.dead){ this.animateFrame()} ;
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 69) {
      this.velocity.y = 0;
      this.position.y = 303;
    } else this.velocity.y += gravity;

    if (this.direction == -1) {
      this.attackBox.offset.x =
        -1 *
        (this.attackBox.width + (this.attackBox.initialOffsetX - this.width));
    } else {
      this.attackBox.offset.x = this.attackBox.initialOffsetX;
    }
  }

  attack() {
    if (this.direction == 1) {
      this.switchSprite(["attack1", "attack2"][Math.floor(Math.random() * 2)]);
    } else {
      this.switchSprite(
        ["attack1_rev", "attack2_rev"][Math.floor(Math.random() * 2)]
      );
    }
    this.isAttacking = true;
  }

  takeHit(){
    if(this.health>0){this.health-=2
    if(this.direction==1){
    this.switchSprite("hit")}
    else if(this.direction==-1){
    this.switchSprite("hit_rev")}}else{
      if(this.direction==1){
        this.switchSprite("dead")}
      else if(this.direction==-1){
        this.switchSprite("dead_rev")}
      
    }
  }

  

  switchSprite(sprite) {
    if (this.direction == 1) {
      if (this.image === this.sprites.dead.image)
        {if(this.frameCurrent === this.sprites.dead.frameMax - 1)
          {this.dead=true}
          return};
    } else if (this.direction == -1) {
      if (this.image === this.sprites.dead_rev.image)
        {if(this.frameCurrent === this.sprites.dead_rev.frameMax - 1)
          {this.dead=true}
          return}
    }
    if (this.direction == 1) {
      if (
        (this.image === this.sprites.hit.image &&
          this.frameCurrent < this.sprites.hit.frameMax - 1)
      )
        return;
    } else if (this.direction == -1) {
      if (
        (this.image === this.sprites.hit_rev.image &&
          this.frameCurrent < this.sprites.hit_rev.frameMax - 1)
      )
        return;
    }
    if (this.direction == 1) {
      if (
        (this.image === this.sprites.attack1.image &&
          this.frameCurrent < this.sprites.attack1.frameMax - 1) ||
        (this.image === this.sprites.attack2.image &&
          this.frameCurrent < this.sprites.attack2.frameMax - 1)
      )
        return;
    } else if (this.direction == -1) {
      if (
        (this.image === this.sprites.attack1_rev.image &&
          this.frameCurrent < this.sprites.attack1_rev.frameMax - 1) ||
        (this.image === this.sprites.attack2_rev.image &&
          this.frameCurrent < this.sprites.attack2_rev.frameMax - 1)
      )
        return;
    }

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frameMax = this.sprites.idle.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "dead_rev":
        if (this.image !== this.sprites.dead_rev.image) {
          this.image = this.sprites.dead_rev.image;
          this.frameMax = this.sprites.dead_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "dead":
        if (this.image !== this.sprites.dead.image) {
          this.image = this.sprites.dead.image;
          this.frameMax = this.sprites.dead.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "idle_rev":
        if (this.image !== this.sprites.idle_rev.image) {
          this.image = this.sprites.idle_rev.image;
          this.frameMax = this.sprites.idle_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "hit":
        if (this.image !== this.sprites.hit.image) {
          this.image = this.sprites.hit.image;
          this.frameMax = this.sprites.hit.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "hit_rev":
        if (this.image !== this.sprites.hit_rev.image) {
          this.image = this.sprites.hit_rev.image;
          this.frameMax = this.sprites.hit_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frameMax = this.sprites.run.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "run_rev":
        if (this.image !== this.sprites.run_rev.image) {
          this.image = this.sprites.run_rev.image;
          this.frameMax = this.sprites.run_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.frameMax = this.sprites.jump.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "jump_rev":
        if (this.image !== this.sprites.jump_rev.image) {
          this.image = this.sprites.jump_rev.image;
          this.frameMax = this.sprites.jump_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.frameMax = this.sprites.fall.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "fall_rev":
        if (this.image !== this.sprites.fall_rev.image) {
          this.image = this.sprites.fall_rev.image;
          this.frameMax = this.sprites.fall_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.frameMax = this.sprites.attack1.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "attack1_rev":
        if (this.image !== this.sprites.attack1_rev.image) {
          this.image = this.sprites.attack1_rev.image;
          this.frameMax = this.sprites.attack1_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.frameMax = this.sprites.attack2.frameMax;
          this.frameCurrent = 0;
        }
        break;
      case "attack2_rev":
        if (this.image !== this.sprites.attack2_rev.image) {
          this.image = this.sprites.attack2_rev.image;
          this.frameMax = this.sprites.attack2_rev.frameMax;
          this.frameCurrent = 0;
        }
        break;
    }
  }
}
