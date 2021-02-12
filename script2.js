"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

const Student = {
  firstname: "",
  lastname: "",
  middlename: "",
  nickname: "",
  gender: "",
  house: "",
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
  console.log("loaded");
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    const oneStudent = Object.create(Student);

    // TODO: Create new object with cleaned data - and store that in the allStudents array

    const firstSpace = jsonObject.fullname.trim().indexOf(" ");
    const lastSpace = jsonObject.fullname.trim().lastIndexOf(" ");

    //del string over ved mellemrummen
    // adskil det fulde navn til for, mellem, efternavn
    oneStudent.firstName = jsonObject.fullname.trim().substring(0, firstSpace);
    oneStudent.middleName = jsonObject.fullname.substring(
      firstSpace,
      lastSpace
    );

    if (oneStudent.middleName.includes('"')) {
      oneStudent.nickName = oneStudent.middleName;
      oneStudent.middleName = "";
    }
    oneStudent.lastName = jsonObject.fullname
      .trim()
      .substring(lastSpace)
      .trim();

    // gør første stort og resten småt
    oneStudent.firstNameCapitalized =
      oneStudent.firstName.substring(0, 1).toUpperCase() +
      oneStudent.firstName.substring(1, firstSpace).toLowerCase();
    oneStudent.middleNameCapitalized =
      oneStudent.middleName.substring(0, 1).toUpperCase() +
      oneStudent.middleName
        .substring(1, oneStudent.middleName.length)
        .toLowerCase();
    oneStudent.lastNameCapitalized =
      oneStudent.lastName.substring(0, 1).toUpperCase() +
      oneStudent.lastName.substring(1).toLowerCase(oneStudent.lastName.length);
    oneStudent.nickNameCapitalized =
      oneStudent.middleName.substring(0, 1).toUpperCase() +
      oneStudent.middleName
        .substring(1)
        .toLowerCase(oneStudent.middleName.length);

    // GENDER
    oneStudent.gender = jsonObject.gender.substring(0).trim();
    oneStudent.genderCapitalized =
      oneStudent.gender.substring(0, 1).toUpperCase() +
      oneStudent.gender.substring(1).toLowerCase();

    // HOUSE
    oneStudent.house = jsonObject.house.substring(0).trim();
    oneStudent.houseCapitalized =
      oneStudent.house.substring(0, 1).toUpperCase() +
      oneStudent.house.substring(1).toLowerCase();

    //INDSÆT I PROTOTYPE -> ARRAYET
    oneStudent.firstName = oneStudent.firstNameCapitalized;
    oneStudent.middleName = oneStudent.middleNameCapitalized;
    oneStudent.lastName = oneStudent.lastNameCapitalized;
    oneStudent.nickName = oneStudent.nickNameCapitalized;
    oneStudent.gender = oneStudent.genderCapitalized;
    oneStudent.house = oneStudent.houseCapitalized;
    allStudents.push(oneStudent);
    console.log(oneStudent);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const klon = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // set clone data

  klon.querySelector("[data-field=firstname]").textContent = student.firstName;
  klon.querySelector("[data-field=middlename]").textContent =
    student.middleName;
  klon.querySelector("[data-field=lastname]").textContent = student.lastName;
  klon.querySelector("[data-field=nickname]").textContent = student.nickName;
  klon.querySelector("[data-field=gender]").textContent = student.gender;
  klon.querySelector("[data-field=house]").textContent = student.house;
  klon.querySelector("img").src = `/images/${
    student.lastName
  }_${student.firstName.charAt(0)}.png`;

  // append clone to list
  document.querySelector("#list tbody").appendChild(klon);
}
