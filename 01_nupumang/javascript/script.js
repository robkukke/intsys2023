let initialState = "3N";
let currentState = initialState;
const boardLength = 7;
const allowedMoves = [1, 2];
const currentLayer = document.getElementById("currentLayer");
const selectionLayer = document.getElementById("selectionLayer");

document.addEventListener("DOMContentLoaded", () => {
    displayStates();
});

function getSubStates(state) {
    const player = state.slice(-1);
    const space = parseInt(state.slice(0, -1));
    const opponent = (player === "X") ? "N" : "X";

    return allowedMoves
        .map(move => move + space)
        .filter(space => space <= boardLength)
        .map(space => space + opponent);
}

function stateToString(state) {
    const player = state.slice(-1);
    const space = parseInt(state.slice(0, -1));
    const underscores = Array(boardLength).fill("_");

    underscores[space - 1] = player;

    return underscores.join(" ");
}

function displayStates() {
    currentLayer.innerText = stateToString(currentState);

    displaySubStates();
}

function displaySubStates() {
    const subStates = getSubStates(currentState).map(subState => {
        const subStateString = stateToString(subState);

        return `${subStateString} <input type='button' value='Vali' data-substate='${subState}' />`;
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
