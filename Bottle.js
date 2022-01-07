img="";
status_="";
object1="";
object=[];

function setup()
{
    canvas = createCanvas(580,500);
    canvas.center();

    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("model loaded");
    status_=true;
}

function gotresult(error,result)
{
  if(error)
  {
      console.log(error);
  }
    console.log(result);
    object= result;
}

function preload()
{
    img = loadImage("BOTTLEIMAGE.jpg");
    object1 = ml5.objectDetector('cocossd', modelLoaded);
}

function draw()
{
    image(img,0,0,580,500);
    object1.detect(img,gotresult);
    if(status_ != "")
    {
      for(i= 0; i < object.length; i++)
      {
          r = random(255);
          g = random(255);
          b = random(255);

          document.getElementById("status").innerHTML = "Status: Detecting Objects";
          document.getElementById("Number_of_Objects").innerHTML = "Number of Objects:" + object.length;

          fill(r,g,b);
          percent = floor(object[i].confidence*100);
          text(object[i].label, object[i].x +15,object[i].y +15);
          noFill();
          stroke(r,g,b);
          rect(object[i].x , object[i].y , object[i].width , object[i].height);
      }
    }
}

