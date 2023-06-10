song1="";
song2="";
songstatus1="";
songstatus2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
songFiles="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.position(400,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
   
    
    
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw(){
    image(video,0,0,600,500);

    songstatus1=song1.isPlaying();
    songstatus2=song2.isPlaying();

    if(scoreLeftWrist>0.2)
    {
        song1.stop();
        if(songstatus2==false){
            song2.play();
        document.getElementById("sv").innerHTML="Song: You've got a friend Peter Pan";
        }
    }


    if(scoreRightWrist>0.2)
    {
        song2.stop();
        if(songstatus1==false){
            song1.play();
        document.getElementById('sv').innerHTML="Song: Harry Potter Theme";
        }
    }

}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY"+rightWristY);
    }
}