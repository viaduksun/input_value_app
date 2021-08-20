const showXML = document.querySelector("#showXML");
const addBtn = document.querySelector("#addBtn");
const btnSortName = document.querySelector("#btnSortName");
const btnSortValue = document.querySelector("#btnSortValue");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const btnDeleteSelected = document.querySelector("#btnDeleteSelected");
const input = document.querySelector("#input");
const fieldDiv = document.querySelector(".field");

let db = [];
// === INITIAL FIELD RENDER ===
fieldDiv.append(field.render());

if (localStorage.getItem("db")) {
  db = JSON.parse(localStorage.getItem("db"));
  field.renderItems(db);
}
// === VALIDATION ===
let errors = {
  input: false,
};
input.addEventListener("blur", () => {    
  if (input.value && !validate(input.value)) {
    input.classList.add("error");
    errors.input = true;
  }
  if (!input.value) {
    input.classList.remove("error");
    errors.input = false;
  }
});
input.addEventListener("change", () => {  
  input.classList.remove("error");
});
input.addEventListener("input", () => {
  
  input.classList.remove("error");
  if (!validate(input.value) && errors.input) {
    input.classList.add("error");
  }
});
function validate(string) {
  let isValid = false;
  return (isValid =
    string.includes("=") &&
    !string[0].includes("=") &&
    !string.includes("=", string.length - 1));
}
// ===== SIDE BAR BTNs =====
showXML.addEventListener("click", (e) => {
  const xmlDB = (db) => {
    return db.reduce((result, el) => {
      return (
        result +
        `<trkpt id="${el.id}" name="${el.name}"><ele>${el.value}</ele></trkpt>\n`
      );
    }, "");
  };
  modal.show("Show XML", xmlDB(db));
});

btnDeleteSelected.addEventListener("click", () => {
  db = field.deleteSelected(db);
});

btnDeleteAll.addEventListener("click", () => {
  db = [];
  field.deleteAll();
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (validate(input.value)) {
    createItem(input.value);
    field.renderItems(db);
    input.value = "";
    errors = {};
  } else {
    input.classList.add("error");
    errors.input = true;
  }
});

btnSortName.addEventListener("click", () => {
  sortByName(db);
});
btnSortValue.addEventListener("click", () => {
  sortByValue(db);
});
function sortByName(db) {
  db.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  // localStorage.setItem('db', JSON.stringify(db));
  field.renderItems(db);
}
function sortByValue(db) {
  db.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  // localStorage.setItem('db', JSON.stringify(db));
  field.renderItems(db);
}
function createItem(value) {
  const randomId = Math.floor(Math.random() * 10000);
  const valueArr = value.split("=");  
  const newItem = {
    id: randomId,
    name: valueArr[0],
    value: valueArr[1],
    checked: false,
  };
  
  db.push(newItem);
  localStorage.setItem("db", JSON.stringify(db));  
}

