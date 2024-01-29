import fs from "fs";
import path from "path";

export function dbColPath() {
  return path.join(process.cwd(), "data", "column.json");
}
export function dbColRead(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
}

export function dbTaskPath() {
  return path.join(process.cwd(), "data", "task.json");
}
export function dbTaskRead(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData.toString());
}

export function writeColumn(data: any) {
  const filePath = dbColPath();
  fs.writeFileSync(filePath, JSON.stringify(data));
}

export function writeTask(data: any) {
  const filePath = dbTaskPath();
  fs.writeFileSync(filePath, JSON.stringify(data));
}

export function getColumns() {
  const filePath = dbColPath();
  const data = dbColRead(filePath);
  return data;
}

export function getTasks() {
  const filePath = dbTaskPath();
  const data = dbTaskRead(filePath);
  return data;
}

export const resolvers = {
  Query: {
    streams: async (parent: any, args: any) => {
      const streams = getColumns();
      return streams;
    },
    tasks: async (parent: any, args: any) => {
      const tasks = getTasks();
      return tasks;
    },
  },
  Stream: {
    tasks: async (parent: any, args: any) => {
      const tasks = getTasks();
      return tasks.filter((task: any) => task.stream_id === parent.id);
    },
  },
  Mutation: {
    addStream: async (parent: any, args: any) => {
      const streams = getColumns();
      const newColumn = {
        id: new Date().toISOString(),
        name: args.name,
        tasks: [],
      };
      streams.push(newColumn);
      writeColumn(streams);
      return newColumn;
    },
    addTask: async (parent: any, args: any) => {
      const tasks = getTasks();
      const newTask = {
        id: new Date().toISOString(),
        name: args.name,
        stream_id: args.stream_id,
      };
      tasks.push(newTask);
      writeTask(tasks);
      return newTask;
    },
    deleteStream: async (params: any, args: any) => {
      const filePath = dbColPath();
      const data = dbColRead(filePath);
      const newStreams = data.filter((stream: any) => stream.id !== args.id);
      writeColumn(newStreams);
    },
    deleteTask: async (params: any, args: any) => {
      const filePath = dbTaskPath();
      const data = dbTaskRead(filePath);
      const newTasks = data.filter((task: any) => task.id !== args.id);
      writeTask(newTasks);
    },
    updateStream: async (params: any, args: any) => {
      return;
    },
    clearStream: async (params: any, args: any) => {
      const filePath = dbTaskPath();
      const data = dbTaskRead(filePath);
      const newTasks = data.filter(
        (task: any) => task.stream_id !== args.stream_id
      );
      writeTask(newTasks);
    },
    moveTask: async (params: any, args: any) => {
      const filePath = dbTaskPath();
      const data = dbTaskRead(filePath);
      const taskToMove = data.find((task: any) => task.id === args.id);
      const taskIndex = data.indexOf(taskToMove);
      data[taskIndex] = taskToMove;
      taskToMove.stream_id = args.new_id;
      writeTask(data);
    },
    renameStream: async (params: any, args: any) => {
      const filePath = dbColPath();
      const data = dbColRead(filePath);
      const stream = data.find((column: any) => column.id === args.id);
      const colIndex = data.indexOf(stream);
      data[colIndex] = stream;
      stream.name = args.newTitle;
      writeColumn(data);
    },
  },
};
