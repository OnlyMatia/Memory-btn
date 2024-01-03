buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];
userClickedPattern = [];

var started = false
var level = 0;

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("succes");

        if(userClickedPattern.length == gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);

        playSound("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver()
    }
}


$(document).keypress(function (){
    if(!started){
        $("#level-title").text("Level " + level);

        nextSequence();
        started = true;
    }

});

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");

    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    },100);
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    

}


