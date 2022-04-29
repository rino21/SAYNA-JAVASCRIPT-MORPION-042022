// Récupération des cases à clicker
const items = document.getElementsByClassName('grid-item');
//Initialisation des cases
var cases = ["", "", "", "", "", "", "", "", ""];

//Régle des jeux
var winRule = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

var joueur="";
var robot="";
var winner="";
var youScore=0;
var cpuScore=0;
//Etat du jeux
var jeu = false;
//function qui Choisi le symbole de l'equipe
function choixEquipe(element)
{
    if(element.textContent=="X")
    {
        joueur="X";
        robot="0";
        element.parentNode.style.display="none";
        document.querySelector('.leaderboard').style.display="block";
        document.querySelector('.player-now').textContent="Joueur : "+joueur;
    }
    else
    {
        joueur="0";
        robot="X";
        element.parentNode.style.display="none";
        document.querySelector('.leaderboard').style.display="block";
        document.querySelector('.player-now').textContent="Joueur : "+joueur;

    }
}

function choiseCase(id) {
    var caseEl = document.getElementById(id);
    var indexCase = parseInt(id[(id.length)-1] - 1);

    if (caseEl.textContent == "" && !jeu) {
        caseEl.textContent = joueur;
        cases[indexCase] = joueur;
        checkWin();
        if(winner!=joueur)
        {
            remplieCaseVide();
            checkWin();
        }
           
    }

}

// Une fonction qui va verifier si le joueur  a gagné ou pas
function checkWin() {
    var win = false;
    for (let i = 0; i < winRule.length; i++) {

        if (cases[winRule[i][0]] == "" || cases[winRule[i][1]] == "" || cases[winRule[i][2]] == "") {
            continue;
        } else if (cases[winRule[i][0]] == cases[winRule[i][1]] && cases[winRule[i][1]] == cases[winRule[i][2]]) {
            winner=cases[winRule[i][0]];
            win = true;
            break;
        }
    }

    if (win) 
    {
        var resultat = document.getElementById("resultat");
        resultat.parentNode.style.display="block";
        jeu = true;
        if(winner==joueur)
        {
            resultat.textContent="Win";
            youScore++;
            document.querySelector(".you-score").textContent=youScore;
            document.querySelector(".win").textContent=youScore;

        }
        else
        {
            resultat.textContent="Defeat";
            cpuScore++;
            document.querySelector(".cpu-score").textContent=cpuScore;
            document.querySelector(".defeat").textContent=cpuScore;
        }
    }
    else if(!cases.includes(""))
    {
        var matchNul = document.querySelector('.draw');
        matchNul.parentNode.style.display="block";
    }

}




// Vide le contenu de toute les cases
function rest() {
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
        items[i].textContent = '';
    }
}


function remplieCaseVide()
{
    if(indexCaseVide()<0)
        return;
    else
    {
        let index = indexCaseVide();
        items[index].textContent = robot;
        cases[index] = robot;
    }          
}


function again(elem)
{
    elem.parentNode.style.display="none";
    rest();
    cases = ["", "", "", "", "", "", "", "", ""];
    jeu=false;
    if(joueur==winner){
        remplieCaseVide();
        document.querySelector('.player-turn').style.borderBottom="none";
        document.querySelector('.cpu-turn').style.borderBottom="4px solid #4286f4";
        winner="";
    }
    else
    {
        document.querySelector('.player-turn').style.borderBottom="4px solid #4286f4";
        document.querySelector('.cpu-turn').style.borderBottom="none";
        winner="";
    }
}


function indexCaseVide() {
    for (var i = 0; i < items.length; i++) 
    {
        if (items[i].textContent == "")
        {
            return i;
        }
    }
    return -1;
}

function reset()
{

    rest();
    cases = ["", "", "", "", "", "", "", "", ""];
    jeu=false;
    document.querySelector('.player-turn').style.borderBottom="4px solid #4286f4";
    document.querySelector('.cpu-turn').style.borderBottom="none";
    youScore=0;
    document.querySelector(".you-score").textContent=youScore;
    cpuScore=0;
    document.querySelector(".cpu-score").textContent=cpuScore;
    document.querySelector(".win").textContent=youScore;
    document.querySelector(".defeat").textContent=cpuScore;
    document.querySelector('.leaderboard').style.display="none";
    document.querySelector(".layer").style.display="block";

}