import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import TableComponent from '../components/table-component/table-component'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tica-Taca-Toe</title>
        <meta name="description" content="Multi-Player and Signle-Player Tic-Tac-Toe Game."/>
        <meta name="keywords" content="tic-tac-toe, tic tac toe, tica-taca-toe, online game, signle player game"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <TableComponent/>
      </main>
    </div>
  )
}
