import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import BoardPage from "@/components/board/board-page";
import { dbDataPath, dbDataRead } from "@/pages/api/stream";
import { useState } from "react";
import { dbDataPathTask, dbDataReadTask } from "./api/task";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [currentData, setCurrentData] = useState(props.streams)
  const [currentDataTask, setCurrentDataTask] = useState(props.tasks)

  const fetchData = async () => {
    // Fetch new data from the server
    const response = await fetch('/api/stream'); // Assuming you have an API endpoint
    const newData = await response.json();

    // Update the client-side state
    setCurrentData(newData.data);
    // console.log(newData)
  };

  const fetchDataTask = async () => {
    // Fetch new data from the server
    const response = await fetch('/api/task'); // Assuming you have an API endpoint
    const newData = await response.json();

    // Update the client-side state
    setCurrentDataTask(newData.data);
    // console.log(newData)
  };

  return (
    <>
      <Head>
        <title>Kanban Board</title>
        <meta name="description" content="Manage porject tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BoardPage streams={currentData} refreshData={fetchData} refreshDataTask={fetchDataTask} tasks={currentDataTask} />
    </>
  );
}


export async function getServerSideProps() {
  const filePath = dbDataPath();
  const data = dbDataRead(filePath);
  const filePathTask = dbDataPathTask();
  const dataTask = dbDataReadTask(filePathTask);
  return {
    props: {
      streams: data, tasks: dataTask

    },
    // revalidate: 2
  }
}