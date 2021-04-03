const p1Elem = document.createElement("div");
const p2Elem = document.createElement("div");
let pos;
let aTurn = true;
const diceImgs = [
    "https://etc.usf.edu/clipart/42100/42158/die_01_42158_md.gif",
    "https://etc.usf.edu/clipart/42100/42159/die_02_42159_lg.gif",
    "https://etc.usf.edu/clipart/42100/42160/die_03_42160_lg.gif",
    "https://etc.usf.edu/clipart/42100/42161/die_04_42161_lg.gif",
    "https://etc.usf.edu/clipart/42100/42162/die_05_42162_lg.gif",
    "https://etc.usf.edu/clipart/42100/42164/die_06_42164_lg.gif",
];
const laddersPos = {
    2: 23,
    17: 93,
    8: 12,
    29: 54,
    39: 80,
    62: 78,
    70: 89
};
const snakesPos = {
    99: 4,
    92: 76,
    59: 37,
    41: 20,
    31: 14,
    67: 50
};
createBoard();
Array.prototype.forEach.call(
    document.querySelectorAll(".colorChoose"),
    elem => elem.addEventListener(
        "click",
        (e) => {
            if (e.target.parentElement.classList.contains("chose1")) {
                if (e.target.parentElement.classList.contains("chose1"))
                    document.querySelector(".chose1").style.display = "none";
                p1Elem.innerHTML = "1";
                p1Elem.classList.add("colorSelect");
                if (e.target.classList.contains("red"))
                    p1Elem.classList.add("red");
                else if (e.target.classList.contains("blue"))
                    p1Elem.classList.add("blue");
                else if (e.target.classList.contains("green"))
                    p1Elem.classList.add("green");
                p1Elem.id = "p1";
                document.getElementById("1").appendChild(p1Elem);
                //const p1ElemElem = document.querySelector("#p1Elem");
                play();
            }
            else if (e.target.parentElement.classList.contains("chose2")) {
                if (e.target.parentElement.classList.contains("chose2"))
                    document.querySelector(".chose2").style.display = "none";
                p2Elem.innerHTML = "2";
                p2Elem.classList.add("colorSelect");
                if (e.target.classList.contains("red"))
                    p2Elem.classList.add("red");
                else if (e.target.classList.contains("blue"))
                    p2Elem.classList.add("blue");
                else if (e.target.classList.contains("green"))
                    p2Elem.classList.add("green");
                p2Elem.id = "p2";
                document.getElementById("1").appendChild(p2Elem);
                //const p1ElemElem = document.querySelector("#p1Elem");
                //  play2();
            }
            if (document.querySelector(".chose2").style.display == "none"
                && document.querySelector(".chose1").style.display == "none") {
                document.querySelector(".dice").style.display = "initial";
                document.querySelector("#hideChose").style.display = "none";
            }
        }
    )
);
function play() {
    const clickCheck = document.querySelector(".dice");
    clickCheck.addEventListener("click", () => {
        if (aTurn) {
            document.querySelector("#wturn").innerText = "Player 1";
            setTimeout(() => { move(parseInt(p1Elem.parentElement.id) + rand, p1Elem.parentElement, p1Elem); }, 500);
        }
        else if (!aTurn) {
            document.querySelector("#wturn").innerText = "Player 2";
            setTimeout(() => { move(parseInt(p2Elem.parentElement.id) + rand, p2Elem.parentElement, p2Elem); }, 500);
        }
        rand = Math.floor(Math.random() * 6) + 1;
        document.querySelector("#no").innerHTML = `<img src=${diceImgs[rand - 1]} width=80px>`;
    });
    if (p1Elem.parentElement.id.length > 1) {
        p1Elem.style.width = "23px";
        p1Elem.style.height = "23px";
    }
}
const move = (no, parent, myElem) => {
    pos = myElem.parentElement.id;
    if (Object.keys(laddersPos).includes(pos)) {
        setTimeout(move, 400, laddersPos[pos], myElem.parentElement, myElem);
    }
    if (Object.keys(snakesPos).includes(pos)) {
        setTimeout(move, 400, snakesPos[pos], myElem.parentElement, myElem);
    }
    if (pos == "100") {
        console.log("win");
        if (p1Elem.parentElement.id == 100) { document.querySelector(".dice").innerHTML = "<h1>Player One Wins!!</h1><button onclick='location.reload()'>Restart</button>"; }
        if (p2Elem.parentElement.id == 100) { document.querySelector(".dice").innerHTML = "<h1>Player Two Wins!!</h1><button onclick='location.reload()'>Restart</button>"; }
    }
    else if (no < 101) {
        parent.removeChild(myElem);
        document.getElementById(no).appendChild(myElem);
    } else {
        move(parseInt(pos) + Math.floor(Math.random() * 5) + 1, myElem.parentElement, myElem);
    }
    if (myElem.parentElement.id == "100") {
        if (p1Elem.parentElement.id == 100) { document.querySelector(".dice").innerHTML = "<h1>Player One Wins!!</h1><button onclick='location.reload()'>Restart</button>"; }
        if (p2Elem.parentElement.id == 100) { document.querySelector(".dice").innerHTML = "<h1>Player Two Wins!!</h1><button onclick='location.reload()'>Restart</button>"; }
    }
    pos = (myElem.parentElement.id);
    if (Object.keys(laddersPos).includes(pos)) {
        setTimeout(move, 400, laddersPos[pos], myElem.parentElement, myElem);
        aTurn = !aTurn;
    }
    if (Object.keys(snakesPos).includes(pos)) {
        setTimeout(move, 400, snakesPos[pos], myElem.parentElement, myElem);
        aTurn = !aTurn;
    }
    aTurn = !aTurn;
    if (document.querySelector("#wturn")) {
        if (aTurn) {
            document.querySelector("#wturn").innerText = "Player 1";
        }
        else if (!aTurn) {
            document.querySelector("#wturn").innerText = "Player 2";
        }
    }
};
function createBoard() {
    const board = document.querySelector(".board");
    var elemArray = [];
    // for (i = 0; i < 100; i++) {
    //     const elem = document.createElement("div");
    //     p.push(elem);
    // }
    // p = p.reverse();
    let rev = false;
    for (i = 0; i < 10; i++) {
        if (rev) {
            for (j = 9; j >= 0; j--) {
                const elem = document.createElement("div");
                elem.setAttribute("id", 100 - (i * 10 + j + 1) + 1);
                elem.innerHTML = 100 - (i * 10 + j + 1) + 1;
                elemArray.push(elem);
            }
        }
        else {
            for (j = 0; j < 10; j++) {
                const elem = document.createElement("div");
                elem.setAttribute("id", 100 - (i * 10 + j + 1) + 1);
                elem.innerHTML = 100 - (i * 10 + j + 1) + 1;
                elemArray.push(elem);
            }
        }
        rev = !rev;
    }
    Array.prototype.forEach.call(elemArray, (elem, index) => {
        if (Object.keys(laddersPos).includes((elem.innerHTML))) {
            elem.innerHTML = elem.innerHTML + "🔼" + laddersPos[(elem.innerHTML)] + "<br>";

        }
        if (Object.keys(snakesPos).includes((elem.innerHTML))) {
            elem.innerHTML = elem.innerHTML + "🔻" + snakesPos[(elem.innerHTML)] + "<br>";

        }
        elem.classList.add("cell");
        board.appendChild(elem);
    });
}