const list = document.querySelector('ul');
let checkbox = document.querySelector('.custom-checkbox');

let issues = JSON.parse(localStorage.getItem("issues")) || [];
showIssues()

function byField(fieldName) {
    return (a, b) => a[fieldName] < b[fieldName] ? 1 : -1;
}

function showIssues() {
    issues.sort(byField('completed'));
    for (let i = 0; i < issues.length; i++) {
        let issue = issues[i]
        let even = i % 2 === 0;
        renderIssueItem(issue.text, issue.id, issue.completed, even);
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

function renderIssueItem(issue, id, completed = false, even) {
    let li = document.createElement("li");
    li.className = even ? 'even' : 'odd';
    li.id = id;

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
    liText.innerText = issue;
    if (completed) liText.style.textDecoration = "line-through";
    // При изменении статуса
    li.onchange = function () {
        changeStatus(liText, li)
    }


    // Создание кнопки удаления
    const deleteButton = document.createElement('button');
    deleteButton.onclick = function () {
        deleteIssue(id, li)
    }
    deleteButton.innerText = 'Удалить';
    deleteButton.className = 'delete';

    // Добавление всего в элемент списка
    li.appendChild(label)
    li.appendChild(liText)
    li.appendChild(deleteButton)

    list.insertBefore(li, list.firstChild);
}

function changeStatus(liText, li) {
    const id = parseInt(li.id)
    const idToChange = getArrayId(issues, id)
    issues[idToChange].completed = !issues[idToChange].completed;
    if (issues[idToChange].completed) {
        liText.style.textDecoration = "line-through";
        list.append(li);
    } else {
        liText.style.textDecoration = "none";
        list.prepend(li);
    }
    localStorage.setItem('issues', JSON.stringify(issues));
}

function deleteIssue(id = undefined, li = undefined, target = 0) {
    console.log(target)
    switch (target) {
        case 0:
            li.remove();
            break;
        case 1:
            id = list.firstElementChild.id;
            list.firstElementChild.remove();
            break;
        case -1:
            id = list.lastElementChild.id;
            list.lastElementChild.remove();
            break;

    }
    const idToRemove = getArrayId(issues, id)
    issues.splice(idToRemove, 1);
    localStorage.setItem('issues', JSON.stringify(issues));
}

function getArrayId(array, id) {
    return array.findIndex(element => element.id === id);
}

function highlight(even) {
    const evenItems = document.getElementsByClassName(even)
    for (item of evenItems) {
        if (even === 'even') {
            item.style.background = 'pink';

        }
        if (even === 'odd') {
            item.style.background = 'lightblue';
        }
    }
}
