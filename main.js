//Made by Vinayak
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width=1024
canvas.height=522
c.fillRect(0,0,canvas.width,canvas.height)
const gravity=0.7



//Player
const player = new Fighter({
   position:{ 
    x:10,
    y:303},
    velocity:{
    x:0,
    y:0},
    imgSrc:"./assets/Old_Monk/Idle.png",
    frameMax:8,
    scale:2.5,
    offset:{
        x:210,
        y:150
        // 150
    },
    sprites:{
        idle:{
            imgSrc:"./assets/Old_Monk/Idle.png",
            frameMax:8
        },
        idle_rev:{
            imgSrc:"./assets/Old_Monk/Idle_rev.png",
            frameMax:8
        },
        run:{
            imgSrc:"./assets/Old_Monk/Run.png",
            frameMax:8
        },
        run_rev:{
            imgSrc:"./assets/Old_Monk/Run_rev.png",
            frameMax:8
        },
        jump:{
            imgSrc:"./assets/Old_Monk/Jump.png",
            frameMax:2
        },
        jump_rev:{
            imgSrc:"./assets/Old_Monk/Jump_rev.png",
            frameMax:2
        },
        fall:{
            imgSrc:"./assets/Old_Monk/Fall.png",
            frameMax:2
        },
        fall_rev:{
            imgSrc:"./assets/Old_Monk/Fall_rev.png",
            frameMax:2
        },
        attack1:{
            imgSrc:"./assets/Old_Monk/Attack1.png",
            frameMax:6
        },
        attack1_rev:{
            imgSrc:"./assets/Old_Monk/Attack1_rev.png",
            frameMax:6
        },
        attack2:{
            imgSrc:"./assets/Old_Monk/Attack2.png",
            frameMax:6
        },
        attack2_rev:{
            imgSrc:"./assets/Old_Monk/Attack2_rev.png",
            frameMax:6
        },
        hit:{
            imgSrc:"./assets/Old_Monk/Take Hit - white silhouette.png",
            frameMax:4
        },
        hit_rev:{
            imgSrc:"./assets/Old_Monk/Take Hit - white silhouette_rev.png",
            frameMax:4
        },
        dead:{
            imgSrc:"./assets/Old_Monk/Death.png",
            frameMax:6
        },
        dead_rev:{
            imgSrc:"./assets/Old_Monk/Death_rev.png",
            frameMax:6
        }

    },
    attackBox:{
        offset:{
            x:100,
            y:50
        },
        width:150,
        height:40
    }
    

})


//Enemy
const Enemy = new Fighter({
    position:{ 
     x:900,
     y:303},
     velocity:{
     x:0,
     y:0},
     color:"blue",
     offset:{
        x:0,
        y:0
     },
    imgSrc:"./assets/Enemy/Idle.png",
    frameMax:8,
    scale:2.5,
    offset:{
        x:300,
        y:262
    },
    sprites:{
        idle:{
            imgSrc:"./assets/Enemy/Idle.png",
            frameMax:8
        },
        idle_rev:{
            imgSrc:"./assets/Enemy/Idle_rev.png",
            frameMax:8
        },
        hit:{
            imgSrc:"./assets/Enemy/Take hit.png",
            frameMax:3
        },
        hit_rev:{
            imgSrc:"./assets/Enemy/Take hit_rev.png",
            frameMax:3
        },
        dead:{
            imgSrc:"./assets/Enemy/Death.png",
            frameMax:7
        },
        dead_rev:{
            imgSrc:"./assets/Enemy/Death_rev.png",
            frameMax:7
        },
        run:{
            imgSrc:"./assets/Enemy/Run.png",
            frameMax:8
        },
        run_rev:{
            imgSrc:"./assets/Enemy/Run_rev.png",
            frameMax:8
        },
        attack1:{
            imgSrc:"./assets/Enemy/Attack1.png",
            frameMax:8
        },
        attack1_rev:{
            imgSrc:"./assets/Enemy/Attack1_rev.png",
            frameMax:8
        },
        attack2:{
            imgSrc:"./assets/Enemy/Attack2.png",
            frameMax:8
        },
        attack2_rev:{
            imgSrc:"./assets/Enemy/Attack2_rev.png",
            frameMax:8
        }

    },
    attackBox:{
        offset:{
            x:170,
            y:50
        },
        width:130,
        height:40
        
    }
})
Enemy.lastAttackTime = 0; 

//Background
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc:"./assets/Mount_Fiji (n).jpg"
})


//Movement

const keys ={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    }
}
let lastkey

window.addEventListener("keydown",(event)=>{
    if(!player.dead){switch(event.key){
        case "d":
            keys.d.pressed=true
            player.lastkey="d"
            break
        case "a":
            keys.a.pressed=true
            player.lastkey="a"
            break
        case "w":
            if(player.position.y>=303){
            player.velocity.y=-20}
            break
        case " ":
            player.attack()
            break
        case "ArrowDown":
            Enemy.attack()
            break
    }}
})
window.addEventListener("keyup",(event)=>{
    if(!player.dead){switch(event.key){
        case "d":
            keys.d.pressed=false
            break
        case "a":
            keys.a.pressed=false
            break
    }}
})


decreaseTimer()

//Animate
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle="black"
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    player.update()
    updateEnemy()

    //speed of player
    if (keys.a.pressed && player.lastkey==="a"){
        player.velocity.x=-5
        player.direction=-1
        player.switchSprite('run_rev')
    }else if(keys.d.pressed && player.lastkey==="d"){
        player.velocity.x=5
        player.direction=1
        player.switchSprite('run')
    }else {
        player.velocity.x=0
        if(player.direction==1){
        player.switchSprite("idle")}
        else if(player.direction==-1){
            player.switchSprite("idle_rev")
        }
    }

    if(player.velocity.y<0){
        if(player.direction==1){
            player.switchSprite("jump")}
        else if(player.direction==-1){
                player.switchSprite("jump_rev")
            }
    }
    else if(player.velocity.y>0){
        if(player.direction==1){
            player.switchSprite("fall")}
        else if(player.direction==-1){
                player.switchSprite("fall_rev")}
    }

    //collision
    if (rectangularCollision({
        rectangle1:player,
        rectangle2:Enemy
    })&&
    player.isAttacking && player.frameCurrent===4){
        player.isAttacking=false
        Enemy.takeHit()
        document.querySelector('#enemyhealth').style.width=`${Enemy.health}%`
    }

    if (rectangularCollision({
        rectangle1:Enemy,
        rectangle2:player
    })&&
    Enemy.isAttacking&&Enemy.frameCurrent===4){
        Enemy.isAttacking=false
        player.takeHit()
        document.querySelector('#playerhealth').style.width=`${player.health}%`
        
    }

    if(player.isAttacking && player.frameCurrent===4){
        player.isAttacking=false
    }
    if(Enemy.isAttacking && Enemy.frameCurrent===4){
        Enemy.isAttacking=false
    }
    //end game based on health
    if (Enemy.health<=0 || player.health<=0){
        clearTimeout(timerId)
        decreaseTimer(player,Enemy)
    }

    // direction
    if(!Enemy.dead){if (player.position.x+player.width<Enemy.position.x){
        Enemy.direction=-1
    }else if(player.position.x>Enemy.position.x+Enemy.width){
        Enemy.direction=1
    }}
}
if (Enemy.health>0 || player.health>0 || timer!=0){
    animate()
}
