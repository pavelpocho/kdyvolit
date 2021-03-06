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

function getUpcomingElection(elections) {
    var upcomingElection = null;
    for (var i = 0; i < elections.length; i++) {
        if (isMoreThanNow(elections[i].dates[elections[i].dates.length-1].to)) {
            upcomingElection = elections[i];
            break;
        }
    }
    return upcomingElection;
}

const openAllRegions = () => {
    let regions = document.getElementById("region-list-text").getAttribute('data-regions');
    document.getElementById("region-list-text").innerHTML = regions + '.';
    document.getElementById("region-expand-button").onclick = closeAllRegions;
    document.getElementById("region-expand-button").querySelector("p").innerHTML = 'Zobrazit méně obvodů';
}

const closeAllRegions = () => {
    let regions = document.getElementById("region-list-text").getAttribute('data-regions').split(", ");
    document.getElementById("region-list-text").innerHTML = `${regions.slice(0, 3).join(", ")}, + ${(regions.length - 3)}  dalších`;
    document.getElementById("region-expand-button").onclick = openAllRegions;
    document.getElementById("region-expand-button").querySelector("p").innerHTML = 'Zobrazit všechny obvody';
}

const translateTypes = {
    se: "Senátní volby",
    sn: 'Volby do poslanecké sněmovny'
}

const submitObec = () => {
    let obec = document.getElementById('myInput').value;
    let region = listOfTownsAndRegions.find(item => item.obec == obec);
    let p = document.getElementById('obec-result');
    // console.log(getUpcomingElection(elections).regions, region, bool)
    if (region == undefined) {
        p.innerHTML = `Zadaná vesnice neexistuje.`;
        p.style.color = 'var(--warning-red)'
    } else {
        let volby = elections.filter(el => (el.type == 'se' && el.regionsWithNumbers.find(reg => reg.number == region.obvod)) || el.type != 'se');
        console.log(volby, region, elections)
        let string = volby.map(el => {
            `<li>${translateTypes[el.type]} ${el.dates[0].from}</li>`
        })
        let bool = getUpcomingElection(elections).regionsWithNumbers.find(reg => reg.number == region.obvod);
        p.innerHTML = `Obec ${obec} se nachází ve volebním obvodě ${region.obvodName}. Nadcházející senátní volby se Vás ${!bool ? 'ne' : ''}týkají. ${string}`;
        p.style.color = 'black';

    }
}

let listOfTownsAndRegions;
let elections;
function start() {
    elections = data;
    const upcomingElection = getUpcomingElection(elections);
    listOfTownsAndRegions = JSON.parse(obvodySenat);
    displayUpcomingElectionData(upcomingElection);
    autocomplete(document.getElementById('myInput'), listOfTownsAndRegions.map(obj => obj.obec));
}

window.onload = function () {
    // console.log("onLoad")
    start();
    setupStyleAnimations();
    document.getElementById("main").style.opacity = "1";
    RippleManager.setUp();
}


const emailAlreadyExistsQuote = 'Zadaná emailová adresa je již zaregistrovaná. Pokud se chcete odhlásit od upozornění, klikněte <a href="https://kdyvolit.cz/unsubscribe.html">zde</a>.';
const invalidEmailQuote = "Zadaná adresa není platná. Zadejte prosím platnou emailovou adresu."
const otherErrorQuote = "Neočekávaná chyba. Zkuste to prosím znovu.";
const successQuote = "Úspěšně jste se přihlásili k odběru";
const loadingQuote = "Čekejte prosím ...";
const submitEmail = () => {
    let email = document.getElementById('email-input').value;
    let p = document.getElementById('email-result')

    let obec = document.getElementById('myInput').value;
    let region = listOfTownsAndRegions.find(item => item.obec == obec);
    let volby = obec ? elections.filter(el => (el.type == 'se' && el.regionsWithNumbers.find(reg => reg.number == region.obvod)) || el.type != 'se') : elections;
    volby = volby.map(election => election.code)
    if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) {
        p.style.color = 'var(--warning-red)'
        p.innerHTML = invalidEmailQuote;
        return
    } else {
        p.style.color = 'var(--title-off-black)';
        p.innerHTML = loadingQuote;
        firebase.functions().httpsCallable('addEmail')({ email: email, elections: volby }).then(res => {
            if (res.data.data.error) {
                p.style.color = 'var(--warning-red)'
                p.innerHTML = res.data.errorCode == 1 ? invalidEmailQuote : emailAlreadyExistsQuote;
            } else {
                p.style.color = 'var(--title-off-black)';
                p.innerHTML = successQuote;
            }
        }).catch(err => {
            p.style.color = 'var(--warning-red)'
            p.innerHTML = otherErrorQuote;
        });
    }
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

