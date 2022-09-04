



function setup() {
 choices = [1,2,3,4];
movement = [];
 enemyList = [];
  avoidx= 300;
  avoidy= 100;
  avoidsize= 50;
  
  
  
fittestMovement =0;
for (i=0; i<25; i++){
    enemyList.push(new Enemy(200,200,choices, movement));
  }

  createCanvas(400, 400);
  bestfit = 99999;
  goalx =400;
  goaly =400;
  fitnessList = [];
  fittestMovement = [];
  Move(enemyList);
  movechoice = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  fittestfit =0;
}


//-------------//
//-MAKE-BUTTON-//
//-------------//
const button = document.createElement('button')
      
      button.innerText = 'New Generation'
      button.id = 'mainButton'
      
      button.addEventListener('click', () => {
        // When there is a "click"
        
        FitnessCheck();
        Mutate();
        NewRun();
        Move(enemyList);
      })
      document.body.appendChild(button)


//-------------//
//----ENEMY----//
//-------------//
class Enemy {
  constructor(x,y,choice, movement,fitness){
    this.x = x;
    this.y = y;
    this.fitness = 0;
    this.movement = [];
    this.finesse = false;
   for (this.i=0; this.i<100; this.i++){
    this.movement.push(random(choices));
  } 
  } 
  draw(){
    circle(this.x,this.y, 15);
  }
}





//-------------//
//-RESET-ENEMY-//
//-------------//
function NewRun(){
  for (i=0; i<enemyList.length; i++){
   enemyList[i].x=200;
   enemyList[i].y=200;        
  enemyList[i].fitness =0;
    enemyList[i].finesse = false;
    
    
    
  }
}

//-------------//
//---MUTATION--//
//-------------//

function Mutate(){
  for (i=0; i<enemyList.length; i++){
    for(w=0;w<enemyList[i].movement.length;w++){
      if (Math.floor(Math.random()*21)==0){

        enemyList[i].movement[w] = random(choices);
      }
      
      
    }
    //console.log(enemyList[i].movement);
  }
}

//-------------//
//FITNESS-CHECK//
//-------------//

function FitnessCheck(){
  for (w=0; w<enemyList.length; w++){
    
    if (enemyList[w].finesse == false){
      //console.log("aa")
    enemyList[w].fitness =  dist(enemyList[w].x, enemyList[w].y, goalx, goaly);
    }
    
    
    //console.log(enemyList[w].finesse);
    //console.log(w);
    fitnessList.push(enemyList[w].fitness);
  }
  //console.log(fitnessList);
  
  for (i=0; i<enemyList.length; i++){
    if (enemyList[i].fitness == min(fitnessList) && enemyList[i].movement.length > 0){
      fittestMovement = enemyList[i].movement;
      bestfit = enemyList[i].fitness;
      //console.log("yaaaaa");      
      
    }
  
  }
  
  for (i=0; i<enemyList.length; i++){
    enemyList[i].movement=fittestMovement.slice();
    
    //console.log(fittestMovement);
    //console.log("--------")
    //console.log(enemyList[i].movement);
    
  }
  //console.log(enemyList);
  //console.log("--------");
  //console.log(fittestMovement);
  
  
  
}

//-------------//
//-ENEMY--MOVE-//
//-------------//

function Move(enemyList){
    for (i=0; i<enemyList.length; i++){
      
  for (j=0; j<enemyList[i].movement.length; j++){

    if (enemyList[i].movement[j] == 1){
      enemyList[i].x += 5;
    }
     if (enemyList[i].movement[j] == 2){
      enemyList[i].x -= 5;
    }
     if (enemyList[i].movement[j] == 3){
      enemyList[i].y += 5;
    }
     if (enemyList[i].movement[j] == 4){
      enemyList[i].y -= 5;
    }
    
    enemyList[i].draw()
    if (dist(enemyList[i].x,enemyList[i].y,avoidx,avoidy)< (15+50)/2){
    enemyList[i].fitness = 9999;
      enemyList[i].movement.length = 0;
      //print("aaa")
      enemyList.finesse = true;
  }
      
  }
    }
  //background(220)
  for (i=0; i<enemyList.length; i++){
    enemyList[i].draw()
    //console.log(enemyList[i].movement)
  }

}

//-------------//
//-PLAYER-MOVE-//
//-------------//
function playerMove() {

  
  //WASD Movement
  if (keyIsDown(65) && goalx > 0) {
    goalx -= 10; //Left
  }
  if (keyIsDown(68) && goalx < width) {
    goalx += 10; // Right
  }
  if (keyIsDown(87) && goaly > 0 ) {
    goaly -= 10; //Up
  }
  if (keyIsDown(83) && goaly < height) {
    goaly += 10; //Down
  }
  
}


//-------------//
//-----DRAW----//
//-------------//
function draw() {
  background(220);
  FitnessCheck();
  //console.log(fitnessList)
        Mutate();
  
        NewRun();
  
        Move(enemyList);
  playerMove()
  
  fill("red");
  circle(goalx,goaly,15);
  fill("orange");
  circle(avoidx,avoidy,avoidsize);
  fill("white");
  fitnessList.length = 0;
  }
