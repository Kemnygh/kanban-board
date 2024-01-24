export function submitHandler(tags: any) {
    const reqBody = { title: tags, type: 'Column' }
    if (!reqBody.title || reqBody.title === '') {
        return console.log('Input data')
    }
    fetch('/api/stream', {
        method: 'POST', body: JSON.stringify(reqBody), headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => console.log(data))
}