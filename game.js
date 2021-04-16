
var rightPress = false;
var leftPress = false;
var upPress = false;
var jumpFall = false;
var isOver = false;
var road = [false,false,false,false,
            false,false,false,false];
var allIntervals = [];
var havePoints = 0;


function startGame(){
    for(let i=0; i<8; i++){
        generateBlock(i*100,4*100,1);
    }
    
    let inter1 = setInterval(() => {
        let rand = randomNumbers() ;
        generateBlock(rand*100,0,0);
    }, 2000);

    let inter2 = setInterval(moveAvatar,25);

    generateAvatar();

    let inter3 = setInterval(() => {
        fallAvatar();
    },100);

    let inter4 = setInterval(earnPoints,1000);

    let inter5 = setInterval(generateCoin,2000);

    allIntervals.push(inter1);
    allIntervals.push(inter2);
    allIntervals.push(inter3);
    allIntervals.push(inter4);
    allIntervals.push(inter5);

    document.getElementById("startGame").style.display = "none";
}

function earnPoints(){
    havePoints++;
    document.getElementById("points").innerHTML = "<p>Points: "+havePoints+"</p>";
    console.log(havePoints);
}

function generateBlock(l,t,type){
    let board = document.getElementById("board");
    let newBlock = document.createElement("div");
    newBlock.style.position = "fixed";
    newBlock.style.left = l+"px";
    newBlock.style.top = t+"px";
    newBlock.className = "blocks";
    board.appendChild(newBlock);
    //console.log(l);
    if(!type){
        let inter = setInterval(() => {
            let vTop = window.getComputedStyle(newBlock).top;
            //newBlock.style.top = "calc("+vTop+" + 25px)";
            //console.log(vTop);
           fallBlock(newBlock); 
        }, 500);
        allIntervals.push(inter); 
    }else{
        newBlock.id = "block"+(l/100);
        road[(l/100)] = true;
    }
}

function randomNumbers(){
    let rand = Math.floor(Math.random()*8);
    return rand;
}

function fallBlock(block){
    let vTop = window.getComputedStyle(block).top;
    block.style.top = "calc("+vTop+" + 25px)";
    collision(block);
    //console.log(vTop);
    if(vTop=="450px"){
        block.remove();
    }else if(vTop=="300px"){
        if(randomNumbers()==5){
            // block.style.outline = "5px solid red";
            let vLeft = window.getComputedStyle(block).left;
            vLeft =  vLeft.substr(0,vLeft.length-2);
            let roadBlock = document.getElementById("block"+(vLeft/100));
            //console.log(vLeft);
            if(roadBlock){
                road[vLeft/100] = false;
                let inter = setInterval(() => {
                let vRTop = window.getComputedStyle(roadBlock).top;
                //console.log(vRTop);
                fallBlock(roadBlock); 
                }, 500);
                allIntervals.push(inter);
            }
        }
    }else{
        collision(block);
    }
}

function generateAvatar(){
    let board = document.getElementById("board");
    let newBlock = document.createElement("div");
    newBlock.style.position = "fixed";
    newBlock.style.left = "380px";
    newBlock.style.top = "330px";
    newBlock.id = "avatar";
    board.appendChild(newBlock);
    var avatar = document.getElementById("avatar");
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
    if(e.keyCode == "68"){
        rightPress = true;
    }else if(e.keyCode == "65"){
        leftPress = true;
    }
    if(e.keyCode == "87" && !jumpFall){
        upPress = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == "68"){
        rightPress = false;
    }else if(e.keyCode == "65"){
        leftPress = false;
    }
    if(e.keyCode == "87"){
        upPress = false;
        jumpFall = true;
    }
}

function moveAvatar(){
    if(rightPress){
        let vLeft = window.getComputedStyle(avatar).left;
        avatar.style.left = "calc("+vLeft+" + 5px)";
        avatar.style.backgroundImage = "url(img/charP1.png)";
    }else if(leftPress){
        let vLeft = window.getComputedStyle(avatar).left;
        avatar.style.left = "calc("+vLeft+" - 5px)";
        avatar.style.backgroundImage = "url(img/charP2.png)";
    }

    let vTop = window.getComputedStyle(avatar).top;
    let intTop = parseInt(vTop,10);

    if(upPress){
        avatar.style.top = "calc("+vTop+" - 10px)";

        if(intTop<250){
            upPress = false;
            jumpFall = true;
        }
    }else{
        if(vTop!="330px"){
            avatar.style.top = "calc("+vTop+" + 10px)";
        }else{
            jumpFall = false;
        }
    }
}

function collision(block){
    let vLeftA = window.getComputedStyle(avatar).left;
    vLeftA =  parseInt(vLeftA,10);
    let vLeftB = window.getComputedStyle(block).left;
    vLeftB =  parseInt(vLeftB,10);
    let vTopA = window.getComputedStyle(avatar).top;
    vTopA = parseInt(vTopA,10);
    let vTopB = window.getComputedStyle(block).top;
    vTopB = parseInt(vTopB,10);
    //console.log(vLeftB+100);
    if(vLeftA>vLeftB-45 && vLeftA<(vLeftB+105)){
        //console.log("LEFT");
        if(vTopB+100>=vTopA && vTopB<=vTopA+70){
            // avatar.style.outline = "3px solid Red";
            isOver = true;
            theEnd();
        }
    }
}

function fallAvatar(){
    let vLeftA = window.getComputedStyle(avatar).left;
    let vTopA = window.getComputedStyle(avatar).top;
    vLeftA =  parseInt(vLeftA,10);
    //let roadBlock = getElementById("block"+(vLeftA/100));
    //console.log(vLeftA);
    console.log(road[Math.floor(vLeftA/100)]);
    if(vTopA>="450px"){
        isOver = true;
        theEnd();
        avatar.remove();
    }else if(!road[Math.floor(vLeftA/100)] && vTopA=="330px" && (Math.floor(vLeftA/100)==Math.floor((vLeftA+40)/100))){
        let inter = setInterval(() => {
            let vTopA = window.getComputedStyle(avatar).top;
            console.log(vTopA); 
            avatar.style.top = "calc("+vTopA+" + 10px)";
            if(vTopA>="450px"){
                avatar.remove();
                isOver = true;
                theEnd();
            }
        }, 50);
        allIntervals.push(inter);
    }
}

function theEnd(){
    let endGame = document.getElementById("endGame").style;
    endGame.display = "block";
    document.getElementById("finalScore").innerHTML = "Your score is: <span id='pointC'>"+havePoints+"</span>";
    allIntervals.forEach(clearInterval);
}

function generateCoin(){
    let board = document.getElementById("board");
    let newCoin = document.createElement("div");
    newCoin.style.position = "fixed";
    newCoin.style.left = Math.floor(Math.random()*770)+"px";
    newCoin.style.top = Math.floor(Math.random()*100+280)+"px";
    newCoin.className = "coins";
    board.appendChild(newCoin);

    setInterval(() => {
        grabCoin(newCoin);
    }, 200);

    setTimeout(()=>{
        newCoin.remove();
    },5000);
}

function grabCoin(coin){
    let vLeftA = window.getComputedStyle(avatar).left;
    vLeftA =  parseInt(vLeftA,10);
    let vLeftC = window.getComputedStyle(coin).left;
    vLeftC =  parseInt(vLeftC,10);
    let vTopA = window.getComputedStyle(avatar).top;
    vTopA = parseInt(vTopA,10);
    let vTopC = window.getComputedStyle(coin).top;
    vTopC = parseInt(vTopC,10);

    if(vLeftA+45>vLeftC && vLeftC+30>vLeftA){
        if(vTopC+30>=vTopA && vTopC<=vTopA+70){
            coin.remove();
            havePoints += 2;
            document.getElementById("points").innerHTML = "<p>Points: "+havePoints+"</p>";
        }
    }
}