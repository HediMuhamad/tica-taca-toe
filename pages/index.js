import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import TableComponent from '../components/table-component/table-component'
import PropertiesComponent from '../components/properties-component/properties-component'
import SettingsComponent from '../components/settings-component/settings-component'
import ThemeControllerComponent from '../components/theme-controller-component/theme-controller-component'

import AppContextProvider from '../context/appContext'
import PropertiesContextProvider from '../context/propertiesContext'
import SettingsContextProvider from '../context/settingsContext'
import TableContextProvider from '../context/tableContext'

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
        <AppContextProvider>
          <TableContextProvider>
            <TableComponent/>
          </TableContextProvider>
          <PropertiesContextProvider>
            <PropertiesComponent/>
          </PropertiesContextProvider>
          <SettingsContextProvider>
            <SettingsComponent/>
          </SettingsContextProvider>
          <ThemeControllerComponent/>
        </AppContextProvider>
      </main>
    </div>
  )
}
