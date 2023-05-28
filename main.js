kiran =["music1.mp3" , "music2.mp3" , "music3.mp3" , "music4.mp3" , "music5.mp3"]
song="";
leftwristX=0;
rightwristX=0;
rightwristY=0;
leftwristY=0;
scoreleftwrist=0;
scorerightwrist=0;

var i= 0;
function preload() {
    song = loadSound(kiran[i]);

}
function next() {
  

   
   if(i== 4)
     {
       i=0;
     }
     song,play()
  i++;
 }

 
 

function setup() {
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video , modelLoaded)
    poseNet.on('pose' , gotPoses)

}

function modelLoaded() {
    console.log("posenet is intialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;

        console.log("leftwristx= " + leftwristX + ", leftwristy= " + leftwristY)
        console.log("rightwristx= " + rightwristX + ", rightwristy= " + rightwristY)
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist= " + scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist= " + scorerightwrist);

    }

}

function draw() {
    image( video , 0 , 0 , 600 , 500);
    fill("red");
    stroke("red");
    if(scorerightwrist>0.2){
    circle(rightwristX , rightwristY , 20);
    if(rightwristY>0 && rightwristY<=100){
        document.getElementById("speed").innerHTML= "speed= 0.5x" ;
        song.rate(0.5);
    }
    else if(rightwristY > 100 && rightwristY<=200) {
        document.getElementById("speed").innerHTML= "speed= 1x";
        song.rate(1)
    }
    else if(rightwristY > 200 && rightwristY<=300) {
        document.getElementById("speed").innerHTML= "speed= 1.5x";
        song.rate(1.5)
    }

    else if(rightwristY > 300 && rightwristY<=400) {
        document.getElementById("speed").innerHTML= "speed= 2x";
        song.rate(2)
    }

    else if(rightwristY > 400 && rightwristY<=500) {
        document.getElementById("speed").innerHTML= "speed= 2.5x";
        song.rate(2.5)
    }
}
    
    
    
    if(scoreleftwrist>0.2){
    circle(leftwristX , leftwristY , 20);
    innumberleftwristY=Number(leftwristY);
    remove_decimal = Math.floor(innumberleftwristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML= "volume= " + volume;
    song.setVolume(volume);
    }

}

function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function stop() {
    song.stop();
}








