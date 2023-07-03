import LoginModal from "./Classes/loginModal.js";
import LoginForm from "./Classes/loginForm.js";
import loginFunction from "./API/loginFunction.js";
import checkLoginToken from "./Functions/checkLoginToken.js";
import CreateVisitForm from "./Classes/CreateVisitForm.js";
import postElement from "./API/postElement.js";
import DashBoardCard from "./Classes/dashBoardCard.js";
import renderElements from "./API/renderElements.js";
import logOutFunction from "./Functions/logOutFunction.js";
import checkOptions from "./Functions/checkOptions.js";
import editModalFunction from "./Functions/editModalFunctioin.js";
import textHiddenFunction from "./Functions/textHiddenFunction.js";
import filterCard from "./API/filterCard.js";
import debounce from "./Functions/debounce.js";
import selectFilterCard from "./API/selectFilterCard.js";

const loginBtn = document.querySelector("#loginButton");

renderElements();
checkLoginToken();
logOutFunction();
textHiddenFunction();

document.querySelector(".no-items").classList.remove("hidden");

loginBtn.addEventListener("click", () => {
  const form = new LoginForm("Вхід");
  const confirmRegestration = async closerCallbackFromModal => {
    const body = form.getValues();
    const { data } = await loginFunction(body);
    localStorage.setItem("TOKEN", data);
    closerCallbackFromModal();
    checkLoginToken();
    renderElements();
    document.querySelector(".no-items").classList.add("hidden");
    textHiddenFunction();
  };
  new LoginModal(form.getFormElement(), confirmRegestration, "Увійти").render();
});

const selectElement = document.getElementById("prioritySelect");
selectElement.addEventListener("change", selectFilterCard);

const inputElement = document.querySelector("#searchInput");
inputElement.addEventListener("input", debounce(filterCard, 1000));

const selectedFilter = localStorage.getItem("selectedFilter");
if (selectedFilter) {
  document.getElementById("prioritySelect").value = selectedFilter;
  selectFilterCard();
}

const addVisit = document.querySelector("#addVisitButton");

addVisit.addEventListener("click", () => {
  const form = new CreateVisitForm("Створити візит", checkOptions);

  const confirmCreateVisitCard = async closerCallbackFromModal => {
    const body = form.getAllUserInfo();
    const { data } = await postElement(body);
    closerCallbackFromModal();

    new DashBoardCard(data.doctor, data["full_name"], data.id, data, editModalFunction, textHiddenFunction).render();
    textHiddenFunction();
  };
  new LoginModal(form.getFormElement(), confirmCreateVisitCard, "Створити").render();
});
