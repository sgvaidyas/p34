//Create variables here
var  dog,dogImg, happyDog, database, foodS, foodStock,database;

function preload()
{
  //load images here
  
  dogImg = loadImage("images/dogImg1.png");
  happyDog= loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  

  database = firebase.database();


  dog = createSprite(250,100);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError);
  textSize(20);

}


function draw() {  
  background(0);

  if(keyWentDown(UP_ARROW)){
    writeStocks(foodS);
    dog.addImage(happyDog);
  }


  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,400);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",150,490,400,20);

}

function writeStocks(x)
{
  if(x<=0)
    x=0;
  else
    x=x-1;

  database.ref('/').update({
    Food :x
  })
}
function readStock(data)
{
  foodS = data.val();
}
function showError()
{
  console.log("Something is wrong ");
}
