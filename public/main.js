const form = document.querySelector('form')
form.addEventListener('submit', function (event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const task = formData.get('task')

    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({task, status: 0})
    })
    .then(res => res.json())
    .then(todo => {
        event.target.reset()
        renderTodos()
    })
})

function renderTodos () {
    const list = document.getElementById('list')
    list.innerHTML = ""
    fetch('/todos')
    .then(res => res.json())
    .then(todos => {
        todos.forEach(todo => {
            const li = document.createElement('li')
            li.innerHTML = `${todo.task} <button>Done</button>`
            list.appendChild(li)
        })
    })
    .catch(console.error)
}

renderTodos()