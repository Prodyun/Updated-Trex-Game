var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var trex, trex_running, edges;
var ground;
var groundImage;
var cloud;
var cacti;
var cacti2;
var cacti3;
var cacti4;
var cacti5;
var cacti6;

var score;

var obstacle_group, cloud_group;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  
  cacti1 = loadImage("obstacle1.png");
  cacti2 = loadImage("obstacle2.png");
  cacti3 = loadImage("obstacle3.png");
  cacti4 = loadImage("obstacle4.png");
  cacti5 = loadImage("obstacle5.png");
  cacti6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");

 
  
}

function setup(){
  createCanvas(600,200);
   
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided);
  edges = createEdgeSprites();
 
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true;
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  
  ground = createSprite(300,186);
  ground.addImage(groundImage);
  ground.velocityX = -10;
  
  cloud = createSprite(200,70);
  cloud.addImage(cloudImage);
  cloud.velocityX = -6;
cloud.y = Math.round(random(70,100));   
  
 score = 0;
  
gameOver = createSprite(300,80);
gameOver.addImage(gameOverImg)
  
restart = createSprite(300,140);
restart.addImage(restartImg);
  
gameOver.scale = 0.5;
restart.scale = 0.5;
  
gameOver.visible = false;
restart.visible = false;
 
// Creating Obstacles and Cloud Groups Here : 
  obstacle_group = new Group();
  cloud_group = new Group();
  

  
}


function draw(){
  //set background color 
  background("white");
  
  text("Score: "+ score, 500,50);
   console.log(gameState); 

  drawSprites();
  
  if(gameState === PLAY){
    ground.velocityX = -(4+3*score/100);
      score = score + Math.round(frameCount/120);

    if (obstacle_group.isTouching(trex)){
    gameState = END;
    dieSound.play();
  }  
    
  if (score>0 && score%2500 ===0){
    checkPointSound.play();
  }
  
  spawn_sprites()
  
  //jump when space key is pressed
  if(keyDown("space")){
    trex.velocityY = -10;
    jumpSound.play();
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

 
  trex.velocityY = trex.velocityY + 0.5;
  
  //stop trex from falling down
  trex.collide(edges[3])

  

  }  
    else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided" , trex_collided);
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
      
  }
  
  if (mousePressedOver(restart)){
    reset();
  }
  
  spawnObstacles();
  
  
  
}

function spawn_sprites(){
  if(frameCount % 60 == 0){
    
  cloud = createSprite(200,70);
  cloud.addImage(cloudImage);
  cloud.velocityX = -6;  
    // Adding Life to Clouds 
  cloud.lifeTime = 200;
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
    
  cloud_group.add(cloud);
  } 
}

function spawnObstacles(){
  if (frameCount % 60 == 0){
    var cacti=createSprite(800,165);
      cacti.velocityX = -(6+ score/100);
      var r = Math.round(random(1,6));
    
    switch(r){
      case 1: cacti.addImage(cacti1);
        break;
      case 2: cacti.addImage(cacti2);
        break;
      case 3: cacti.addImage(cacti3);
         break;
      case 4: cacti.addImage(cacti4);
         break;
      case 5: cacti.addImage(cacti5);
         break;
      case 6: cacti.addImage(cacti6);
         break;      
    }
      obstacle_group.add(cacti);
  }
    
}

function reset(){
  gameOver.visible = false;
  restart.visible = false;
  gameState = PLAY
  obstaclesGroup.destroyEach();
  score = 0;
  trex.changeAnimation("running", trex_running);
}

