import {uniqueCardsAmount } from "./cards.js";
import { restartModalWindowHandler } from "./restartGame.js";
let pairsFound = 0;

export function appendFlipCardsHandler(){
    const cardsSection = document.querySelector('.cards-section');
    let firstCardIsFlipping = false;
    let firstFlippedCard, secondFlippedCard = null;
    cardsSection.addEventListener('click', function(event){
        const clickedCard = event.target.closest('.card-container');
        clickedCard.classList.add('flipped');
        if(!firstCardIsFlipping){
            firstCardIsFlipping = true;
            firstFlippedCard = clickedCard;
        }else if(firstFlippedCard !== clickedCard){
            firstCardIsFlipping = false;
            secondFlippedCard = clickedCard;
            checkIfCardsMatch(firstFlippedCard, secondFlippedCard);        
        }
    });   
}

function checkIfCardsMatch(firstCard, secondCard){
    if(firstCard.dataset.cat_color === secondCard.dataset.cat_color
        && firstCard.id !== secondCard.id){
            pairsFound += 1;
            checkIfAllPairsMatched(uniqueCardsAmount, pairsFound);
            setTimeout(() => {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
            }, 600);
    }else{
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 600);
    }
}

function checkIfAllPairsMatched(uniqueCardsAmount, matchedCardsAmount){
    if(uniqueCardsAmount === matchedCardsAmount){
        pairsFound = 0;
        setTimeout(()=> restartModalWindowHandler(), 600);     
    }
}