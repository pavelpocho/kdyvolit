//Sorry pokud jsem to prehazel tady

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

function displayUpcomingElectionData(election) {
    var titleDiv = document.getElementById("election-info-title");
    var typeDiv = document.getElementById("election-info-type");
    typeDiv.innerHTML = "a pro";
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

function isMoreThanNow(date) {
    return new Date(date).getTime() > new Date().getTime()
}