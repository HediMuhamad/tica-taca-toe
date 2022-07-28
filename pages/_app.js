import '../styles/globals.scss'
import '../styles/font-styles.scss'

import AppContextProvider from '../context/appContext'
import TableContextProvider from '../context/tableContext'
import PropertiesContextProvider from '../context/propertiesContext'
import SettingsContextProvider from '../context/settingsContext'
import Persistor from '../context/persistor'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <TableContextProvider>
        <PropertiesContextProvider>
          <SettingsContextProvider>
            <Persistor persistnessName={"tica_taca_toe"}>
              <Component {...pageProps} />
            </Persistor>
          </SettingsContextProvider>
        </PropertiesContextProvider>
      </TableContextProvider>
    </AppContextProvider>
  )
}

export default MyApp
