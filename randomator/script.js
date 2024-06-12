document.addEventListener('DOMContentLoaded', () => {
    const optionsList = document.getElementById('options-list');
    const addOptionButton = document.getElementById('add-option');
    const chooseRandomButton = document.getElementById('choose-random');
    const messageDiv = document.getElementById('message');

    setRandomBackgroundImage();

    addOptionButton.addEventListener('click', addOption);

    chooseRandomButton.addEventListener('click', () => {
        const options = Array.from(optionsList.getElementsByTagName('input')).map(input => input.value.trim());
        const filledOptions = options.filter(value => value !== '');

        if (options.length < 2) {
            showMessage('You must have at least two options.', 'danger');
            return;
        }

        if (filledOptions.length < 2) {
            showMessage('You must fill at least two options.', 'danger');
            return;
        }

        const randomOption = filledOptions[Math.floor(Math.random() * filledOptions.length)];
        showMessage(`Randomly selected: ${randomOption}`, 'success');
    });

    checkEmptyState();
});

function addOption() {
    const optionsList = document.getElementById('options-list');
    const emptyState = optionsList.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    const newOption = document.createElement('li');
    newOption.className = 'list-group-item';
    const optionCount = optionsList.children.length + 1;
    newOption.innerHTML = `<input type="text" class="form-control" placeholder="Option ${optionCount}">
                           <button onclick="removeOption(this)">×</button>`;
    optionsList.appendChild(newOption);
    checkEmptyState();
    updatePlaceholders();
}

function removeOption(button) {
    button.parentElement.remove();
    checkEmptyState();
    updatePlaceholders();
}

function checkEmptyState() {
    const optionsList = document.getElementById('options-list');
    if (optionsList.children.length === 0) {
        const emptyState = document.createElement('li');
        emptyState.className = 'list-group-item empty-state';
        emptyState.textContent = 'Add some options to get started!';
        optionsList.appendChild(emptyState);
    }
}

function updatePlaceholders() {
    const optionsList = document.getElementById('options-list');
    const inputs = optionsList.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].placeholder = `Option ${i + 1}`;
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
}

function setRandomBackgroundImage() {
    const imagesCount = 13; // Adjust this count based on the number of images you have
    const randomImageIndex = Math.floor(Math.random() * imagesCount) + 1;
    document.body.style.backgroundImage = `url('img/${randomImageIndex}.png')`;
}
