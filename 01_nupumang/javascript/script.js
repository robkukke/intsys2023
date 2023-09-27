let currentGameState = "3N";
const boardLength = 7;
const allowedMoves = [1, 2];
const currentLayer = document.getElementById("currentLayer");
const selectionLayer = document.getElementById("selectionLayer");
const treeLayer = document.getElementById("treeLayer");

document.addEventListener("DOMContentLoaded", () => {
    displayGameState();
});

function getPlayerAndSpace(state) {
    const player = state.slice(-1);
    const space = parseInt(state.slice(0, -1));

    return {player, space};
}

function getValidNextStates(state) {
    const {player, space} = getPlayerAndSpace(state);
    const opponent = (player === "X") ? "N" : "X";

    return allowedMoves
        .map(move => move + space)
        .filter(space => space <= boardLength)
        .map(space => space + opponent);
}

function stateToString(state) {
    const {player, space} = getPlayerAndSpace(state);
    const underscores = Array(boardLength).fill("_");

    underscores[space - 1] = player;

    return underscores.join(" ");
}

function generateStateTree(state) {
    const validNextStates = getValidNextStates(state);

    return `<ul>${validNextStates.map(
        nextState => `<li>${stateToString(nextState)}${generateStateTree(nextState)}</li>`).join("\n")}</ul>`;
}

function displayGameState() {
    currentLayer.innerText = stateToString(currentGameState);

    displayValidNextStates();
    displayStateTree();
}

function displayValidNextStates() {
    const validNextStates = getValidNextStates(currentGameState).map(nextState => {
        return `${stateToString(nextState)}<input type='button' value='Vali' data-nextstate='${nextState}' />`;
    });

    selectionLayer.innerHTML = validNextStates.join("<br><br>");

    const buttons = selectionLayer.querySelectorAll("input[type='button']");

    buttons.forEach(button => {
        button.addEventListener("click", () => selectState(button.getAttribute("data-nextstate")));
    });
}

function displayStateTree() {
    treeLayer.innerHTML = generateStateTree(currentGameState);
}

function selectState(newState) {
    currentGameState = newState;

    displayGameState();
}
