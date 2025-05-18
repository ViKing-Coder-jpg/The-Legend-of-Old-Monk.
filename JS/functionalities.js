function rectangularCollision({rectangle1,rectangle2}){
    return ((rectangle1.attackBox.position.x+rectangle1.attackBox.width>=rectangle2.position.x)&&
    (rectangle1.attackBox.position.x<=rectangle2.position.x+rectangle2.width)&&
    (rectangle1.attackBox.position.y<=rectangle2.position.y+rectangle2.height)&&
    (rectangle1.attackBox.position.y+rectangle1.attackBox.height>=rectangle2.position.y))
}


//DetermineWinner
function determineWinner(player,enemy){
    clearTimeout(timerId)
    if(player.health==enemy.health){
        document.querySelector("#display").innerHTML="Tie"
    }else if (player.health>enemy.health){
        document.querySelector("#display").innerHTML="Player Wins"
       
    }else{
        document.querySelector("#display").innerHTML="Game Over"
        
    }

}

// Enemy AI parameters
const enemyAttackDistance = 50;
const enemyMovementSpeed = 3; 

function updateEnemy() {
    Enemy.update()
    const distance = player.position.x - Enemy.position.x;
    let attackRangeMin
    if (Enemy.direction === 1) {
        attackRangeMin=Enemy.attackBox.offset.x-Enemy.width
    } else if (Enemy.direction === -1) {
        attackRangeMin=-Enemy.attackBox.offset.x-Enemy.attackBox.width
    }
    let attackRange;
    if (Enemy.direction === 1) {
        attackRange = Enemy.attackBox.width + Enemy.attackBox.offset.x;
    } else if (Enemy.direction === -1) {
        attackRange = -Enemy.attackBox.offset.x; 
    }
    

    
    // Enemy Movement
    if (Math.abs(distance) > attackRange &&(!player.dead)&&(!Enemy.dead)) {
        Enemy.velocity.x = distance > 0 ? enemyMovementSpeed : -enemyMovementSpeed;
        if(Enemy.direction==1){
            Enemy.switchSprite("run")
        }else if(Enemy.direction==-1){
            Enemy.switchSprite("run_rev")
        }
    } else {
        Enemy.velocity.x = 0
        if(Enemy.direction==1){
            Enemy.switchSprite("idle")
        }else{
            Enemy.switchSprite("idle_rev")
        }

        // Enemy attack 
        if (Math.abs(distance) < attackRange && attackRangeMin<Math.abs(distance)&& (Date.now() - Enemy.lastAttackTime > 1000)&&(!player.dead)) {
            Enemy.attack(); 
            Enemy.lastAttackTime = Date.now(); 
        }
    }
}


//Timer
let timer=120
let timerId
function decreaseTimer(){
    if(timer>0){
        timerId=setTimeout(decreaseTimer,1000)
        timer--
        document.querySelector("#timer").innerHTML=timer
    }
    if(timer==0){
        determineWinner(player,Enemy)
    }


}
