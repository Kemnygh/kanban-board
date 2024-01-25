// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   { name: string }
//   ;
// };

export function dbDataPath() {
  return path.join(process.cwd(), 'data', 'column.json');
}
export function dbDataRead(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  if (req.method === 'POST' && req.body.type === 'Column') {
    const title = req.body.title

    const newColumn = {
      id: new Date().toISOString(),
      name: title,
      tasks: []
    };

    const filePath = dbDataPath();
    const data = dbDataRead(filePath)
    data.push(newColumn);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Column Creation Success" })
  } else if (req.method === 'POST' && req.body.type === 'rename') {
    const title = req.body.title
    const column_id = req.body.column_id

    const filePath = dbDataPath();
    const data = dbDataRead(filePath)
    // console.log(data)
    const stream = data.find((column: any) => column.id === column_id)
    const colIndex = data.indexOf(stream)
    data[colIndex] = stream
    // console.log(colIndex)
    stream.name = title

    // console.log(data)
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Column Creation Success" })
  } else if (req.method === 'POST' && req.body.type === 'delete') {
    const column_id = req.body.column_id

    const filePath = dbDataPath();
    const data = dbDataRead(filePath)
    const newStreams = data.filter((stream: any) =>
      stream.id !== column_id
    )
    fs.writeFileSync(filePath, JSON.stringify(newStreams));
    res.status(201).json({ message: "Column Deleted Successfully", mabo: req.body })
  } else {
    const filePath = dbDataPath();
    const data = dbDataRead(filePath)
    res.status(200).json({ data: data });
  }

}
