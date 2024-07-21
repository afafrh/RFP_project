const dropZone1 = document.getElementById("drop-zone1");
const dropZone2 = document.getElementById("drop-zone2");
const fileInput1 = document.getElementById("file-input1");
const fileInput2 = document.getElementById("file-input2");
const descriptionInput = document.getElementById("file-description");
const fileLabel1 = document.getElementById("file-label1");
const fileLabel2 = document.getElementById("file-label2");
const serverResponseInput = document.getElementById("server-response");

let file1;
let file2;

// Function to handle file selection or drop
const handleFileSelection = (inputElement, file, fileLabel) => {
  if (file) {
    if (inputElement === fileInput1) {
      file1 = file;
    } else if (inputElement === fileInput2) {
      file2 = file;
    }
    fileLabel.textContent = file.name;
    fileLabel.style.display = "inline";
    console.log("File received:", file.name);
    console.log("Type:", file.type);
    console.log("Size:", file.size, "bytes");
  } else {
    console.log("No file received.");
  }
};

// Function to handle drop events
const handleDropEvent = (event, inputElement, dropZoneElement, fileLabel) => {
  event.preventDefault();
  dropZoneElement.classList.remove("dragover");
  const file = event.dataTransfer.files[0];
  handleFileSelection(inputElement, file, fileLabel);
};

// Add drag-and-drop event listeners
const addDragAndDropListeners = (dropZoneElement, inputElement, fileLabel) => {
  dropZoneElement.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZoneElement.classList.add("dragover");
  });

  dropZoneElement.addEventListener("dragleave", (event) => {
    event.preventDefault();
    dropZoneElement.classList.remove("dragover");
  });

  dropZoneElement.addEventListener("drop", (event) => {
    handleDropEvent(event, inputElement, dropZoneElement, fileLabel);
  });

  dropZoneElement.addEventListener("click", () => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (event) => {
    const file = event.target.files[0];
    handleFileSelection(inputElement, file, fileLabel);
  });
};

addDragAndDropListeners(dropZone1, fileInput1, fileLabel1);
addDragAndDropListeners(dropZone2, fileInput2, fileLabel2);

// Function to validate file selection
function validateFiles() {
  let isValid = true;

  if (!file1) {
    dropZone1.style.border = "2px solid red";
    document.getElementById("error-message1").textContent =
      "Please select a file.";
    isValid = false;
  }

  if (!file2) {
    dropZone2.style.border = "2px solid red";
    document.getElementById("error-message2").textContent =
      "Please select a product documentation.";
    isValid = false;
  }

  return isValid;
}

function fetchFiles() {
  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);
  const description = descriptionInput.value;
  formData.append("description", description);

  fetch("http://127.0.0.1:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      serverResponseInput.value = data.message;
    })
    .catch((error) => {
      console.error("Error:", error);
      serverResponseInput.value = `Error: ${error.message}`;
    });
}

document.getElementById("button").addEventListener("click", (event) => {
  event.preventDefault();
  if (validateFiles()) {
    fetchFiles();
  }
});
