/* Koostage näite põhjal leht trips-traps-trulli mängimiseks.
   Algseis võiks olla kujul
   _________X
   st. alakriips tähistab tühja ruutu, O või X ruudus olevat sümbolit.
   Viimane (kümnes) sümbol näitab, kelle kord on käia. */

let currentGameState = "XO_OX_X__X";
const currentLayer = document.getElementById("currentLayer");
const selectionLayer = document.getElementById("selectionLayer");
const treeLayer = document.getElementById("treeLayer");

document.addEventListener("DOMContentLoaded", () => {
    displayGameState();
});

function getValidNextStates(state) {
    const player = state.slice(-1);
    const opponent = (player === "X") ? "O" : "X";
    const validNextStates = [];

    for (let space = 0; space < 9; space++) {
        if (state[space] === "_") {
            const nextState = state.slice(0, space) + player + state.slice(space + 1, 9) + opponent;

            validNextStates.push(nextState);
        }
    }

    return validNextStates;
}

function stateToString(state) {
    return state.match(/.{3}/g).join("<br>");
}

function checkForWinner(state) {
    const winningCombos = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;

        if (state[a] === state[b] && state[b] === state[c] && state[a] !== '_') {
            return state[a];
        }
    }

    return false;
}

function generateStateTree(state, isTopNode = true) {
    const winner = checkForWinner(state);
    const validNextStates = getValidNextStates(state);

    if (isTopNode) {
        return `<ul>${validNextStates.map(nextState => generateStateTree(nextState, false)).join('')}</ul>`;
    }

    if (winner) {
        return `<li>${stateToString(state)}<br>Võitis ${winner}</li>`;
    }

    if (validNextStates.length === 0) {
        return `<li>${stateToString(state)}<br>Viik</li>`;
    }

    return `<li>${stateToString(state)}<ul>${validNextStates.map(nextState => generateStateTree(nextState, false))
        .join('')}</ul></li>`;
}

function displayGameState() {
    currentLayer.innerHTML = stateToString(currentGameState);

    displayValidNextStates();
    displayStateTree();
}

function displayValidNextStates() {
    const validNextStates = getValidNextStates(currentGameState).map(nextState => {
        return `${stateToString(nextState)}<br><br><input type='button' value='Vali' data-nextstate='${nextState}' />`;
    });

    selectionLayer.innerHTML = validNextStates.join("<br><br>");

    const buttons = selectionLayer.querySelectorAll("input[type='button']");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const nextState = button.getAttribute("data-nextstate");

            selectState(nextState);
        });
    });
}

function displayStateTree() {
    treeLayer.innerHTML = generateStateTree(currentGameState);
}

function selectState(newState) {
    currentGameState = newState;

    displayGameState();
}
