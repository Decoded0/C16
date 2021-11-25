var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds;
var cloudsimg;
var gameover;
var restart;
var gameoverimg;
var restartimg;
var soundcheckpoint;
var soundjump;
var soundDie;

var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleGroup;

var obstacleGroup, cloudsGroup;
var PLAY =1;
var END = 0;
var gameState = PLAY; 
var score =0; 
 
function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudsimg = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    gameoverimg = loadImage("gameover.png");
    restartimg = loadImage("retry.png");
    soundcheckpoint = loadSound("checkpoint.mp3");
    soundjump = loadSound("jump.mp3");
    soundDie = loadSound("die.mp3");
}

function setup() {
    createCanvas(600, 200);
    //create a trex sprite
    trex = createSprite(50, 160, 20, 50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;
    //create a ground sprite
    ground = createSprite(200, 180, 400, 20);
    ground.addImage("ground", groundImage);
    ground.x = ground.width / 2;
    

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    var ran = Math.round(random(10, 60));

    obstacleGroup = new Group();
    cloudsGroup = new Group();

    trex.setCollider("rectangle",0,0,80,50);
    trex.debug= true;

    gameover = createSprite(300, 100);
    gameover.addImage(gameoverimg);
    gameover.scale = 0.5;

    restart = createSprite(300, 140);
    restart.addImage(restartimg);
    restart.scale = 0.5;

}

function draw() {
    background(255);

    text("Score: "+ score, 500,50);
    

    if(gameState === PLAY){
    if (keyDown("space")&&trex.y >= 161 ) {
        trex.velocityY = -10;
        soundjump.play();
    }

    spawnClouds();

    spawnObstacles();


    ground.velocityX = -(4 + 3*score/100);
    trex.velocityY = trex.velocityY + 0.8;
    score = score + Math.round(frameCount/60);
    if(score > 0 && score%100 === 0){
        soundcheckpoint.play();
    }

    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }
    gameover.visible = false;
    restart.visible = false;

    if(obstacleGroup.isTouching(trex)){
        //gameState = END;
        //soundDie.play();
        trex.velocityY = -10;
        soundjump.play();
    }

    }else if (gameState === END){
        ground.velocityX = 0;
        obstacleGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        
        trex.changeAnimation("collided", trex_collided);
        obstacleGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        trex.velocityY=0;

        gameover.visible = true;
        restart.visible = true;

    }
   
   
    trex.collide(invisibleGround);

    

    drawSprites();
    
}
function spawnClouds(){
    
    if(frameCount %90 === 0){
    clouds = createSprite(600,100,40,10);
    clouds.addImage(cloudsimg);
    clouds.y = Math.round(random(10,60));
    clouds.scale = 0.8;
    clouds.velocityX = -3;

    clouds.lifetime = 210;

    clouds.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloudsGroup.add(clouds);
    }

    
}

function spawnObstacles(){
    if(frameCount %90 === 0){
        obstacle = createSprite(600,165,10,40);
        obstacle.velocityX = -(3 + score/100);
        var rand = Math.round(random(1,6));
        switch(rand){
            case 1:obstacle.addImage(obstacle1);
            break;

            case 2:obstacle.addImage(obstacle2);
            break;

            case 3:obstacle.addImage(obstacle3);
            break;

            case 4:obstacle.addImage(obstacle4);
            obstacle.scale = 0.05;
            break;

            case 5:obstacle.addImage(obstacle5);
            break;

            case 6:obstacle.addImage(obstacle6);
            break;


            default:break;
        }
        obstacle.scale = 0.1;
        obstacle.lifetime = 210;
        obstacleGroup.add(obstacle);
        }
}