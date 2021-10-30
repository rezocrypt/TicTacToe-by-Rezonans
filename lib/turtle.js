/// <reference path="./lib/Intellisense/js-turtle_hy.ts" />










// This is just for made by rezonans text
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomLetter() {
 var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
 return alphabet[rand(0,alphabet.length - 1)]
}
function getRandomWord(word) {
  var text = word.innerHTML
  
  var finalWord = ''
  for(var i=0;i<text.length;i++) {
    finalWord += text[i] == ' ' ? ' ' : getRandomLetter()
  }
 
  return finalWord
}

var word = document.querySelector('p')
var interv = 'undefined'
var canChange = false
var globalCount = 0
var count = 0
var INITIAL_WORD = word.innerHTML;
var isGoing = false

function init() {
 if(isGoing) return;
 
 isGoing = true

 // Playing audio
 try {
    let audio1 = new Audio('Audio/typeing.mp3');
    audio1.play();
 } catch (error) {
     console.log();
 }



 var randomWord = getRandomWord(word)
 word.innerHTML = randomWord

 interv = setInterval(function() {
  var finalWord = ''
  for(var x=0;x<INITIAL_WORD.length;x++) {
   if(x <= count && canChange) {
    finalWord += INITIAL_WORD[x]
   } else {
    finalWord += getRandomLetter()
   }
  }
  word.innerHTML = finalWord
  if(canChange) {
    count++
  }
  if(globalCount >= 20) {
   canChange = true
  }
  if(count>=INITIAL_WORD.length) {
   clearInterval(interv)
   count = 0
   canChange = false
   globalCount = 0
   isGoing = false
  }
  globalCount++
 },50)
 //stoping audio
}
word.addEventListener('mouseenter', init)


//




















// Adding shadow to canvas elements  
var c = document.getElementById("turtlecanvas");
var ctx = c.getContext("2d");
ctx.shadowBlur = 10;
ctx.shadowColor = "black";
ctx.fillRect(20, 20, 100, 80);


// Function for checking if array includes another array    
function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}

// Function for checking if array is equal to another array
function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

// Function for adding step X or O
function drawStep(x,y,symbol){

    // Give new values
    width(5)

    // For random player
    if (symbol == "r" || symbol == "R") {
        rcheck = Math.random()
        if (rcheck>=0.5){
            symbol="X"
        }
        else{
            symbol="O"
        }
    }

    // Does this if needs to draw X
    if (symbol=="X" || symbol=="x") {
        x_coordinates.push([x,y])
        myX = -cs/2+x*(squareSize)-(squareSize)+(squareSize/5)
        myY = cs/2-(y*squareSize)+(squareSize/5)
        goto(myX,myY)
        color("blue")
        right(45)
        forward((4.24*squareSize)/5)
        goto(myX+(squareSize*3/5),myY)
        left(90)
        forward((4.24*squareSize)/5)
        right(45)


        let arrToCheck = [x,y]
        for (let i = 0; i < free_coordinates.length; i++) {
            if (arraysEqual(free_coordinates[i],arrToCheck)) {
                free_coordinates.splice(i,1)
                break
            }
        }
    }

    // Does this if needs to draw O
    if(symbol=="O" || symbol=="o" || symbol=="0"){
        o_coordinates.push([x,y])
        myX = -cs/2+x*(squareSize)-(squareSize)+(squareSize/2)
        myY = cs/2-(y*squareSize)+(squareSize/2)
        radius = squareSize*3/10
        goto(myX,myY+radius)
        right(90)
        color("red")
        for (let r = 0; r < 100; r++) {
            forward(squareSize/55.5)
            right(360/100)
        }
        left(90)

        let arrToCheck = [x,y]
        for (let i = 0; i < free_coordinates.length; i++) {
            if (arraysEqual(free_coordinates[i],arrToCheck)) {
                free_coordinates.splice(i,1)
                break
            }
        }
    }

    // Back default options
    goto(1000,1000)
    color("black")
    width(2)
}

// Function for drawing cage 
function drawCage(size){
    var squareSize = cs/size
    goto(-cs/2,cs/2)
    right(180)
    width(2)
    for (let i = 0; i < size; i++) {
        forward(cs)
        left(90)
        forward(squareSize)
        left(90)
        forward(cs)
        left(90)
        forward(squareSize)
        left(180)
        forward(squareSize)
        right(90)
    }
    for (let a = 0; a < size; a++) {
        for (let i = 0; i < 2; i++) {
            forward(squareSize)
            right(90)
            forward(cs)
            right(90)
        }
        forward(squareSize)
    }
    left(180)
    goto(1000,1000)
}


// Geting all possible win positions
function allPossibleWinPositions(size)
{
    let wins = []
    let onewin = []
    let coords = []
    for (let y = 1; y <= size; y++) {
        for (let x = 1; x <= size; x++) {
            coords.push(x)
            coords.push(y)
            onewin.push(coords)
            coords = []
        }
        wins.push(onewin)
        onewin = []
    }
    for (let x = 1; x <= size; x++) {
        for (let y = 1; y <= size; y++) {
            coords.push(x)
            coords.push(y)
            onewin.push(coords)
            coords = []
        }
        wins.push(onewin)
        onewin = []
    }
    for (let a = 1; a <= size; a++) {
        coords.push(a,a)
        onewin.push(coords)
        coords = []
    }
    wins.push(onewin)
    onewin=[]
    for (let a = 1; a <= size; a++) {
        coords.push(size-a+1,a)
        onewin.push(coords)
        coords = []
    }
    wins.push(onewin)
    onewin=[]

    return wins
}

// Function for filling free cordinates for first time
function fillFree(){
    let free = []
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size; j++) {
            free.push([i,j])
        }  
    }    
    return free
}


// Checking if somebody has been won
function checkWin(){
    
      
    let matches = 0

    for (let i = 0; i < wins.length; i++) {
        matches = 0
        for (let j = 0; j < size; j++) {
            if (isArrayInArray(x_coordinates,wins[i][j])) {
                matches += 1
            }
        }
        if (matches==size) {
            return "X"
        }
        
    }

    for (let i = 0; i < wins.length; i++) {
        matches = 0
        for (let j = 0; j < size; j++) {
            if (isArrayInArray(o_coordinates,wins[i][j])) {
                matches += 1
            }
        }
        if (matches==size) {
            return "O"
        }
        
    }
    if (free_coordinates.length==0){
        return "="
    }
    return false
}

// Function for geting robot symbol
function getRobotFunction(){
    if(player_symbol=="O" || player_symbol=="o" || player_symbol=="0"){
        return "X"
    }
    if(player_symbol=="X" || player_symbol=="x"){
        return "O"
    }
}

// Function which makes robot to play
function robotStep(){
    
    if (difficulty==1){
        let stepCords = free_coordinates[Math.floor(Math.random()*free_coordinates.length)];
        drawStep(stepCords[0],stepCords[1],robot_symbol)
    }
    else if (difficulty==3){

        var bb = 0
        let matches = 0
        var best_matches = {}
        for (let i = 0; i < wins.length; i++) {
            matches = 0
            for (let j = 0; j < size; j++) {
                if (isArrayInArray(x_coordinates,wins[i][j])) {
                    matches += 1
                    bb=i
                }
            }
            best_matches[wins[bb]] = matches

        }

        for (let i = 0; i < wins.length; i++) {
            matches = 0
            for (let j = 0; j < size; j++) {
                if (isArrayInArray(o_coordinates,wins[i][j])) {
                    matches += 1
                    bb=i
                }
            }
            best_matches[wins[bb]] = matches
    }

    let maxValue = 0
    let maxKey = 0
    for (const [key, value] of Object.entries(best_matches)) {
        if (value>=maxValue) {
            maxValue=value
            maxKey = key
        }
    }
    let nums = []
    let num = ""
    for (let i = 0; i < maxKey.length; i++) {
        if (maxKey[i]==","){
            nums.push(+num)
            num = ""
        }
        else{
            num+=maxKey[i]
        }
    }
    nums.push(+num)

    best_matches = []

    let sm = []
    for (let i = 0; i <= nums.length/2+2; i+=2) {
        sm.push(nums[i])
        sm.push(nums[i+1])
        best_matches.push(sm)
        sm = []
        
    }
    for (let i = 0; i < best_matches.length; i++) {
        if(isArrayInArray(free_coordinates,best_matches[i])){
            let stepCords2 = best_matches[i]
            drawStep(stepCords2[0],stepCords2[1],robot_symbol)
            return
        }
    }
    if (true){
        try {
            let stepCords = free_coordinates[Math.floor(Math.random()*free_coordinates.length)];
            drawStep(stepCords[0],stepCords[1],robot_symbol)
        } catch (error) {
            winner()
        }

        
    }
    }
    else if (difficulty==2){
        if (Math.random()>=0.5) {
            
        var bb = 0
        let matches = 0
        var best_matches = {}
        for (let i = 0; i < wins.length; i++) {
            matches = 0
            for (let j = 0; j < size; j++) {
                if (isArrayInArray(x_coordinates,wins[i][j])) {
                    matches += 1
                    bb=i
                }
            }
            best_matches[wins[bb]] = matches

        }

        for (let i = 0; i < wins.length; i++) {
            matches = 0
            for (let j = 0; j < size; j++) {
                if (isArrayInArray(o_coordinates,wins[i][j])) {
                    matches += 1
                    bb=i
                }
            }
            best_matches[wins[bb]] = matches
    }

    let maxValue = 0
    let maxKey = 0
    for (const [key, value] of Object.entries(best_matches)) {
        if (value>=maxValue) {
            maxValue=value
            maxKey = key
        }
    }
    let nums = []
    let num = ""
    for (let i = 0; i < maxKey.length; i++) {
        if (maxKey[i]==","){
            nums.push(+num)
            num = ""
        }
        else{
            num+=maxKey[i]
        }
    }
    nums.push(+num)

    best_matches = []

    let sm = []
    for (let i = 0; i <= nums.length/2+2; i+=2) {
        sm.push(nums[i])
        sm.push(nums[i+1])
        best_matches.push(sm)
        sm = []
        
    }

    for (let i = 0; i < best_matches.length; i++) {
        if(isArrayInArray(free_coordinates,best_matches[i])){
            let stepCords2 = best_matches[i]
            drawStep(stepCords2[0],stepCords2[1],robot_symbol)
            return
        }
        
    }
    if (true){
        try {
            let stepCords = free_coordinates[Math.floor(Math.random()*free_coordinates.length)];
            drawStep(stepCords[0],stepCords[1],robot_symbol)
        } catch (error) {
            winner()
        }
    }
}
    
    else{
    let stepCords = free_coordinates[Math.floor(Math.random()*free_coordinates.length)];
    drawStep(stepCords[0],stepCords[1],robot_symbol)
    }

    
    }

}

function winner() {
    document.getElementById("getInput").style.display = "none";
    document.getElementById("wonorlose").style.display = "block";
    document.getElementById("error").style.display = "none";

    
    if (checkWin()=="=") {
        // Adding score
        let lastscore1 = score[0]
        let lastscore2 = score[1]
        score[0] = lastscore1+1
        score[1] = lastscore2+1

        document.getElementById("wl").textContent = "Draw  😕"+score[0]+":"+score[1]
        document.getElementById("wl").style.color = "#F07427"
        document.getElementById("wonorlose").style.backgroundColor = "#F0BFA1"
        //Play audio
        let audio = new Audio('Audio/draw.wav');
        audio.play();
    }
    else if (checkWin()==player_symbol) {
        // Adding score
        let lastscore = score[0]
        score[0] = lastscore+1

        document.getElementById("wl").textContent = player_name +  " You won the game!  😂   "+score[0]+":"+score[1]
        document.getElementById("wl").style.color = "#04AA6D"
        document.getElementById("wonorlose").style.backgroundColor = "#9BDECA"
        //Play audio
        let audio = new Audio('Audio/winner.mp3');
        audio.play();
    }
    else{
        // Adding score
        let lastscore = score[1]
        score[1] = lastscore+1
        document.getElementById("wl").textContent = player_name + " You lose  😔"+score[0]+":"+score[1]
        document.getElementById("wl").style.color = "#DE0209"
        document.getElementById("wonorlose").style.backgroundColor = "#DE8487"
        //Play audio
        let audio = new Audio('Audio/loser.mp3');
        audio.play();
    }
    


}

// Function when user is doing a step
function makeStep(){
    let x = +document.getElementById("xcord").value;
    let y = +document.getElementById("ycord").value;
    var error = document.getElementById("error")
    var errorText = document.getElementById("errorText")
    if (x>size || y>size || x<1 || y<1 || x!=Math.round(x) || y!=Math.round(y)) {
        //Play audio
        let audio = new Audio('Audio/error.mp3');
        audio.play();
        document.getElementById("error").style.display = "block";
        document.getElementById("errorText").textContent = "Coordinate Error"
        document.getElementById("errorText2").textContent = "Cant found current coordinate.Try another."
        error.style.backgroundColor = "#F89494"
        error.style.color = "red"
        return
    }
    if (isArrayInArray(free_coordinates,[x,y])) {
        //Play audio
        let audio = new Audio('Audio/userclick.wav');
        audio.play();
        drawStep(x,y,player_symbol)
        if (checkWin()!=false) {
            winner()
            return
        }
        
        
        robotStep()
        
        if (checkWin()!=false) {
            winner()
            return
        }
         
        document.getElementById("error").style.display = "none";

    }
    else{
        //Play audio
        let audio = new Audio('Audio/error.mp3');
        audio.play();
        document.getElementById("error").style.display = "block";
        document.getElementById("errorText").textContent = "Cage Occupied"
        document.getElementById("errorText2").textContent = "That cage has been occupied by you or by robot.Try another one."
        error.style.backgroundColor = "#F89494"
        error.style.color = "red"
        return
    }

}

function chooseSettings() {
    
    w = +window.innerWidth;
    if(w<570){
        cs = w
    }
    else if(w>=570 && w<= 1130){
        cs=w/2
    }
    else{
        cs =w/3
    }
    
    let a1 = document.getElementById("turtlecanvas")
    a1.style.width = (w/3+50)+"px"
    a1.style.height = (w/3+50)+"px"

    let size_check = +document.getElementById("cagesize").value
    if (size_check <= 1 || size_check >24 || size_check!=Math.round(size_check)) {
        //Play audio
        let audio = new Audio('Audio/error.mp3');
        audio.play();
        document.getElementById("error").style.display = "block";
        document.getElementById("errorText").textContent = "Wrong size"
        document.getElementById("errorText2").textContent = "Cage size must be natural number from 2 to 24."
        error.style.backgroundColor = "#F89494"
        error.style.color = "red"
    }
    else{
        player_name = document.getElementById("name").value;
        size = +document.getElementById("cagesize").value;
        player_symbol = document.getElementById("selecter").value;
        difficulty = document.getElementById("difselecter").value;
        //Play audio
        let audio = new Audio('Audio/settings.wav');
        audio.play();
        document.getElementById("error").style.display = "none";
        squareSize = cs/size
        free_coordinates = fillFree()
        x_coordinates = []
        o_coordinates = []
        wins = allPossibleWinPositions(size)
        robot_symbol = getRobotFunction()
        clear()
        drawCage(size)
        document.getElementById("getInput").style.display = "block";
        document.getElementById("wonorlose").style.display = "none";
    }


    



    // If player is O call first robot step
    if (player_symbol=="O") {
        robotStep()
    }
}






document.getElementById("getInput").style.display = "none";
document.getElementById("wonorlose").style.display = "none";
document.getElementById("error").style.display = "none";


// Geting inputs from user and makeing variables
var score = [0,0]
var player_name = ""
var size = 3
var player_symbol = "X"
var difficulty = 2
var robot_symbol = getRobotFunction()
var squareSize = cs/3
var x_coordinates = []
var o_coordinates = []
var free_coordinates = fillFree()
var wins = allPossibleWinPositions(size)





var w = +window.innerWidth;
var cs = w
if(w<570){
    cs = w
}
else if(w>=570 && w<= 1130){
    cs=w/2
}
else{
    cs =w/3
}


let a1 = document.getElementById("turtlecanvas")
a1.style.width = (w/3+50)+"px"
a1.style.height = (w/3+50)+"px"

let forwidth1 = document.getElementById("xcord")
forwidth1.style.width = (w*80/1536)+"%"
let forwidth2 = document.getElementById("ycord")
forwidth2.style.width = (w*80/1536)+"%"






// Drawing world
drawCage(size)



