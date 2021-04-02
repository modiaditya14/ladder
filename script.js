const p1Elem = document.createElement("span");
let pos;
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
            console.log(e.target.id);
            document.querySelector(".chose1").style.display = "none";
            document.querySelector(".dice").style.display = "initial";
            p1Elem.innerHTML = "⭐";
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
    )
);
function play() {
    const clickCheck = document.querySelector(".dice");
    clickCheck.addEventListener("click", () => {
        rand = Math.floor(Math.random() * 6) + 1;
        document.querySelector("#no").innerHTML = `<img src=${diceImgs[rand - 1]} width=80px>`;
        setTimeout(() => { move(parseInt(p1Elem.parentElement.id) + rand, p1Elem.parentElement); }, 500);
    });
    if (p1Elem.parentElement.id.length > 1) {
        p1Elem.style.width = "23px";
        p1Elem.style.height = "23px";
    }
}
const move = (no, parent) => {
    pos = p1Elem.parentElement.id;
    if (pos == "100") {
        console.log("win");
        document.querySelector(".dice").innerHTML = "<h1>You Win!!</h1><button onclick='location.reload()'>Restart</button>";
    }
    else if (no < 101) {
        parent.removeChild(p1Elem);
        document.getElementById(no).appendChild(p1Elem);
    } else {
        move(parseInt(pos) + Math.floor(Math.random() * 5) + 1, p1Elem.parentElement);
    }
    pos = (p1Elem.parentElement.id);
    if (Object.keys(laddersPos).includes(pos)) {
        setTimeout(move, 500, laddersPos[pos], p1Elem.parentElement);
    }
    if (Object.keys(snakesPos).includes(pos)) {
        setTimeout(move, 500, snakesPos[pos], p1Elem.parentElement);

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
            elem.innerHTML = elem.innerHTML + "🔼" + laddersPos[(elem.innerHTML)];

            console.log(elem.innerHTML);
        }
        if (Object.keys(snakesPos).includes((elem.innerHTML))) {
            elem.innerHTML = elem.innerHTML + "🔻" + snakesPos[(elem.innerHTML)];

            console.log(elem.innerHTML);
        }
        board.appendChild(elem);
    });
}