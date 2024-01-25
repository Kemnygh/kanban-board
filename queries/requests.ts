export async function submitHandler(tags: any) {
    const reqBody = { title: tags, type: 'Column' }
    if (!reqBody.title || reqBody.title === '') {
        return { 'errmsg': 'Please enter the title' };
    }


    try {
        const response = await fetch('/api/stream', {
            method: 'POST', body: JSON.stringify(reqBody), headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { 'errmsg': 'Network response was not ok' };
        }

        const data = await response.json();
        return { 'success': data.message }; // Return the message received from the API
    } catch (error: any) {
        // console.error('Error submitting task:', error.message);
        return { 'errmsg': 'Error submitting task' };
    }
}

export async function submitTaskHandler(tags: any, column_id: any) {
    const reqBody = { title: tags, column_id: column_id, type: 'task' };

    if (!reqBody.title || reqBody.title === '') {
        return { 'errmsg': 'Please enter the title' };

    }

    try {
        const response = await fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { 'errmsg': 'Network response was not ok' };
        }

        const data = await response.json();
        return { 'success': data.message }; // Return the message received from the API
    } catch (error: any) {
        // console.error('Error submitting task:', error.message);
        return { 'errmsg': 'Error submitting task' };
    }
}


export async function renameHandler(tags: any, column_id: any) {
    const reqBody = { title: tags, column_id: column_id, type: 'rename' }
    if (!reqBody.title || reqBody.title === '') {
        return { 'errmsg': 'Please enter the title' };
    }
    try {
        const response = await fetch('/api/stream', {
            method: 'POST', body: JSON.stringify(reqBody), headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { 'errmsg': 'Network response was not ok' };
        }

        const data = await response.json();
        return { 'success': data.message }; // Return the message received from the API
    } catch (error: any) {
        // console.error('Error submitting task:', error.message);
        return { 'errmsg': 'Error submitting task' };
    }
}

export async function clearHandler(column_id: any) {
    const reqBody = { column_id: column_id, type: 'clear' }

    try {
        const response = await fetch('/api/task', {
            method: 'POST', body: JSON.stringify(reqBody), headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { 'errmsg': 'Network response was not ok' };
        }

        const data = await response.json();
        return { 'success': data.message }; // Return the message received from the API
    } catch (error: any) {
        // console.error('Error submitting task:', error.message);
        return { 'errmsg': 'Error submitting task' };
    }
}

export async function DeleteColHandler(column_id: any) {
    const reqBody = { column_id: column_id, type: 'delete' }


    try {
        const response = await
            fetch('/api/stream', {
                method: 'POST', body: JSON.stringify(reqBody), headers: {
                    'Content-Type': 'application/json'
                }
            })

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { 'errmsg': 'Network response was not ok' };
        }

        const data = await response.json();
        return { 'success': data.message }; // Return the message received from the API
    } catch (error: any) {
        // console.error('Error submitting task:', error.message);
        return { 'errmsg': 'Error submitting task' };
    }
}

export async function DeleteTaskhandler(id: any) {
    const reqBody = { id: id, type: 'delete' }

    try {
        const response = await fetch('/api/task', {
            method: 'POST', body: JSON.stringify(reqBody), headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { 'err': 'Network response was not ok' };
        }

        const data = await response.json();
        return { 'success': data.message }; // Return the message received from the API
    } catch (error: any) {
        // console.error('Error submitting task:', error.message);
        return { 'errmsg': 'Error submitting task' };
    }
}

export async function MoveTaskhandler(id: any, new_id: any) {
    const reqBody = { id: id, new_id: new_id, type: 'move' }



    try {
        const response = await fetch('/api/task', {
            method: 'POST', body: JSON.stringify(reqBody), headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { 'errmsg': 'Network response was not ok' };
        }

        const data = await response.json();
        return { 'success': data.message }; // Return the message received from the API
    } catch (error: any) {
        // console.error('Error submitting task:', error.message);
        return { 'errmsg': 'Error submitting task' };
    }
}