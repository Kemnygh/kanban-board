export const typeDefs = `#graphql
type Stream {
  id:       ID!
  name:     String
  tasks:    [Task]
}

type Task {
  id:      ID!
  name:    String
  stream_id: String
}


type Query {
    stream(id: ID!): Stream
    streams: [Stream]
    Task(id:ID!): Task
    tasks: [Task]
}

type Mutation {
    addStream(name: String): Stream,
    addTask(name: String, stream_id:String): Task,
    deleteStream(id:ID!): Stream,
    deleteTask(id:ID!): Task,
    updateStream(id:ID!, title:String):Stream,
    clearStream(stream_id: String): Task
    moveTask(id:ID!, new_id: String):Task
    renameStream(id:ID!,newTitle:String): Stream
}
`;
