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
        res.status(201).json({ message: "Task Creation Success", mabo: req.body })
    } else {
        const filePath = dbDataPathTask();
        const data = dbDataReadTask(filePath)
        res.status(200).json({ data: data });
    }

}
