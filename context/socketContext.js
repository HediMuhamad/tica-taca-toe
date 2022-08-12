import { createContext } from 'react'
import { io } from 'socket.io-client'

const socket = io({
	autoConnect: false
});

const SocketContext = createContext();
SocketContext.displayName = "socket_state"
export {SocketContext};

const SocketContextProvider = ({children}) => {
	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	)
}

export default SocketContextProvider;