document.addEventListener('DOMContentLoaded', () => {
    loadPlayers();
    renderPlayers();
});

let players = JSON.parse(localStorage.getItem('players')) || [];
let sortAscending = true;

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName) {
        players.push({ name: playerName, score: 0 });
        savePlayers();
        renderPlayers();
        document.getElementById('playerName').value = '';
    }
}

function removePlayer(index) {
    showModal(`Are you sure you want to remove player "${players[index].name}"?`, () => {
        players.splice(index, 1);
        savePlayers();
        renderPlayers();
    });
}

function updateScore(index, delta) {
    players[index].score += delta;
    savePlayers();
    renderPlayers();
}

function resetScores() {
    showModal('Are you sure you want to reset all scores?', () => {
        players.forEach(player => player.score = 0);
        savePlayers();
        renderPlayers();
    });
}

function deleteAll() {
    showModal('Are you sure you want to delete all players and scores?', () => {
        players = [];
        savePlayers();
        renderPlayers();
    });
}

function toggleSort() {
    sortAscending = !sortAscending;
    document.getElementById('sortButton').textContent = `Sort Scores: ${sortAscending ? 'Ascending' : 'Descending'}`;
    sortPlayers();
}

function sortPlayers() {
    players.sort((a, b) => sortAscending ? a.score - b.score : b.score - a.score);
    renderPlayers();
}

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

function loadPlayers() {
    players = JSON.parse(localStorage.getItem('players')) || [];
}

function renderPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';

    players.forEach((player, index) => {
        const playerItem = document.createElement('li');
        playerItem.className = 'list-group-item';

        const playerInfo = document.createElement('div');
        playerInfo.className = 'd-flex justify-content-between align-items-center flex-wrap';
        playerInfo.innerHTML = `<div><strong>${player.name}</strong> - Score: ${player.score}</div>`;

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'mt-2 mt-md-0 player-buttons';

        const subtractFiveButton = createButton('-5', () => updateScore(index, -5), 'btn-danger');
        const subtractButton = createButton('-1', () => updateScore(index, -1), 'btn-danger ml-2');
        const addButton = createButton('+1', () => updateScore(index, 1), 'btn-success ml-2');
        const addFiveButton = createButton('+5', () => updateScore(index, 5), 'btn-success ml-2');
        const editButton = createIconButton('bi-pencil', () => openEditModal(index), 'btn-secondary ml-2');
        const removeButton = createIconButton('bi-trash', () => removePlayer(index), 'btn-primary ml-2');

        buttonGroup.appendChild(subtractFiveButton);
        buttonGroup.appendChild(subtractButton);
        buttonGroup.appendChild(addButton);
        buttonGroup.appendChild(addFiveButton);
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(removeButton);

        playerInfo.appendChild(buttonGroup);
        playerItem.appendChild(playerInfo);
        playerList.appendChild(playerItem);
    });
}

function openEditModal(index) {
    const player = players[index];
    const editPlayerNameInput = document.getElementById('editPlayerNameInput');
    editPlayerNameInput.value = player.name;

    const savePlayerNameButton = document.getElementById('savePlayerNameButton');
    savePlayerNameButton.onclick = () => {
        const newName = editPlayerNameInput.value.trim();
        if (newName) {
            players[index].name = newName;
            savePlayers();
            renderPlayers();
            $('#editPlayerModal').modal('hide');
        }
    };

    $('#editPlayerModal').modal('show');
}

function createButton(text, onClick, className) {
    const button = document.createElement('button');
    button.className = `btn ${className} btn-sm ml-2`;
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

function createIconButton(iconClass, onClick, className) {
    const button = document.createElement('button');
    button.className = `btn ${className} btn-sm ml-2`;
    button.innerHTML = `<i class="bi ${iconClass}"></i>`;
    button.onclick = onClick;
    return button;
}

function showModal(message, callback) {
    const modalBody = document.getElementById('confirmationModalBody');
    modalBody.textContent = message;
    $('#confirmationModal').modal('show');
    confirmCallback = callback;
}

document.getElementById('confirmButton').onclick = () => {
    if (confirmCallback) confirmCallback();
    $('#confirmationModal').modal('hide');
};
