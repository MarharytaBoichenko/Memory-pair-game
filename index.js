import data from "./data.json" assert { type: "json" };

const startButton = document.querySelector(".instruction__button");
console.log(startButton);
const wrapper = document.querySelector(".wrapper");

//get  6  random  idexes from data
//create arr
// shuffle gamearr
const arr = [];

while (arr.length < 6) {
  const idx = Math.floor(Math.random() * 20);
  if (!arr.includes(data[idx])) {
    arr.push(data[idx]);
  }
}

const arrToGame = [...arr, ...arr].sort(function () {
  return 0.5 - Math.random();
});
// console.log(arrToGame);

// const cards = arrToGame
//   .map(
//     ({ image, id }) => `<li class="flip-card cards__item" data-id='${id}' ">
//           <div class="flipper">
//             <div class="cards__item--front">
//             </div>
//             <div class="cards__item--back">
//               <img class="cards__image" src='${image}' />
//             </div>
//           </div>
//         </li>`
//   )
//   .join("");

const createCards = () => {
  const cards = arrToGame
    .map(
      ({ image, id }) => `<li class="flip-card cards__item" data-id='${id}' ">
          <div class="flipper">
            <div class="cards__item--front">
            </div>
            <div class="cards__item--back">
              <img class="cards__image" src='${image}' />
            </div>
          </div>
        </li>`
    )
    .join("");
  wrapper.innerHTML = `<ul class="cards">${cards}</ul>`;
};

let prevCard = "";
let currentCard = "";
let openedPairs = 0;
let clickCount = 0;

startButton.addEventListener("click", createCards);

const cardsList = document.querySelector(".wrapper");
// const card = document.querySelector(".flip-card");

const openCard = (e) => {
  if (e.target.className !== "cards__item--front") {
    return;
  }
  const cardToOpen = e.target.closest(".flip-card");
  if (prevCard && currentCard) {
    return;
  }
  if (!prevCard) {
    prevCard = cardToOpen;
    prevCard.classList.add("open");
    clickCount++;
  } else {
    currentCard = cardToOpen;
    currentCard.classList.add("open");
    matchCards();
  }
};

cardsList.addEventListener("click", openCard);

const matchCards = () => {
  // console.log(" in matchCards");
  // console.log(prevCard?.dataset?.id);
  // console.log(currentCard?.dataset?.id);
  if (prevCard?.dataset?.id !== currentCard?.dataset?.id) {
    closeCards();
    // console.log(" NO pair");
  } else {
    // console.log("  pair");
    prevCard.classList.add("hidden");
    currentCard.classList.add("hidden");
    openedPairs++;
    // console.log(openedPairs);
    prevCard = "";
    currentCard = "";
    showCongrats();
  }
};

const closeCards = () => {
  setTimeout(() => {
    prevCard.classList.remove("open");
    currentCard.classList.remove("open");
    prevCard = "";
    currentCard = "";
  }, 1000);
};

const showCongrats = () => {
  setTimeout(() => {
    if (openedPairs === 6) {
      wrapper.innerHTML = `<div class="instruction__text">You have find all pairs in ${clickCount} clicks!</div>`;
    }
  }, 1000);
};

// open card on click -  click => add  to  card class  open
//open  second card on click   click => add  to  card class  open
// compare id1 === id2 ,  if !==  - close  cards   -  remove  from 2 cards class  open
// if  ===  cards are open ,  remove  class open  add class  hidden
// when  all  cards  in arr  have  class  open  - win
