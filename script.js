import { people } from "./test_people.js";
import { initUser } from "./backend.js";

let posX = 0;
let posY = 0;
let time = 0;
let winScore = 0;
let username = "";
let startTime = null;

const sidebarList = document.querySelector(".character-list");
for (let key in Object.keys(people)) {
	const sidebarListItem = document.createElement("li");
	sidebarListItem.classList.add("character-list-item");
	sidebarListItem.setAttribute("id", Object.keys(people)[key]);
	sidebarListItem.innerText = Object.keys(people)[key];
	sidebarList.appendChild(sidebarListItem);
}

function modalAlert(message, timeWait) {
	const appContainer = document.querySelector(".app-container");
	const modal = document.createElement("div");
	modal.classList.add("modal");
	modal.textContent = message;
	appContainer.appendChild(modal);
	setTimeout(() => {
		appContainer.removeChild(modal);
	}, `${timeWait}`);
}

function startTimer() {
	const timer = document.querySelector("#timer");

	setInterval(() => {
		timer.textContent = `Time: ${time}`;
		time += 1;
	}, 1000);
}

function stopTimer() {
	winScore = time;
	const timer = document.querySelector("#timer");
	timer.remove();
	const navbarList = document.querySelector(".navbar-list");
	const navbarItem = document.createElement("div");
	navbarItem.textContent = `Time was ${winScore}`;
	navbarItem.classList.add("navbar-list-item");
	navbarList.appendChild(navbarItem);
}

function clickEvent(event) {
	const person = event.target.innerText;
	checkPerson(person);
}

function showSidebar() {
	const sidebar = document.querySelector(".app-sidebar");
	sidebar.style.display = "block";
}

function hideSidebar() {
	const sidebar = document.querySelector(".app-sidebar");
	sidebar.style.display = "none";
}

function checkOffPerson(person) {
	if (people[person]) {
		people[person].found = true;

		const personListItems = document.querySelectorAll(
			".character-list-item"
		);
		for (let i = 0; i < personListItems.length; i++) {
			if (personListItems[i].innerText == person) {
				personListItems[i].style.color = "green";
			}
		}
		for (let x = 0; x < Object.keys(people).length; x++) {
			if (people[Object.keys(people)[x]].found == false) {
				modalAlert(`You found ${person}!`, 2000);
				return;
			}
		}
		stopTimer();
		modalAlert("You won!", 5000000);
	}
}

function checkPerson(person) {
	for (let i = 0; i < Object.keys(people).length; i++) {
		if (
			people[Object.keys(people)[i]].posX >= posX - 25 &&
			people[Object.keys(people)[i]].posX <= posX + 25 &&
			people[Object.keys(people)[i]].posY >= posY - 25 &&
			people[Object.keys(people)[i]].posY <= posY + 25 &&
			Object.keys(people)[i] == person
		) {
			checkOffPerson(Object.keys(people)[i]);
			return Object.keys(people)[i];
		}
	}
	modalAlert("Hehehe try again!", 2000);
	return null;
}

function setupGame() {
	const modal = document.querySelector(".modal");
	modal.remove();

	const gameSpace = document.querySelector(".app-main");
	startTimer();

	gameSpace.addEventListener("click", (event) => {
		let boxes = document.getElementsByClassName("select-box");

		if (boxes.length == 0) {
			posX = event.offsetX;
			posY = event.offsetY;

			const selectBox = document.createElement("div");
			selectBox.classList.add("select-box");
			selectBox.style.position = "absolute";
			selectBox.style.top = `${posY - 50}px`;
			selectBox.style.left = `${posX - 50}px`;
			gameSpace.appendChild(selectBox);
			showSidebar();

			//add click event to choose person
			const sideBarListItems = document.querySelectorAll(
				".character-list-item"
			);
			for (let x = 0; x < sideBarListItems.length; x++) {
				sideBarListItems[x].addEventListener("click", clickEvent);
			}
		} else {
			for (let i = 0; i < boxes.length; i++) {
				boxes[i].remove();
				hideSidebar();
			}
		}
	});
}

function startModal() {
	const appContainer = document.querySelector(".app-container");

	const startModal = document.createElement("div");
	startModal.classList.add("modal");
	startModal.innerHTML = "<p>Click start to start the game!<p>";

	const startModalName = document.createElement("input");
	startModalName.setAttribute("id", "name-field");
	startModalName.setAttribute("placeholder", "Name");

	const startModalButton = document.createElement("button");
	startModalButton.textContent = "Start";

	appContainer.appendChild(startModal);
	startModal.appendChild(startModalName);
	startModal.appendChild(startModalButton);
	startModalButton.addEventListener("click", (event) => {
		event.preventDefault();

		username = startModalName.value;

		let tempDate = new Date();
		startTime = tempDate.toISOString().slice(0, 19).replace("T", " ");

		initUser(username);

		const headerName = document.querySelector("#header-name");
		headerName.textContent = `Name: ${username}`;

		setupGame();
	});
}

startModal();
