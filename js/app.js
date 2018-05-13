/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //Select all elements with the class .cards
 let card = document.getElementsByClassName("card");
 let cards = [...card];

 //Select deck
 const deck = document.getElementById('card-deck');

 //Select moves span and set initial value to the declared variable
 let moves = 0;
 let counter = document.querySelector('.moves');

 //Select stars
 const stars = document.querySelectorAll('.fa-star');
 let starsList = document.querySelectorAll('.stars li');

//Select matchedCards, when the attribute will be added dynamically
 let matchedCard = document.getElementByClassName('match');

 //Create an empty array for opened cards
 var openedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

document.body.onload = startGame();


function startGame(){
  //Shuffle deck using a function above
  cards = shuffle(cards);

  //Clear each card from existing classes
  for(var i = 0; i < cards.length; i++){
    deck.innerHTML = "";
    [].forEach.call(cards, function(item){
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }

  //Reset Moves
  moves = 0;
  counter.innerHTML = moves;

  //Reset stars attribution
  for(var i = 0; i < stars.lenght; i++){
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }

  //Reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}


//Create a function toggling the classes from .css template and store it in a variable displayCard

var  displayCard = function(){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}


//Add opened cards to OpenedCards list with push() method, checking whether they math or not

function cardOpen(){
  openedCards.push(this);
  var len = openedCards.length;
  if(len === 2){
    moveCounter();
    if(openedCards[0].type === openedCards[1].type){
      matched();
    } else {
      unmatched();
    }
  }
}


function matched(){
  openedCards[0].classList.add('match', 'disabled');
  openedCards[1].classList.add('match', 'disabled');
  openedCards[0].classList.remove('show', 'open', 'no-event');
  openedCards[1].classList.remove('show', 'open', 'no-event');
  openedCards = [];
}

function unmatched(){
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
    openedCards[1].classList.remove('show', 'open', 'no-event,' 'unmatched');
    enable();
    openedCards = [];
  }, 1100);
}


function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add('disabled');
    }
  });
}

//Gives the number of stars according to the result

function moveCounter(){
  moves++
  counter.innerHTML = moves;

  //Start timer at first click
  if(moves == 1){
    second = 0;
    minute =0;
    hour =0;
    startTimer();
  }

  //Set rates based on moves
  if(moves > 8 && moves < 12){
    for(i = 0; i < 3; i++){
      if(i > 1){
        stars[i].style.visibility = 'collapse';
      }
    }
  }

  else if (moves > 13){
    for(i = 0; i < 3; i++){
      if(i > 0){
        stars[i].style.visibility = 'collapse';
      }
    }
  }
}

//Create start
var second = 0;
var minute = 0;
var hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if(second == 60){
      minute++;
      second=0;
    }
    if(minute == 60){
      hour++;
      minute = 0;
    }
  }, 1000);
}



//Add event listeners to all elements with .card class in a loop

 for(var i = 0; i < cards.length; i++){
   card = cards[i];
   card.addEventListener("click", displayCard);
   card.addEventListener("click", cardOpen);
   card.addEventListener("click", congratulations);
 };

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
