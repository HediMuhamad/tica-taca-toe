import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import TableComponent from '../components/table-component/table-component'
import PropertiesComponent from '../components/properties-component/properties-component'
import SettingsComponent from '../components/settings-component/settings-component'
import ThemeControllerComponent from '../components/theme-controller-component/theme-controller-component'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

export default function Home() {

  const theme = useContext(AppContext).props.theme;

  return (
    <div className={styles.container} theme={theme} >
      <Head>
        <title>Tica-Taca-Toe</title>
        <meta name="description" content="Multi-Player and Signle-Player Tic-Tac-Toe Game."/>
        <meta name="keywords" content="tic-tac-toe, tic tac toe, tica-taca-toe, online game, signle player game"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>          
          <TableComponent/>
          <PropertiesComponent/>
          <SettingsComponent/>
          <ThemeControllerComponent/>
      </main>
    </div>
  )
}
