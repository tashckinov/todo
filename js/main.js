const list = document.querySelector('ul');
let checkbox = document.querySelector('.custom-checkbox');

let issues = JSON.parse(localStorage.getItem("issues")) || [];
showIssues()

function showIssues() {
    for (let i = 0; i < issues.length; i++) {
        let issue = issues[i]
        renderIssueItem(issue.text, issue.id, issue.completed)
    }
}

function addIssue() {
    const input = document.querySelector('input');
    let inputValue = input.value;
    if (inputValue) {
        let id = -1
        if (issues.length === 0) {
            id = 1
        } else {
            id = issues[issues.length - 1].id + 1
        }
        renderIssueItem(inputValue, id)
        issues.push({id: id, text: inputValue, completed: false});
        localStorage.setItem('issues', JSON.stringify(issues))
        input.value = "";
    }
}

function renderIssueItem(issue, id, completed = false) {
    let li = document.createElement("li");
    li.onchange = function () {
        changeStatus(id)
    }

    // Создание checkbox-a
    let label = document.createElement("label");
    label.className = "checkbox-container";

    let input = document.createElement("input");
    input.className = "custom-checkbox";
    input.type = "checkbox";
    input.checked = completed;

    let span = document.createElement("span");
    span.className = "checkmark";

    label.appendChild(input);
    label.appendChild(span);

    // Создание текста пункта
    let liText = document.createElement("span");
    liText.innerText = issue

    // Создание кнопки удаления
    const deleteButton = document.createElement('button');
    deleteButton.onclick = function () {
        deleteIssue(id)
    }
    deleteButton.innerText = 'Удалить';
    deleteButton.className = 'delete';

    // Добавление всего в элемент списка
    li.appendChild(label)
    li.appendChild(liText)
    li.appendChild(deleteButton)

    list.insertBefore(li, list.firstChild);
}

function changeStatus(id) {
    id--
    issues[id].completed = !issues[id].completed;
    localStorage.setItem('issues', JSON.stringify(issues));
}
// todo не удаляется локальный элемент
function deleteIssue(id) {
    const idToRemove = issues.findIndex(element => element.id === id);
    issues.splice(idToRemove, 1);
    console.log(issues)
    localStorage.setItem('issues', JSON.stringify(issues));
}