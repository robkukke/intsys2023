/* Koostage näite põhjal leht trips-traps-trulli mängimiseks.
   Algseis võiks olla kujul
   _________X
   st. alakriips tähistab tühja ruutu, O või X ruudus olevat sümbolit.
   Viimane (kümnes) sümbol näitab, kelle kord on käia. */

let currentGameState = "XO_O_OXO_X";
const currentLayer = document.getElementById("currentLayer");
const selectionLayer = document.getElementById("selectionLayer");

document.addEventListener("DOMContentLoaded", () => {
    displayGameState();
});

function getValidNextStates(state) {
    const player = state.slice(-1);
    const opponent = (player === "X") ? "O" : "X";
    const validNextStates = [];

    for (let space = 0; space < 9; space++) {
        if (state[space] === "_") {
            const nextState = `${state.slice(0, space)}${player}${state.slice(space + 1, 9)}${opponent}`;

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

function generateStateTree(state) {
    const winner = checkForWinner(state);
    const validNextStates = getValidNextStates(state);

    if (winner) {
        return winner === "X" ? 1 : -1;
    }

    if (validNextStates.length > 0) {
        const ratings = validNextStates.map(nextState => generateStateTree(nextState));
        return state[9] === "X" ? Math.max(...ratings) : Math.min(...ratings);
    }

    return 0;
}

function displayGameState() {
    currentLayer.innerHTML = stateToString(currentGameState);

    displayValidNextStates();
}

function displayValidNextStates() {
    const validNextStates = getValidNextStates(currentGameState).map(nextState => ({
        state: nextState, rating: generateStateTree(nextState)
    }));

    validNextStates.sort((state1, state2) => state1.rating - state2.rating);

    selectionLayer.innerHTML = validNextStates
        .map(nextState => `<br><br>${stateToString(nextState.state)}<br>Hinnang: ${nextState.rating}
            <br><br><input type='button' value='Vali' data-nextstate="${nextState.state}" />`)
        .join("<br><br");

    const buttons = selectionLayer.querySelectorAll("input[type='button']");

    buttons.forEach(button => {
        button.addEventListener("click", () => selectState(button.getAttribute("data-nextstate")));
    });
}

function selectState(newState) {
    currentGameState = newState;

    displayGameState();
}
