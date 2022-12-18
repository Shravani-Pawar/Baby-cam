img='';
status="";
objects=[];

function setup()
{
    canvas=createCanvas(300,300);
    canvas.position(540,200);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
   }

function modelLoaded()
{
    console.log("Model loaded!!");
    status=true;
    
    
   }
function preload()
{
    warning= loadSound("warning_audio.mp3");
}

function draw()
{    if (status=true)
    {
    image(video,0,0,380,380);
      r=random(250);
        g=random(250);
        b=random(250);
        
        
        objectDetector.detect(video, gotResult);
        
        for(i=0; i<objects.length; i++)
        {    
            
        
        
               
               fill(r,g,b);
               percent=floor(objects[i].confidence*100);
               text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
               label=objects[i].label;
               noFill();
               stroke(r,g,b);
               rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
        
        
    }}
    if( label = "person")
     { 
        document.getElementById("status").innerHTML="Baby found!";
        warning.stop();
         
     }
    
    if(label="0"||label!="person"){
        warning.play();  
        document.getElementById("status").innerHTML="Baby not found!";
     }
     else
     {
        document.getElementById("status").innerHTML="Baby found!";
        warning.stop();
     }

        


}

function gotResult(error,results)
{
if(error)
{
console.log(error);
}
console.log(results);
objects=results;
}
