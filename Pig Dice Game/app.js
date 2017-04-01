/*
 Author: Miguel Rodriguez
 Date: 3/31/2017
 Language: JavaScript
 Description: This Javascript game shows the concept of DOM or Document Object Model manipulation
*/

/*
GAME RULES:

- The game is composed of two players which alternate on turns
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.
- BUT, if the player rolls a one, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game. NOTE: GLOBAL score is under the player's name


*/

//Global Variables
var scores, roundScore, activePlayer, gamePlaying;

//Initializes everything to zero
init();


//Ononymous function
//callback function - Event calls the function
document.querySelector('.btn-roll').addEventListener('click', function(){

	//if makes sure that the game is playing
	if(gamePlaying){

		//1. Generates a random Number and stores it in variable dice
	    var dice = Math.floor(Math.random() * 6) + 1;

	    //display
	    var diceDOM = document.querySelector('.dice');
	    diceDOM.style.display = 'block';
	    diceDOM.src = 'dice-' + dice + '.png';


	    //update the round score IF the rolled number was not a 1
	    if(dice !== 1){

	    	//add score
	    	roundScore += dice;
	    	document.querySelector('#current-' + activePlayer).textContent = roundScore;


	    }else{

	    	//Changes the activePlayer
	    	nextPlayer();
	    	
	    }//ends else

	}//ends if gamePlaying

	

});//ends function

//Ononymous function again
document.querySelector('.btn-hold').addEventListener('click', function(){

    //makes sure that the game is playing
	if(gamePlaying){

	  //add current score to global score
	  scores[activePlayer] += roundScore;

	  //update the User Interface(UI)
	  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	  

	  //check if player won the game
	  if(scores[activePlayer] >= 100){

        //Changes the name of the player to "Winner!" using DOM or Document Object Model
	  	document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

	  	//hides the dice image
	  	document.querySelector('.dice').style.display = 'none';

	  	//gets rid of the active and replaces it with winner
	  	document.querySelector('.player-'+ activePlayer+ '-panel').classList.add('winner');
	  	document.querySelector('.player-'+ activePlayer+ '-panel').classList.remove('active');

        //If player wins make sure to set the state variable to false
        //so game is not playing, hence code does not get executed
	  	gamePlaying = false;

	  }else{

	  	//changes the player's turn
	  	nextPlayer();

	  }//ends else


	}//ends gamePlaying if
  

});//ends function

//DRY Principle - Use functions to not create redundancy
//dont repeat yourself principle
function nextPlayer(){

	    //next player
    	//(if activePlayer === 1){
    	// 	activePlayer =1;
    	// }else{
    	// 	activePlayer =0;
    	// }
    	//ternary operator //same thing as above
    	activePlayer === 0 ? activePlayer =1 : activePlayer = 0;
    	roundScore =0;
    	
        //set the current-0 and current-1 equals to 0
    	document.getElementById('current-0').textContent = '0';
    	document.getElementById('current-1').textContent = '0';

 		//set either one to active, activePlayer alternates
    	document.querySelector('.player-0-panel').classList.toggle('active');
    	document.querySelector('.player-1-panel').classList.toggle('active');

    	//hide the dice image at the beginning of the game
    	document.querySelector('.dice').style.display = 'none';


}//ends nextPlayer function

//creates an action listener that responds to a click event 
//and it has a callback function which is call init() - Initializes everything
document.querySelector('.btn-new').addEventListener('click', init);

//DRY principle
function init(){


    //Initializes local variables to zero
	scores = [0,0]; 
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	//hides the dice on initialization
	document.querySelector('.dice').style.display = 'none';

	//sets every field to zero
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

 	
 	//sets the name to player 1 or Player 2 depending on the naming
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	//Remove any winners
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	//removes any active players
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	//sets player one to active
	document.querySelector('.player-0-panel').classList.add('active');


}//ends function init()













