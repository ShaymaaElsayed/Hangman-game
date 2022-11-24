//letters
const letters ="abcdefghijklmnopqrstuvwxyz";

//Get Array from letters
let lettersArray = Array.from(letters);

//Select letters container
let lettersContainer = document.querySelector(".letters");

//Generate letters
lettersArray.forEach(letter =>{
    //Create span
    let span = document.createElement("span");

    //Create letter text node
    let theLetter = document.createTextNode(letter);

    //Append the letter to span
    span.appendChild(theLetter);

    //Add class on span
    span.className = 'letter-box';

    //Append span to the letters container
    lettersContainer.appendChild(span);
});

// Object of words + Categories
const words = {
    programming: ["php", "js", "go","scala"],
    movies: ["prestig", "Inception", "Up"],
    people: ["Albert Ainstain", "Hitchcock"],
    countries: ["Syria", "Palastine", "Yemen", "Egypt"]
}

//Get Random Property
let alkeys = Object.keys(words);
// Random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * alkeys.length);
//Category
let randomPropName = alkeys[randomPropNumber];
//category words
let randomPropValue = words[randomPropName];
// Random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The chosen word
let randomValueValue = randomPropValue[randomValueNumber]; 

//Set category onfo
document.querySelector(".game-info .category span").innerHTML = randomPropName ;

// Select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

//Create span depend on word
lettersAndSpace.forEach(letter => {
    //Create empty span
    let emptySpan = document.createElement("span");
    
    // if letters is space
    if(letter === ' '){
        //Add class to the span
        emptySpan.className = 'with-space';
    }

    //Append span to the letters guess conainer
    lettersGuessContainer.appendChild(emptySpan);
});

//select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//Set Wrong Attempts
let wrongAttempts = 0;

//Select  The Draw Element
let theDraw = document.querySelector(".hangman-draw");


// Handle Clicking On Letters
document.addEventListener("click" , (e) =>{

    //Set The chose  Status
    let theStatus = false;

    if(e.target.className === 'letter-box'){
        e.target.classList.add("clicked");
        
        //Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        
        // console.log(lettersAndSpace); // The Chosen Word

        theChosenWord.forEach((wordLertter, wordIndex) => {

            //if the clicked Letter equal to one of the chosen word letter
            if(theClickedLetter == wordLertter){

                // Set status correct 
                theStatus = true;
                

                //Loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {
                    if(wordIndex === spanIndex){
                        span.innerHTML = theClickedLetter;
                    }
                    
                });
            }
        });

        

        // Outside Loop

        // If letter Is Wrong 
        if(theStatus !== true){
            endSuccessGame();

            //Increase the wrong Attempts
            wrongAttempts++;

            // Add Class Wrong on the draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            //Play Fail Sound
            document.getElementById("fail").play();

            if(wrongAttempts === 8){
                endGame();

                lettersContainer.classList.add("finished");
            
            }

        }else{
            
            //Play Success Sound
            document.getElementById("success").play();
            //endSuccessGame();
           
            
        }


        }
    
});

//End Game Function
function endGame() {

    //Create Popup Div
    let div = document.createElement("div");

    //Create text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

    //Append Text Div
    div.appendChild(divText);

    //Add class on div
    div.className = 'popup';

    //Append to the body
    document.body.appendChild(div);
}

//End SuccessGame Functuin

function endSuccessGame() {
    let succ = document.createElement("succ");

    let succText = document.createTextNode(`Congratolation, The Word Is ${randomValueValue}`);

    succ.appendChild(succText);

    succ.className = 'popupa';

    document.body.appendChild(succ);
}


