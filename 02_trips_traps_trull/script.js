/* Koostage näite põhjal leht trips-traps-trulli mängimiseks.
   Algseis võiks olla kujul
   _________X
   st. alakriips tähistab tühja ruutu, O või X ruudus olevat sümbolit.
   Viimane (kümnes) sümbol näitab, kelle kord on käia. */

let initialState = "_________X";
let currentState = initialState;
const currentLayer = document.getElementById("currentLayer");
const selectionLayer = document.getElementById("selectionLayer");

document.addEventListener("DOMContentLoaded", () => {
    displayStates();
});

function getSubStates(state) {
    const player = state.slice(-1);
    const opponent = (player === "X") ? "O" : "X";
    const subStates = [];

    for (let space = 0; space < 9; space++) {
        if (state[space] === "_") {
            const subState = state.slice(0, space) + player + state.slice(space + 1, 9) + opponent;

            subStates.push(subState);
        }
    }

    return subStates;
}

function stateToString(state) {
    return state.match(/.{3}/g).join("<br>");
}

function displayStates() {
    currentLayer.innerHTML = stateToString(currentState);

    displaySubStates();
}

function displaySubStates() {
    const subStates = getSubStates(currentState).map(subState => {
        return `${stateToString(subState)} <br><br> <input type='button' value='Vali' data-substate='${subState}' />`;
    });

    selectionLayer.innerHTML = subStates.join("<br><br>");

    const buttons = selectionLayer.querySelectorAll("input[type='button']");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const subState = button.getAttribute("data-substate");

            selectState(subState);
        });
    });
}

function selectState(newState) {
    currentState = newState;

    displayStates();
}
