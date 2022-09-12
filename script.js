//---------------------//
// You can do anything :) //
//---------------------//
"use strict";

const countriesContainer = document.querySelector(".row"); //Card.
const request = new XMLHttpRequest();
const year = new Date();
let countryName = "";
let html = "";

function findCountry() {
  countryName =
    countryName === ""
      ? "indonesia" //Default country.
      : document.getElementById("country-name-form").value;
  request.open("GET", `https://restcountries.com/v3.1/name/${countryName}`);
  request.send();
}

findCountry(); //Load default country.

request.addEventListener("load", function () {
  const [data] = JSON.parse(this.responseText);

  //Get object's keys names and store its.
  const currenciesData = Object.keys(data.currencies)[0];
  const languangesData = Object.keys(data.languages)[0];

  //Basic card template.
  html = `
    <div class="col-md-4">
      <img src="${data.flags.png}" class="img-fluid" alt="${
    data.name.common
  }" style="min-height: 100%">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${
          data.name.common
        } <small class="text-muted font-italic" style="font-size: 50%"> (${
    data.name.official
  })</small>.</h5>
        <p class="card-text"><i class="fas fa-city"></i>: ${data.capital}.</p>
        <p class="card-text"><i class="fas fa-comments"></i> : ${
          data.languages[languangesData]
        }.</p>
        <p class="card-text"><i class="fas fa-coins"></i>: ${
          data.currencies[currenciesData].name
        } <small class="text-muted font-weight-bolder"> (${
    data.currencies[currenciesData].symbol
  })</small>.</p>
        <p class="card-text"><i class="fas fa-users"></i>: ${(
          +data.population / 1000000
        ).toFixed(1)} Million.</p>
        <p class="card-text"><small class="text-muted">Made by &#x1F49B from <a href="https://github.com/Khubayan" target="_blank">IamNotANerd</a> ${year.getFullYear()}.</small></p> <!--You can put your link here <3 -->
    </div>
    </div>
    `;

  //Send basic card template to HTML file.
  countriesContainer.innerHTML = html;

  //Enter as submit button
  document
    .getElementById("country-name-form")
    .addEventListener("keyup", function (event) {
      if (event.code === "Enter") {
        event.preventDefault();
        findCountry();
      }
    });
});
