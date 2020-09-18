function flipNumber(newNumber, idSection) {
    let lmo = document.getElementById(idSection + "-old");
    let lmc = document.getElementById(idSection + "-current");
    if (newNumber == lmo.innerHTML) {
        return;
    }
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

function displayNumber(number, idSection) {
    let lmo = document.getElementById(idSection + "-old");
    lmo.innerHTML = number;
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

function isMoreThanNow(date) {
    return new Date(date).getTime() > new Date().getTime()
}

function getUpcomingElection(elections) {
    var upcomingElection = null;
    for (var i = 0; i < elections.length; i++) {
        if (isMoreThanNow(elections[i].dates[1].to)) {
            upcomingElection = elections[i];
            break;
        }
    }
    return upcomingElection;
}

// function openAllRegions() {
//     // document.getElementById("dialog-wrap").style.display = "block";
//     // document.getElementById("region-dialog").style.display = "block";
//     // document.getElementById("dialog-wrap").style.opacity = "1";
// }

// function closeAllRegions() {
//     // document.getElementById("dialog-wrap").style.display = "none";
//     // document.getElementById("region-dialog").style.display = "none";
//     // document.getElementById("dialog-wrap").style.opacity = "0";
//     document.querySelector('#region-list-text').innerHTML = 
// }

const openAllRegions = () => {
    let regions = document.getElementById("region-list-text").getAttribute('data-regions')
    document.getElementById("region-list-text").innerHTML = regions + '.';
    document.getElementById("region-expand-button").onclick = closeAllRegions;
    document.getElementById("region-expand-button").innerHTML = 'Zobrazit méně obvodů';
}

const closeAllRegions = () => {
    console.log('closing regions')
    let regions = document.getElementById("region-list-text").getAttribute('data-regions').split(", ");
    document.getElementById("region-list-text").innerHTML = `${regions.slice(0, 3).join(", ")}, + ${(regions.length - 3)}  dalších`;
    document.getElementById("region-expand-button").onclick = openAllRegions;
    document.getElementById("region-expand-button").innerHTML = 'Zobrazit všechny obvody';
}

function displayUpcomingElectionData(election) {
    var titleDiv = document.getElementById("election-info-title");
    var typeDiv = document.getElementById("election-info-type");
    typeDiv.innerHTML = "pro";
    var bold = document.createElement("b");
    if (isMoreThanNow(election.dates[0].from)) {
        titleDiv.innerHTML = "Volební místnosti se otevírají za";
        bold.innerHTML = election.type == "se" ? " senátní volby" : election.type == "sn" ? " volby do poslanecké sněmovny. " : "";
        setupRemainingTimeDisplay(election.dates[0].from);
    }
    else if (isMoreThanNow(election.dates[0].to)) {
        titleDiv.innerHTML = "Volební místnosti budou otevřeny ještě";
        bold.innerHTML = election.type == "se" ? " senátní volby" : election.type == "sn" ? " volby do poslanecké sněmovny. " : "";
        setupRemainingTimeDisplay(election.dates[0].to);
    }
    else if (isMoreThanNow(election.dates[1].from)) {
        titleDiv.innerHTML = "Volební místnosti se otevírají za";
        bold.innerHTML = election.type == "se" ? " 2. kolo senátních volbeb" : election.type == "sn" ? " 2. kolo voleb do poslanecké sněmovny. " : "";
        setupRemainingTimeDisplay(election.dates[1].from);
    }
    else if (isMoreThanNow(election.dates[1].to)) {
        titleDiv.innerHTML = "Volební místnosti budou otevřeny ještě";
        bold.innerHTML = election.type == "se" ? " 2. kolo senátních volbeb" : election.type == "sn" ? " 2. kolo voleb do poslanecké sněmovny. " : "";
        setupRemainingTimeDisplay(election.dates[1].to);
    }
    typeDiv.appendChild(bold);
    if (election.type == "se") {
        typeDiv.innerHTML += " v obvodech: "
        var placeDiv = document.getElementById("region-list-text");
        placeDiv.setAttribute('data-regions', election.regions.join(', '));
        closeAllRegions()
        // placeDiv.innerHTML = `${election.regions.slice(0, 3).join(", ")}, + ${(election.regions.length - 3)}  dalších`;
        // document.getElementById('region-expand-button').onClick = openAllRegions(election.regions)
    }
    else {
        document.getElementById("region-expand-button").style.display = "none";
    }
}

function setupRemainingTimeDisplay(date) {
    var millisDiff = new Date(date).getTime() - new Date().getTime();
    var days = Math.floor(millisDiff / (1000 * 60 * 60 * 24));
    var afterDaysRemainder = millisDiff % (1000 * 60 * 60 * 24);
    var hours = Math.floor(afterDaysRemainder / (1000 * 60 * 60));
    var afterHoursRemainder = afterDaysRemainder % (1000 * 60 * 60);
    var minutes = Math.ceil(afterHoursRemainder / (1000 * 60));
    displayNumber(Math.floor(days / 10), "big-day");
    displayNumber(Math.floor(days % 10), "little-day");
    displayNumber(Math.floor(hours / 10), "big-hour");
    displayNumber(Math.floor(hours % 10), "little-hour");
    displayNumber(Math.floor(minutes / 10), "big-minute");
    displayNumber(Math.floor(minutes % 10), "little-minute");
    setInterval(() => {
        refreshRemainingTimeDisplay(date);
    }, 200);
}

function refreshRemainingTimeDisplay(date) {
    var millisDiff = new Date(date).getTime() - new Date().getTime();
    var days = Math.floor(millisDiff / (1000 * 60 * 60 * 24));
    var afterDaysRemainder = millisDiff % (1000 * 60 * 60 * 24);
    var hours = Math.floor(afterDaysRemainder / (1000 * 60 * 60));
    var afterHoursRemainder = afterDaysRemainder % (1000 * 60 * 60);
    var minutes = Math.ceil(afterHoursRemainder / (1000 * 60));
    flipNumber(Math.floor(days / 10), "big-day");
    flipNumber(Math.floor(days % 10), "little-day");
    flipNumber(Math.floor(hours / 10), "big-hour");
    flipNumber(Math.floor(hours % 10), "little-hour");
    flipNumber(Math.floor(minutes / 10), "big-minute");
    flipNumber(Math.floor(minutes % 10), "little-minute");
}

function start() {
    const elections = data;
    const upcomingElection = getUpcomingElection(elections);
    // const obvodySenat = obvodySenat
    displayUpcomingElectionData(upcomingElection);
}

window.onload = function() {
    // console.log("onLoad")
    start();
    setupStyleAnimations();
    document.getElementById("main").style.opacity = "1";
    RippleManager.setUp();
}


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

