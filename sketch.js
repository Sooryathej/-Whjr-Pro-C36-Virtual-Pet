var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feedtDog;
var foodObj;
var fedTime;

//create feed and lastFed variable here
var fed
var lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedtDog=createButton("Feed the dog");
  feedtDog.position(700,95);
  feedtDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the d;atabase 
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
 
  //write code to display text lastFed time here
  fill("255,255,255");
  textSize(13);
  if(lastFed>=12){
    text("Last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }
  else{
    
    text("Last Feed: " + lastFed + "AM", 350, 30);
  }

 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
    })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}