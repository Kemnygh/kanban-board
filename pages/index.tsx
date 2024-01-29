import Head from "next/head";
import BoardPage from "@/components/board/board-page";
import Providers from "@/components/providers";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Kanban Board</title>
        <meta name="description" content="Manage porject tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Providers>
        <BoardPage />
      </Providers>
    </>
  );
}
