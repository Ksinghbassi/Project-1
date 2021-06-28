let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
let suites = ["Spades", "Hearts", "Diamonds", "Clovers"];
let gameOn = false;
let stay = false;
let deckOfCards = [];
let dealerCards = [];
let playerCards = [];
let dealerPoints = 0;
let playerPoints = 0;
let dealerCardsInfo = "";
let dealerCardRevealInfo = "";
let playerCardsInfo = "";
let winner= "";


let welcome_message= "";
let newGame= "";
let score= "";

let hitButton= "";
let stayButton= "";

window.onload=function(){
    document.getElementById("Start").addEventListener('click', startGame);
    document.getElementById("Hit").addEventListener('click', handleHit);
    document.getElementById("Stay").addEventListener('click', handleStay);
}

function handleHit(){
  playerCards.push(getCard());
  currentGameProgess(dealerCards, playerCards);
  CheckIfThereIsAWinner();

}

function handleStay(){
    stay = true;
    CheckIfThereIsAWinner();
}

function startGame(){
    values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    suites = ["Spades", "Hearts", "Diamonds", "Clovers"];
    gameOn = false;
    stay = false;
    deckOfCards = [];
    dealerCards = [];
    playerCards = [];
    dealerPoints = 0;
    playerPoints = 0;
    dealerCardsInfo = "";
    dealerCardRevealInfo = "";
    playerCardsInfo = "";
    winner= "";
    newGame = document.getElementById("Start")
    welcome_message = document.getElementById("welcomeMessage");
    hitButton = document.getElementById("Hit");
    stayButton = document.getElementById("Stay");
    hitButton.style.display = "inline"
    stayButton.style.display = "inline"
    createDeck();
    shuffleDeck();

    // Give each player two cards
    dealerCards = [getCard(), getCard()];
    playerCards = [getCard(), getCard()];


    // Hide new Game button
    newGame.style.display = "none";
    welcome_message.style.display = "none";
    playerPoints = 0;
    dealerPoints = 0;
    gameOn = true;
    currentGameProgess(dealerCards, playerCards);
}

function CheckIfThereIsAWinner(){
    console.log("checking if there is a winner")
    winner = ""
    if(stay === true){
        while( dealerPoints < playerPoints && playerPoints <= 21){
            dealerCards.push(getCard());
            currentGameProgess(dealerCards, playerCards);
        }
        if(dealerPoints > playerPoints && dealerPoints <= 21){
            winner = "dealer";
        }
        if(dealerPoints === playerPoints){
            winner = "tie";
        }
    }
    if(playerPoints === 21 && dealerPoints != 21){
        winner = "player";
    }
    else if(dealerPoints === 21){
        winner = "dealer";
    }
    else if(playerPoints > 21){
        winner = "dealer";
    }
    else if(dealerPoints > 21){
        winner = "player";
    }

    if(winner !== ""){
        document.getElementById("score").innerText = "Dealer hand:\n" + dealerCardRevealInfo + "\n" +
        "Dealer Score: "+ dealerPoints  + "\n\n\n" +
        "Player hand:\n" + playerCardsInfo + "\n" + 
        "Player Score: " + playerPoints  + "\n";
        welcome_message.style.display = "block";
        if(winner === "dealer"){
            welcome_message.innerText = "Winner: Dealer";
        }else if( winner === "player"){ 
            welcome_message.innerText = "Winner: Player";
        }else{
            welcome_message.innerText = "Winner: Tie";
        }
        hitButton.style.display = "none"
        stayButton.style.display = "none"
        newGame.style.display = "inline"
    }

}

function createCard(v, s){
    let card = {
        value: v,
        suit: s
    }
    return card
}

function getCard(){
    let card = deckOfCards.pop()
    console.log("After popping off card:")
    console.log(card)
    return card;
}

function createDeck(){
    // let deckOfCards = [];
    let card = "";
    for(let i = 0; i < values.length; i++){
        for(let j = 0; j < suites.length; j++){
            if(values[i] == 'J' || values[i] == 'Q' || values[i] == 'K'){
                deckOfCards.push(createCard(10, suites[j]));
            }
            else if(values[i] == 'A'){
                deckOfCards.push(createCard(11, suites[j]));
            }
            else{
                deckOfCards.push(createCard(values[i], suites[j]));
            }
        }
    }
}

function shuffleDeck(){
    // Use Swap function
    for(let i = 0; i < deckOfCards.length; i++){
        let firstCard = Math.floor(Math.random() * deckOfCards.length); 
        let secondCard = i;

        // Swap Function - Does the shuffling
        let temp = deckOfCards[firstCard]
        deckOfCards[firstCard] = deckOfCards[secondCard];
        deckOfCards[secondCard] = temp;
    }
}

function keepScore(){
    dealerCardsInfo = ""
    playerCardsInfo = ""
    dealerCardRevealInfo = ""
    dealerPoints = 0
    playerPoints = 0 
    for(let i = 0; i < dealerCards.length; i++){
        // console.log(typeof parseInt(dealerCards[i].value))
        dealerCardRevealInfo = dealerCardRevealInfo + dealerCards[i].value + " " + dealerCards[i].suit + "\n";
        dealerPoints += dealerCards[i].value;
        if(i === 0){
            dealerCardsInfo = "HIDDEN" + "\n";
        } else {
            dealerCardsInfo = dealerCardsInfo + dealerCards[i].value + " " + dealerCards[i].suit + "\n";
        }
        
    }


    for(let j = 0; j < playerCards.length; j++){
        playerCardsInfo = playerCardsInfo + playerCards[j].value + " " + playerCards[j].suit + "\n";
        playerPoints += playerCards[j].value;

    }

    console.log(`Player points are: ${playerPoints}` + " " + `Dealer Points are: ${dealerPoints}` )
}

function currentGameProgess(dealerCards, playerCards){
    if(gameOn){
        let score = document.getElementById("score");
        score.style.display = "inline";
        keepScore()
        score.innerText = "Dealer hand:\n" + dealerCardsInfo + "\n" +
        "Dealer Score: ???"  + "\n\n\n" +
        "Player hand:\n" + playerCardsInfo + "\n" + 
        "Player Score: " + playerPoints  + "\n";
    }
}
