"use strict";

document.addEventListener("DOMContentLoaded", getStudents);

async function getStudents() {
  let studentList;
  let array = "https://petlatkea.dk/2020/hogwarts/students.json";
  let jsonData = await fetch(array);
  studentList = await jsonData.json();
  console.log(studentList);

  const template = document.querySelector("#template_student");
  const container = document.querySelector(".studentcontainer");

  // indsæt arrayinformationerne i html
  studentList.forEach((student) => {
    let klon = template.cloneNode(true).content;

    //////////////////NAVNET////////////////////////

    //del string over ved mellemrummene
    const firstSpace = student.fullname.indexOf(" ");
    const lastSpace = student.fullname.lastIndexOf(" ");

    // adskil det fulde navn til for, mellem, efternavn
    const firstName = student.fullname.substring(0, firstSpace).trim();
    const middleName = student.fullname.substring(firstSpace, lastSpace).trim();
    const lastName = student.fullname.substring(lastSpace).trim();

    // gør første stort og resten småt
    const firstNameCapitalized =
      firstName.substring(0, 1).toUpperCase() +
      firstName.substring(1, firstSpace).toLowerCase();

    const middleNameCapitalized =
      middleName.substring(0, 1).toUpperCase() +
      middleName.substring(1, lastSpace).toLowerCase();

    const lastNameCapitalized =
      lastName.substring(0, 1).toUpperCase() +
      lastName.substring(1).toLowerCase(lastName.length);

    //klon indholdet
    // giver det mening at lave mellemrum imellem variablerne???
    klon.querySelector(".name").textContent =
      firstNameCapitalized +
      " " +
      middleNameCapitalized +
      " " +
      lastNameCapitalized;

    ////////////////////////////GENDER////////////////////////////////
    const gender = student.gender.substring(0).trim();
    const genderLength = gender.length;
    const genderCapitalized =
      gender.substring(0, 1).toUpperCase() +
      gender.substring(1, genderLength).toLowerCase();
    //klon indholdet
    klon.querySelector(".gender").textContent = genderCapitalized;

    ////////////////////////////HOUSE///////////////////////////////
    const house = student.house.substring(0).trim();
    const houseLength = house.length;

    const houseCapitalized =
      house.substring(0, 1).toUpperCase() +
      house.substring(1, houseLength).toLowerCase();
    //klon indholdet
    klon.querySelector(".house").textContent = houseCapitalized;

    ///////////////////////////IMAGE///////////////////////////////
    // klon.querySelector("img").src =

    console.log(
      houseCapitalized,
      firstNameCapitalized + middleNameCapitalized + lastNameCapitalized,
      genderCapitalized
    );

    //Når templatet er udfyldt, indsættes det i vores container i html'en

    container.appendChild(klon);
  });
}

// find første bogstav
// const firstLetterFirstName = student.fullname.substring(0, 1);
// const firstLetterMiddleName = student.fullname.charAt(firstSpace + 1);
// const firstLetterLastName = student.fullname.charAt(lastSpace + 1);
// const lastCharacter = student.fullname.charAt(-1);

// sammensæt navne delene til ét navn
// const fullname = new Set([
//   firstNameCapitalized,
//   middleNameCapitalized,
//   lastNameCapitalized,
// ]);
