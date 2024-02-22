"use strict";

const initialData = [
  {
    id: 1,
    photoName: "Dancer",
    source: "images/z_img02.jpg",
    description: "What a performance! Idylle Sur La Paix - a pure must-see",
  },
  {
    id: 2,
    photoName: "Rocks",
    source: "images/z_img03.jpg",
    description: "Oh boy this place has some feeling",
  },
  {
    id: 3,
    photoName: "Weed",
    source: "images/z_img09.jpg",
    description: "Do not disturb this dog 😴",
  },
  {
    id: 4,
    photoName: "Polution",
    source: "images/z_img05.jpg",
    description: "The air in this city is horrible",
  },
  {
    id: 5,
    photoName: "bug",
    source: "images/z_img06.jpg",
    description: "Found this little creature on my way home. How interesting!",
  },
  {
    id: 6,
    photoName: "In the clouds",
    source: "images/z_img07.jpg",
    description: "I love hiking",
  },
  {
    id: 7,
    photoName: "Park service",
    source: "images/z_img08.jpg",
    description: "My 1st photo here, hope you like it 😅",
  },
];

// Selections
const btnMain = document.querySelectorAll(".btn-main");
const btnPost = document.querySelector(".btn-post");
const form = document.querySelector(".form");
const inputName = document.querySelector(".input-name");
const inputFile = document.querySelector(".input-file");
const inputDescription = document.querySelector(".input-description");

const nameError = document.querySelector(".name-error");
const fileError = document.querySelector(".file-error");
const descriptionError = document.querySelector(".description-error");

const gallery = document.querySelector(".gallery");

// FORM TOGGLE
btnMain.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
      btn.textContent = "Close";
    } else {
      btn.textContent = "Drop your photo!";
      form.classList.add("hidden");
    }
  });
});

// ADD INITIAL DATA (demo data)
// gallery.insertAdjacentHTML("afterbegin", `<li>ahoj</li>`);

function createPost() {
  const htmlArr = initialData.map(
    (value) => `<li class="galleryPost">
<img
  class="galleryImage"
  src="${value.source}"
  alt="uploadedPhoto" />
<p class="photoName">${value.photoName}</p>
<p class="description">${value.description}</p>
</li>`
  );
  // console.log(htmlArr);
  const html = htmlArr.join("");
  gallery.insertAdjacentHTML("afterbegin", html);
}
createPost();

// UPLOAD IMAGE file

let uploadedFile = "";
inputFile.addEventListener("change", function (event) {
  const input = event.target;
  const file = input.files[0];

  const fileType = file["type"];
  const validImageTypes = ["image/jpeg", "image/png"];
  if (!validImageTypes.includes(fileType)) {
    uploadedFile = "";
  } else {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageData = e.target.result;
      uploadedFile = imageData;
    };
    // console.log(uploadedFile);
    reader.readAsDataURL(file);
  }
});

// HANDLE SUBMIT BUTTON AND DATA

btnPost.addEventListener("click", function (event) {
  event.preventDefault();

  // reset errors

  nameError.textContent = "";
  fileError.textContent = "";
  descriptionError.textContent = "";

  // store data

  const enteredName = inputName.value;
  const file = uploadedFile;
  const enteredDescription = inputDescription.value;

  const nameLength = enteredName.length >= 3 && enteredName.length <= 15;
  const descriptionLength =
    enteredDescription.length >= 3 && enteredDescription.length <= 20;

  const newId = initialData.length + 1;

  //  CHECK DATA VALIDATION AND UPLOAD

  if (
    enteredName &&
    file &&
    enteredDescription &&
    nameLength &&
    descriptionLength
  ) {
    gallery.innerHTML = "";
    initialData.push({
      id: newId,
      photoName: enteredName,
      source: file,
      description: enteredDescription,
    });
    createPost();

    // CLEAR INPUTS AND RESET FORM

    inputName.value = "";
    inputFile.value = "";
    uploadedFile = "";
    inputDescription.value = "";
    // console.log(initialData);

    btnMain.forEach((btn) => {
      btn.textContent = "Drop your photo!";
    });
    form.classList.add("hidden");
  }

  // CHECK FOR ERRORS

  if (file === "") {
    fileError.textContent = "Please select JPG or PNG file";
  }
  if (!nameLength) {
    nameError.textContent = "Title must be between 3 and 15 characters long";
  }
  if (!descriptionLength) {
    descriptionError.textContent =
      "Description must be between 3 and 20 characters long";
  }
});

// HAMBURGER MENU

const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});
