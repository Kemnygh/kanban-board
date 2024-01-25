import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   { name: string }
//   ;
// };

export function dbDataPathTask() {
    return path.join(process.cwd(), 'data', 'task.json');
}
export function dbDataReadTask(filePath: string) {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData.toString());
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    if (req.method === 'POST' && req.body.type === 'task') {
        const title = req.body.title
        const column_id = req.body.column_id

        const newColumn = {
            id: new Date().toISOString(),
            name: title,
            stream_id: column_id
        };

        const filePath = dbDataPathTask();
        const data = dbDataReadTask(filePath)
        data.push(newColumn);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: "Task Creation Success" })
    } else if (req.method === 'POST' && req.body.type === 'clear') {
        const column_id = req.body.column_id
        const filePath = dbDataPathTask();
        const data = dbDataReadTask(filePath)
        const newTasks = data.filter((task: any) =>
            task.stream_id !== column_id
        )
        fs.writeFileSync(filePath, JSON.stringify(newTasks));
        res.status(201).json({ message: "Tasks Cleared Success" })
    } else if (req.method === 'POST' && req.body.type === 'delete') {
        const task_id = req.body.id
        console.log(task_id)
        const filePath = dbDataPathTask();
        const data = dbDataReadTask(filePath)
        const newTasks = data.filter((task: any) =>
            task.id !== task_id
        )
        fs.writeFileSync(filePath, JSON.stringify(newTasks));
        res.status(201).json({ message: "Task Deleted Success" })
    } else if (req.method === 'POST' && req.body.type === 'move') {
        const id = req.body.id
        const new_id = req.body.new_id

        const filePath = dbDataPathTask();
        const data = dbDataReadTask(filePath)
        // console.log(data)
        const taskToMove = data.find((task: any) => task.id === id)
        const taskIndex = data.indexOf(taskToMove)
        data[taskIndex] = taskToMove
        // console.log(colIndex)
        taskToMove.stream_id = new_id

        // console.log(data)
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: "Column Creation Success" })
    } else {
        const filePath = dbDataPathTask();
        const data = dbDataReadTask(filePath)
        res.status(200).json({ data: data });
    }

}
