const dropZone1 = document.getElementById('drop-zone1');
const dropZone2 = document.getElementById('drop-zone2');
const fileInput1 = document.getElementById('file-input1');
const fileInput2 = document.getElementById('file-input2');
const descriptionInput = document.getElementById('file-description');

let file1;
let file2;

// Function to handle file selection or drop
const handleFileSelection = (inputElement, file) => {
    if (file) {
        if (inputElement === fileInput1) {
            file1 = file;
        } else if (inputElement === fileInput2) {
            file2 = file;
        }
        // Update the UI to show file name and icon
        const fileLabel = inputElement.nextElementSibling;
        fileLabel.textContent = file.name;
        fileLabel.style.display = 'inline';
        console.log('Fichier reçu:', file.name);
        console.log('Type:', file.type);
        console.log('Taille:', file.size, 'octets');
    } else {
        console.log('Aucun fichier reçu.');
    }
};

// Function to handle drop event
const handleDropEvent = (event, inputElement, dropZoneElement) => {
    event.preventDefault();
    dropZoneElement.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    handleFileSelection(inputElement, file);
};

// Add event listeners for drag and drop
const addDragAndDropListeners = (dropZoneElement, inputElement) => {
    dropZoneElement.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZoneElement.classList.add('dragover');
    });

    dropZoneElement.addEventListener('dragleave', (event) => {
        event.preventDefault();
        dropZoneElement.classList.remove('dragover');
    });

    dropZoneElement.addEventListener('drop', (event) => {
        handleDropEvent(event, inputElement, dropZoneElement);
    });

    dropZoneElement.addEventListener('click', () => {
        inputElement.click();
    });

    inputElement.addEventListener('change', (event) => {
        const file = event.target.files[0];
        handleFileSelection(inputElement, file);
    });
};

addDragAndDropListeners(dropZone1, fileInput1);
addDragAndDropListeners(dropZone2, fileInput2);

const fetchFiles = () => {
    const formData = new FormData();
    if (file1) {
        formData.append('file1', file1);
    }
    if (file2) {
        formData.append('file2', file2);
    }
    const description = descriptionInput.value;
    formData.append('description', description);  // Corrected key

    fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};
