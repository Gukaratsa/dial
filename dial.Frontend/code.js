let from = 0
let to = -100

const dialMoveTiming = {
     duration: 1000,
     iterations: 1,
     fill: "forwards"};

function func() {
    console.log("Hello world")
    //console.log(element.style.getPropertyValue("--target-pos", 200))
    //element.style.setProperty("--target-pos", 200)
}

function func2() {
    to = document.getElementById("target").value / -0.5;

    fetch("https://localhost:7307/GetValue").then(function(response) {
    return response.json();
    }).then(function(data) {
    console.log(data);
    to = data.value / -0.5
    
    }).catch(function(err) {
    console.log('Fetch Error :-S', err);
    });

    let dial_mm = document.getElementById("dial_mm");

    let dialMove = [
        { transform: "translateX(" + from + "%)"},
        { transform: "translateX(" + to + "%)"}];

    console.log("from: " + from + ", to:" + to)
    from = to
    dial_mm.animate(dialMove, dialMoveTiming)
}

function onmousedown() {
    console.log("Mouse down")
}
function onmouseup() {
    console.log("Mouse up")
}
function onmouseleave() {
    console.log("Mouse leave")
}