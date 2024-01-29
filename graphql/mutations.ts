import { gql } from "@apollo/client";

export const CREATE_STREAM = gql`
  mutation AddStream($name: String) {
    addStream(name: $name) {
      name
    }
  }
`;

export const CREATE_TASK = gql`
  mutation AddTask($name: String, $stream_id: String) {
    addTask(name: $name, stream_id: $stream_id) {
      name
      stream_id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const DELETE_STREAM = gql`
  mutation DeleteStream($id: ID!, $streamId: String) {
    deleteStream(id: $id) {
      id
    }
    clearStream(stream_id: $streamId) {
      stream_id
    }
  }
`;

export const CLEAR_STREAM = gql`
  mutation clearStream($streamId: String) {
    clearStream(stream_id: $streamId) {
      stream_id
    }
  }
`;

export const MOVE_TASK = gql`
  mutation MoveTask($newId: String, $taskID: ID!) {
    moveTask(new_id: $newId, id: $taskID) {
      stream_id
    }
  }
`;

export const RENAMR_STREAM = gql`
  mutation RenameStream($id: ID!, $newTitle: String) {
    renameStream(id: $id, newTitle: $newTitle) {
      id
    }
  }
`;
