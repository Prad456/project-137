status1="";
objects=[];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded(){
    console.log('Model Is Loaded!');
    status1 = true;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i] == object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + "found" ;
            }
            else
            {
                document.getElementById("status").innerHTML = object_name + "notFound" ;
            }
            
        }
    }


}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}