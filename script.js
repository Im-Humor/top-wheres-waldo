const people = {
	megamind: {
		posX: 557,
		posY: 425,
		found: false,
	},
	"the flash": {
		posX: 1032,
		posY: 1036,
		found: false,
	},
};

const sidebarList = document.querySelector(".character-list");
for (key in Object.keys(people)) {
	const sidebarListItem = document.createElement("li");
	sidebarListItem.classList.add("character-list-item");
	sidebarListItem.setAttribute("id", Object.keys(people)[key]);
	sidebarListItem.innerText = Object.keys(people)[key];
	sidebarList.appendChild(sidebarListItem);
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
	people[person].found = true;
	const personListItems = document.querySelectorAll(".character-list-item");
	for (let i = 0; i < personListItems.length; i++) {
		if (personListItems[i].innerText == person) {
			personListItems[i].style.color = "green";
		}
	}
}

function checkPerson(posX, posY) {
	for (let i = 0; i < Object.keys(people).length; i++) {
		if (
			people[Object.keys(people)[i]].posX >= posX - 25 &&
			people[Object.keys(people)[i]].posX <= posX + 25 &&
			people[Object.keys(people)[i]].posY >= posY - 25 &&
			people[Object.keys(people)[i]].posY <= posY + 25
		) {
			checkOffPerson(Object.keys(people)[i]);
			return Object.keys(people)[i];
		}
	}
	return null;
}

function reportClick() {
	const gameSpace = document.querySelector(".app-main");
	let posX = 0;
	let posY = 0;

	gameSpace.addEventListener("click", (event) => {
		let boxes = document.getElementsByClassName("select-box");

		if (boxes.length == 0) {
			posX = event.offsetX;
			posY = event.offsetY;
			console.log(`${posX}, ${posY}`);

			const selectBox = document.createElement("div");
			selectBox.classList.add("select-box");
			selectBox.style.position = "absolute";
			selectBox.style.top = `${posY - 50}px`;
			selectBox.style.left = `${posX - 50}px`;
			gameSpace.appendChild(selectBox);
			showSidebar();

			console.log(checkPerson(posX, posY));
		} else {
			for (let i = 0; i < boxes.length; i++) {
				boxes[i].remove();
				hideSidebar();
			}
		}
	});
}

reportClick();
