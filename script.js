function reportClick() {
	const gameSpace = document.getElementById("app-main");
	let posX = 0;
	let posY = 0;

	gameSpace.addEventListener("mousedown", (event) => {
		posX = event.offsetX;
		posY = event.offsetY;
		console.log(`${posX}, ${posY}`);

		const selectBox = document.createElement("div");
		selectBox.classList.add("select-box");
		selectBox.style.position = "absolute";
		selectBox.style.top = `${posY - 50}px`;
		selectBox.style.left = `${posX - 50}px`;
		gameSpace.appendChild(selectBox);
	});
}

reportClick();
