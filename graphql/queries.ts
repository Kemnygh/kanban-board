import { gql } from "@apollo/client";

export const GET_STREAMS = gql`
  query Streams {
    streams {
      id
      name
      tasks {
        name
        id
        stream_id
      }
    }
  }
`;

export const GET_TASKS = gql`
  query Tasks {
    tasks {
      name
      id
      stream_id
    }
  }
`;
