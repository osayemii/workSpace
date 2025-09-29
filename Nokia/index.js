// let mainTime = document.getElementById("time");
// new Date().toLocaleString()
// document.getElementById("display").innerHTML = "Hello World";
// document.querySelector("phon").addEventListener('keyup', (e) => {
//     console.log(e);
// })

const display = document.getElementById("display");
const displayApps = document.getElementById("displayApps");
const displayNumbers = document.getElementById("displayNumbers");
function displayClock() {
    // const timeDisplay = document.getElementById("menuTime");
    // timeDisplay = new Date();
    // const hours = new Date().getHours().toString().padStart(2, '0');
    // const minutes = new Date().getMinutes().toString().padStart(2, '0');
    // document.getElementById('menuTime').innerHTML = `${hours}:${minutes}`

    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const hourAndMin = `${hours}:${minutes}`;
    console.log(hourAndMin);
    document.getElementById('menuTime').innerHTML = hourAndMin;
}
setInterval(displayClock, 1000);
document.getElementById("menuDate").innerHTML = new Date().toLocaleDateString();


$('#center').click(function () {
    displayNumbers.innerHTML = '';
    if (displayNumbers.innerHTML.length === 0) {
        document.querySelector(".displayNumbers").style.display = "none"
        document.querySelector(".displayApps").style.display = "none"
        document.getElementById("display").style.display = "block"
    }
    // display.innerHTML = '';
    // console.log(displayNumbers.innerHTML.length)
})
$('#leftUp').click(function () {
    display.splice();
})
$('#leftDown').click(function () {
    alert("I am ready");
})
$('#rightUp').click(function () {
    alert("I am ready");
})
$('#rightDown').click(function () {
    alert("I am ready");
})
$('#one').click(function () {
    displayNumbers.innerHTML += 1;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
    // console.log(display.innerHTML.length);
});
$('#two').click(function () {
    displayNumbers.innerHTML += 2;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#three').click(function () {
    displayNumbers.innerHTML += 3;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#four').click(function () {
    displayNumbers.innerHTML += 4;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#five').click(function () {
    displayNumbers.innerHTML += 5;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#six').click(function () {
    displayNumbers.innerHTML += 6;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#seven').click(function () {
    displayNumbers.innerHTML += 7;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#eight').click(function () {
    displayNumbers.innerHTML += 8;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#nine').click(function () {
    displayNumbers.innerHTML += 9;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#asteric').click(function () {
    displayNumbers.innerHTML += '*';
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#zero').click(function () {
    displayNumbers.innerHTML += 0;
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
})
$('#ash').click(function () {
    if (display.innerHTML.length >= 0) {
        document.querySelector(".displayNumbers").style.display = "block"
        document.getElementById("display").style.display = "none"
        document.getElementById("displayApps").style.display = "none"
    }
    // console.log(display.innerHTML.length);
    document.querySelector(".displayNumbers").innerHTML += '#';
})

// document.querySelector(".phon").addEventListener('keyup', function (e) {
//     console.log(e.getModifierState('CapsLock'));
//     // if (e.key === 'CapsLock') {
//     //     alert("You oress Cpalocks")
//     // }
// })

document.getElementById('phone').addEventListener('keypress', function (e) {
    console.log(e.key);
})

// function menu() {
//     alert("Hello WOrld")
// }
document.getElementById("menuBtn").addEventListener('click', function () {
    document.querySelector(".displayNumbers").style.display = "none"
    document.getElementById("displayApps").style.display = "block"
    document.getElementById("display").style.display = "none"
})