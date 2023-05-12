let grid = document.querySelector(".grid");
let grid_cells = grid.querySelectorAll(".cmpt:not(.cell-7)");
let cmpts = Array.from(grid_cells);
let bb = document.querySelector(".cell-7");
let isLighting = false;
// let colors = ["red", "green"];
let colors = ["red", "green", "blue","yellow"];
let blinking_time = 500;
let btn = document.querySelector(".btn");

function createLight() {
    let light = document.createElement("div");
    light.classList.add("bulb");
    return light;
}

bb.addEventListener("click", function (event) {
    if (isLighting) {
        stopLighting();
    } else {
        startLighting();
    }
});

function startLighting() {
    cmpts.forEach(cmpt => cmpt.appendChild(createLight()));
    let bulbs = [];
    let start = [];
    cmpts.forEach(cmpt => bulbs.push(cmpt.firstChild));
    bulbs.forEach((bulb, idx) => start.push(idx % colors.length));
    let total_time = colors.length * blinking_time;
    const intervalId = setInterval(async () => {
        try {
            if(isLighting){
                await bulbs.forEach((bulb,i) => startBlinking(bulb, start[i]));
            } else {
                setTimeout(() => clearInterval(intervalId), 1000);
                console.log(intervalId);
            }
        } catch(error) {
            console.error(error);
        }
    }, total_time);
    isLighting = true;
}

function stopLighting() {
    cmpts.forEach(bulb => bulb.removeChild(bulb.firstChild));
    isLighting = false;
}

function addColor(el, idx) {
    colors.forEach(c => el.classList.remove(c));
    el.classList.add(colors[idx]);
}

async function startBlinking(el, start){
    let promises = [];

    for(let i=0;i<colors.length;i++){
        promises.push(new Promise((resolve) => {
            // async operation here
            setTimeout(() => {
                addColor(el, start);
                start++;
                if(start >= colors.length) start = start % colors.length;
                resolve(1);
            }, (i+1) * blinking_time);
        }));
    }

    await Promise.all(promises);
}

btn.addEventListener("click", function(event){
    btn.classList.toggle("btn-on");
})
