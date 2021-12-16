song = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = "";
scoreRightWrist = "";

songStatus = "";
songStatus2 = "";

function preload()
{
  song = loadSound("music.mp3");
  song2 = loadSound("music1.mp3")
}

function setup()
{
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.size(600,500);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("scoreleftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
  }
}

function modelLoaded()
{
  console.log("PoseNet Is Initialized");
}

function draw()
{
  image(video, 0, 0, 600, 500);

  fill("blue");
  stroke("#00008B");

  songStatus = song.isPlaying();
  songStatus2 = song2.isPlaying();

  if(scoreLeftWrist > 0.2)
  {
    circle(leftWristX, leftWristY, 20);
    song.stop();
    if(songStatus2 == false)
    {
      song2.play();
      document.getElementById("songName").innerHTML = "Playing | RingTone";
    }
  }

  if(scoreRightWrist > 0.2)
  {
    circle(rightWristX, rightWristY, 20);
    song2.stop();
    if(songStatus == false)
    {
      song.play();
      document.getElementById("songName").innerHTML = "Playing | Harry Poter theme Remix";
    }
  }
}