let from = 0
let to = -100

let from_mm = 0
let to_mm = -100
let from_cm = 0
let to_cm = -100
let from_dm = 0
let to_dm = -100


const dialMoveTiming = {
     duration: 1000,
     iterations: 1,
     fill: "forwards"};

window.setInterval(GetPosition, 1000);
window.setInterval(GetPositionMulti, 1000);

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

        let dial = document.getElementById("dial");

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
        dial.animate(dialMove, dialMoveTiming)
    }).catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
}

function GetPositionMulti() {
    fetch("https://localhost:7307/GetValue").then(function(response) {
    return response.json();
    }).then(function(data) {
        console.log(data);
        to_mm = data.value / -0.05
        to_cm = data.value / -0.5
        to_dm = data.value / -5 - 50

        while(to_mm > 0)
            to_mm = to_mm - 200
        while(to_mm < -200)
            to_mm = to_mm + 200

        while(to_cm > 0)
            to_cm = to_cm - 200
        while(to_cm < -200)
            to_cm = to_cm + 200

        while(to_dm > -100)
            to_dm = to_dm - 200
        while(to_dm < -300)
            to_dm = to_dm + 200

        let dial_mm = document.getElementById("dial_mm");
        let dial_cm = document.getElementById("dial_cm");
        let dial_dm = document.getElementById("dial_dm");

        // -200 = full 
        if(data.positive)
            while(from_mm < to_mm)
                from_mm = from_mm + 200
        else 
            while(from_mm > to_mm)
                from_mm = from_mm - 200

        if(data.positive)
            while(from_cm < to_cm)
                from_cm = from_cm + 200
        else 
            while(from_cm > to_cm)
                from_cm = from_cm - 200

        if(data.positive)
            while(from_dm < to_dm)
                from_dm = from_dm + 200
        else 
            while(from_dm > to_dm)
                from_dm = from_dm - 200

        let dialMove_mm = [
            { transform: "translateX(" + from_mm + "%)"},
            { transform: "translateX(" + to_mm + "%)"}];

        let dialMove_cm = [
            { transform: "translateX(" + from_cm + "%)"},
            { transform: "translateX(" + to_cm + "%)"}];

        let dialMove_dm = [
            { transform: "translateX(" + from_dm + "%)"},
            { transform: "translateX(" + to_dm + "%)"}];

            
        console.log("from: " + from_mm + ", to:" + to_mm)        
        console.log("from: " + from_cm + ", to:" + to_cm)        
        console.log("from: " + from_dm + ", to:" + to_dm)
        from_mm = to_mm
        from_cm = to_cm
        from_dm = to_dm
        dial_mm.animate(dialMove_mm, dialMoveTiming)
        dial_cm.animate(dialMove_cm, dialMoveTiming)
        dial_dm.animate(dialMove_dm, dialMoveTiming)
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