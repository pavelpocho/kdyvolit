function setupStyleAnimations() {
    setupTitleAnimation();
    setupMoreButtonAnimation();
}

function setupMoreButtonAnimation() {
    document.getElementById("more-elections").onmouseover = () => {
        document.getElementsByClassName("rolling-background")[0].style.transform = "scaleX(1)";
    }
    document.getElementById("more-elections").onmouseout = () => {
        document.getElementsByClassName("rolling-background")[0].style.transform = "scaleX(0)";
    }
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