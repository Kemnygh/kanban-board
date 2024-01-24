// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   { name: string }
//   ;
// };

function dbDataPath() {
  return path.join(process.cwd(), 'data', 'column.json');
}
function dbDataRead(filePath: fs.PathOrFileDescriptor) {
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
  } else {
    const filePath = dbDataPath();
    const data = dbDataRead(filePath)
    res.status(200).json({ data: data });
  }

}
