/*======================================================================
// GET YEAR FOR COPYRIGHT FOOTER
======================================================================*/
const year = document.getElementById("year");
if (year) {
 year.textContent = new Date().getFullYear();
}
/*======================================================================
// SHOW HIDE FILTERS ASIDE ON MOBILE
======================================================================*/
const buttonReveal = document.getElementById("filter-button-reveal");
const filtersCollapse = document.getElementById("filters-collapse");
if (buttonReveal) {
 buttonReveal.addEventListener("click", () => {
  filtersCollapse.classList.toggle("active");
  buttonReveal.classList.toggle("active");
 });
}

/*======================================================================
// ADD STICKY CLASS TO MAIN NAV ON SCROLL
======================================================================*/
const element = document.querySelector("#main-nav");
const scrollHandler = () => {
 if (window.scrollY > 1) {
  element.classList.add("is-sticky");
 } else {
  element.classList.remove("is-sticky");
 }
};
window.addEventListener("scroll", scrollHandler);

/*======================================================================
// BACKGROUND ANIMATION FOR LOGIN / REGISTER PAGE
======================================================================*/
const signInLink = document.getElementById("signInLink");
const logInLink = document.getElementById("logInLink");
const pink_clip_div = document.getElementById("pink-bg");
const welcome = document.getElementById("welcome");
const welcomeBack = document.getElementById("welcomeBack");
const toLeft = document.getElementsByClassName("to-left");
const toRight = document.getElementsByClassName("to-right");
if (signInLink) {
 signInLink.addEventListener("click", function () {
  pink_clip_div.classList.add("signInVisible");
  pink_clip_div.classList.remove("logInVisible");
  welcomeBack.classList.add("active");
  welcome.classList.add("active");
  for (let i = 0; i < toLeft.length; i++) {
   toLeft[i].classList.add("active");
  }
  for (let i = 0; i < toRight.length; i++) {
   toRight[i].classList.add("active");
  }
 });
 logInLink.addEventListener("click", function () {
  pink_clip_div.classList.add("logInVisible");
  pink_clip_div.classList.remove("signInVisible");
  welcomeBack.classList.remove("active");
  welcome.classList.remove("active");
  for (let i = 0; i < toLeft.length; i++) {
   toLeft[i].classList.remove("active");
  }
  for (let i = 0; i < toRight.length; i++) {
   toRight[i].classList.remove("active");
  }
 });
}

/*======================================================================
// TEMPORARY COUNTER - FOR TESTING PURPOSES ONLY
======================================================================*/
/*let counter = 0;
const value = document.querySelector("#qtyVal");
const buttons = document.getElementsByClassName("counter-btn");
if (value) {
 Array.from(buttons).forEach((btn) => {
  btn.addEventListener("click", (e) => {
   const estilos = e.currentTarget.classList;
   if (e.target.id === "qtyInc") {
    counter++;
   } else if (e.target.id === "qtyDec") {
    counter--;
   } else {
    counter = 0;
   }
   value.textContent = counter;
  });
 });
}
 */

/*======================================================================
// SHOW FILE NAME WHEN USING INPUT TYPE FILE
======================================================================*/
const portada = document.getElementById("portada");
const lamina = document.getElementById("lamina");
if (portada) {
 portada.addEventListener("change", function () {
  const fileName = this.files[0]
   ? this.files[0].name
   : "Ningún archivo seleccionado";
  document.getElementById("portada-file-name").textContent = fileName;
 });
}
if (lamina) {
 lamina.addEventListener("change", function () {
  const fileName = this.files[0]
   ? this.files[0].name
   : "Ningún archivo seleccionado";
  document.getElementById("lamina-file-name").textContent = fileName;
 });
}

/*======================================================================
// FILTERS LOGIC
======================================================================*/
filter([], [], []);
//list of category filters (activeFilters = primaryFilters)
function check() {
 var checkPoster = document.getElementById("poster").checked;
 var checkPhoto = document.getElementById("photo").checked;
 var checkPostcard = document.getElementById("postcard").checked;
 let activeFilters = [];
 if (checkPoster) {
  activeFilters.push("poster");
 }
 if (checkPhoto) {
  activeFilters.push("photo");
 }
 if (checkPostcard) {
  activeFilters.push("postcard");
 }
 // list of spaces filters (secondary Filters)
 var checkOffice = document.getElementById("office").checked;
 var checkHome = document.getElementById("home").checked;
 var checkProfesionals = document.getElementById("profesionals").checked;
 var checkMuseum = document.getElementById("museum").checked;
 let secondaryFilters = [];
 if (checkOffice) {
  secondaryFilters.push("office");
 }
 if (checkHome) {
  secondaryFilters.push("home");
 }
 if (checkProfesionals) {
  secondaryFilters.push("profesionals");
 }
 if (checkMuseum) {
  secondaryFilters.push("museum");
 }
 // list of themes filters (tertiary Filters)
 var checkArchitecture = document.getElementById("architecture").checked;
 var checkAnimals = document.getElementById("animals").checked;
 var checkVintage = document.getElementById("vintage").checked;
 var checkBauhaus = document.getElementById("bauhaus").checked;
 var checkMaps = document.getElementById("maps").checked;
 var checkBlueprints = document.getElementById("blueprints").checked;
 let tertiaryFilters = [];
 if (checkArchitecture) {
  tertiaryFilters.push("architecture");
 }
 if (checkAnimals) {
  tertiaryFilters.push("animals");
 }
 if (checkVintage) {
  tertiaryFilters.push("vintage");
 }
 if (checkBauhaus) {
  tertiaryFilters.push("bauhaus");
 }
 if (checkMaps) {
  tertiaryFilters.push("maps");
 }
 if (checkBlueprints) {
  tertiaryFilters.push("blueprints");
 }
 if (
  activeFilters.length == 0 &&
  secondaryFilters.length == 0 &&
  tertiaryFilters.length == 0
 ) {
  filter([], [], []);
 } else {
  filter(activeFilters, secondaryFilters, tertiaryFilters);
 }
}
// Sorting products
function filter(primaryFilters, secondaryFilters, tertiaryFilters) {
 var allProducts;
 allProducts = document.getElementsByClassName("product");
 document.getElementById("no-results").style.display = "none";
 for (let i = 0; i < allProducts.length; i++) {
  let matchesFilter = true;
  notSelectedElementsRemoveClass(allProducts[i], "filter-active");
  if (primaryFilters.length > 0) {
   matchesFilter = primaryFilters.some(
    (p) => allProducts[i].className.indexOf(p) > -1,
   );
  }
  if (matchesFilter && secondaryFilters.length > 0) {
   matchesFilter = secondaryFilters.some(
    (s) => allProducts[i].className.indexOf(s) > -1,
   );
  }
  if (matchesFilter && tertiaryFilters.length > 0) {
   matchesFilter = tertiaryFilters.some(
    (t) => allProducts[i].className.indexOf(t) > -1,
   );
  }
  if (matchesFilter) {
   selectedElementsAddClass(allProducts[i], "filter-active");
  }
 }
 checkForNoMatches();
}
// Show filtered elements
function selectedElementsAddClass(element, name) {
 var i, arr1, arr2;
 arr1 = element.className.split(" ");
 arr2 = name.split(" ");
 for (i = 0; i < arr2.length; i++) {
  if (arr1.indexOf(arr2[i]) == -1) {
   element.className += " " + arr2[i];
  }
 }
}
// Hide elements that are not selected
function notSelectedElementsRemoveClass(element, name) {
 var i, arr1, arr2;
 arr1 = element.className.split(" ");
 arr2 = name.split(" ");
 for (i = 0; i < arr2.length; i++) {
  while (arr1.indexOf(arr2[i]) > -1) {
   arr1.splice(arr1.indexOf(arr2[i]), 1);
  }
 }
 element.className = arr1.join(" ");
}
function checkForNoMatches() {
 var x = document.getElementsByClassName("filter-active");
 //console.log(x.length);
 if (x.length == 0) {
  document.getElementById("no-results").style.display = "block";
 }
}
