export function submitHandler(tags: any) {
    const reqBody = { title: tags, type: 'Column' }
    if (!reqBody.title || reqBody.title === '') {
        return console.log('Please enter the title')
    }
    fetch('/api/stream', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}

export function submitTaskHandler(tags: any, column_id: any) {
    const reqBody = { title: tags, column_id: column_id, type: 'task' }
    if (!reqBody.title || reqBody.title === '') {
        return console.log('Please enter the title')
    }
    fetch('/api/task', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}

export function renameHandler(tags: any, column_id: any) {
    const reqBody = { title: tags, column_id: column_id, type: 'rename' }
    if (!reqBody.title || reqBody.title === '') {
        return console.log('Please enter the title')
    }
    fetch('/api/stream', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}

export function clearHandler(column_id: any) {
    const reqBody = { column_id: column_id, type: 'clear' }

    fetch('/api/task', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}

export function DeleteColHandler(column_id: any) {
    const reqBody = { column_id: column_id, type: 'delete' }

    fetch('/api/stream', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}

export function DeleteTaskhandler(id: any) {
    const reqBody = { id: id, type: 'delete' }

    fetch('/api/task', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}

export function MoveTaskhandler(id: any, new_id: any) {
    const reqBody = { id: id, new_id: new_id, type: 'move' }

    fetch('/api/task', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}