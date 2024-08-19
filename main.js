const app = document.querySelector("#app-container");
const modalConfirm = document.querySelector("#exampleModal");

const input = document.querySelector("#todo-input");
const ul = document.querySelector("#ul-list");
const modalEl = new bootstrap.Modal(modalConfirm);

let itemToDeleteId = null;
let todoItems = [];

function createTodoItem() {
	const inputText = input.value;

	if (inputText === "") return;

	const liItem = {
		id: null,
		content: inputText,
	};

	todoItems.push(liItem);
	renderListItems(todoItems);
	input.value = "";
}

function renderListItems(itemsArr) {
	ul.innerHTML = "";

	itemsArr.forEach((item, i) => {
		item.id = i++;
		const liItem = ` <li id=${item.id}>
					${item.content} <button class="delete" id="delete-btn">❌</button>
				</li>`;
		ul.insertAdjacentHTML("beforeend", liItem);
	});
}

function addItem(e) {
	if (e.target.classList.contains("add")) {
		createTodoItem();
	}
}

function deleteItem(e) {
	const itemToDelete = e.target;
	itemToDeleteId = itemToDelete.closest("li")?.id;

	if (itemToDelete.classList.contains("delete")) {
		modalEl.show();
		// todoItems = todoItems.filter((item) => item.id !== Number(itemToDeleteId));

		// console.log(todoItems);
		// return renderListItems(todoItems);
	}
}

modalConfirm.addEventListener("click", (e) => {
	if (e.target.classList.contains("confirm")) {
		todoItems = todoItems.filter((item) => item.id !== Number(itemToDeleteId));
		modalEl.hide();
		renderListItems(todoItems);
	}
});

app.addEventListener("click", (e) => {
	addItem(e);
	deleteItem(e);
});
