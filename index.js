function setupStyleAnimations() {
    setupTitleAnimation();
    setupMainInfoAnimation();
}

function setupTitleAnimation() {
    document.getElementById("main-title-wrap").onmouseover = () => {
        document.getElementById("main-title-4").style.opacity = "1";
        document.getElementById("main-title-4").style.transform = "translateX(0px)";
        document.getElementById("main-title-wrap").style.transform = "translateX(0px)";
        document.getElementById("main-title-copy").style.opacity = "1";
    }
    document.getElementById("main-title-wrap").onmouseout = () => {
        document.getElementById("main-title-4").style.opacity = "0";
        document.getElementById("main-title-4").style.transform = "translateX(-40px)";
        document.getElementById("main-title-wrap").style.transform = "translateX(18px)";
        document.getElementById("main-title-copy").style.opacity = "0";
    }
}

function setupMainInfoAnimation() {
    
}

function flipNumber(newNumber, idSection) {
    let lmo = document.getElementById(idSection + "-old");
    let lmc = document.getElementById(idSection + "-current");
    lmc.innerHTML = newNumber;
    lmo.style.transform = "translateY(-123px)";
    lmc.style.transform = "translateY(-123px)";
    setTimeout(() => {
        lmo.style.transition = "none";
        lmc.style.transition = "none";
        lmo.innerHTML = lmc.innerHTML;
        setTimeout(() => {
            lmo.style.transform = "translateY(0px)";
            lmc.style.transform = "translateY(0px)";
            setTimeout(() => {
                lmo.style.transition = "transform 0.75s cubic-bezier(0.19, 1, 0.22, 1)";
                lmc.style.transition = "transform 0.75s cubic-bezier(0.19, 1, 0.22, 1)";
            }, 50);
        }, 50);
    }, 700);
}

function copyMainTitle() {
    let input = document.getElementById("main-title-copier");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("main-title-copy").innerHTML = "Zkopírováno";
    setTimeout(() => {
        document.getElementById("main-title-copy").innerHTML = "Kliknutím zkopírujte adresu";
    }, 2000);
}

function showFutureElections() {
    document.getElementById("next-elections").style.display = "block";
    document.getElementsByClassName("future-elections-wrap")[0].style.transform = "rotate3d(0, 1, 0, 0deg)";
    document.getElementsByClassName("election-info-wrap")[0].style.transform = "rotate3d(0, 1, 0, 180deg)";
    document.getElementById("next-elections").style.transform = "scale(1.05) translateY(2px)";
    document.getElementById("next-elections").style.boxShadow = "0px -2px 28px -20px #444";
    document.getElementById("next-elections").onmouseout = () => {
        document.getElementById("next-elections").style.transform = "";
        document.getElementById("next-elections").style.boxShadow = "";
    }
    setTimeout(() => {
        document.getElementById("more-elections").style.display = "none";
    }, 1000);
}

function showNextElections() {
    document.getElementById("more-elections").style.display = "block";
    document.getElementsByClassName("future-elections-wrap")[0].style.transform = "rotate3d(0, 1, 0, 180deg)";
    document.getElementsByClassName("election-info-wrap")[0].style.transform = "rotate3d(0, 1, 0, 0deg)";
    document.getElementById("more-elections").style.transform = "scale(1.05) translateY(2px)";
    document.getElementById("more-elections").style.boxShadow = "0px -2px 28px -20px #444";
    document.getElementById("more-elections").onmouseout = () => {
        document.getElementById("more-elections").style.transform = "";
        document.getElementById("more-elections").style.boxShadow = "";
    }
    setTimeout(() => {
        document.getElementById("next-elections").style.display = "none";
    }, 1000);
}

function start() {
    
}

start();
setupStyleAnimations();

// var i = 8;
// var j = 8;
// setInterval(() => {
//     if (i == -1) {
//         flipNumber(j, "big-minute");
//         i = 9;
//         j --;
//     }
//     flipNumber(i, "little-minute");
//     i--;
// }, 1000);

RippleManager.setUp();