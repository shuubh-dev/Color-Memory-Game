let gameStarted = false;
let colorOptions = ['red', 'blue', 'green', 'yellow']
let gameArr = []; 
let userArr = [];
let level = 0;

document.addEventListener('keypress', () => {
    if(gameStarted === false) {
        gameStarted = true;
        console.log("The game has begin")
        levelUpdate();
        userInput()
    }
})

function levelUpdate() {
    level++;
    userArr = []

    // update the level on page 
    let lvl = document.querySelector('h3')
    lvl.innerText = `Level : ${level}`;

    // choose random color and flash it 
    // random color 
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colorOptions[randIdx];

    // flash it 
    setTimeout(() => {
        flash(randColor)
    }, 700);
    
    // add the random color in the gameArr 
    gameArr.push(randColor);

    console.log(gameArr);
}

function flash(randColor) {
    let btn = document.querySelector(`.${randColor}`)
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 400);
}

function userInput() {
    // listens on all btn and which ever btn user clicks flash it 
    // and add it to the user array 
    let buttons = document.querySelectorAll(".btn");
    // console.log(buttons);

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // console.log(button.classList[0])
            // flash the pressed btn 
            let pressedBtnColor = button.classList[0]
            flash(pressedBtnColor);
            userArr.push(pressedBtnColor)

            // check 
            check()
        })
    })
}

function check() {
    if(userArr[userArr.length-1] === gameArr[userArr.length-1]) {
        if(userArr.length === gameArr.length)
            levelUpdate();
    }
    else {
        let lvl = document.querySelector('h3')
        lvl.innerHTML = `Game Over! You scored <b>${level}</b>.<br> Press any key to start again.`;
        resetGame();
    }
}

function resetGame() {
    gameStarted = false;
    level = 0;
    userArr = [];
    gameArr = [];

    let body = document.getElementsByTagName("body")[0];
    // console.dir(body);

    body.classList.add("redFlash");
    
    setTimeout(() => {
        body.classList.remove("redFlash");
    }, 250) 
}
