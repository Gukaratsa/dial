let from = 0
let to = -100

const dialMoveTiming = {
     duration: 1000,
     iterations: 1,
     fill: "forwards"};

window.setInterval(GetPosition, 1000);

function func() {
    console.log("Hello world")
    //console.log(element.style.getPropertyValue("--target-pos", 200))
    //element.style.setProperty("--target-pos", 200)
}

function func2() {
    let speed = document.getElementById("speed").value;
    fetch("https://localhost:7307/SetSpeed?speed=" + speed).then(function(response) {
    return response.json();
    }).then(function(data) {
    console.log(data);
    }).catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
}
function GetPosition() {
    fetch("https://localhost:7307/GetValue").then(function(response) {
    return response.json();
    }).then(function(data) {
        console.log(data);
        to = data.value / -0.5
        while(to > 0)
            to = to - 200

        while(to < -200)
            to = to + 200

        let dial_mm = document.getElementById("dial_mm");

        // -200 = full 
        if(data.positive)
            while(from < to)
                from = from + 200
        else 
            while(from > to)
            from = from - 200

        let dialMove = [
            { transform: "translateX(" + from + "%)"},
            { transform: "translateX(" + to + "%)"}];

        console.log("from: " + from + ", to:" + to)
        from = to
        dial_mm.animate(dialMove, dialMoveTiming)
    }).catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
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