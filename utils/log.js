async function log(loggerName, action, msg){

	msg = {loggerName: loggerName, action: action, ...msg};
	
	try{
		await fetch(process.env.LOGGER_URL,{
			method: "POST",
			body: JSON.stringify(msg),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
	}catch(err){
		console.log(`LOG_ERROR_NO: ${err.errno}`);
		// console.log(err);
	}
}

export default log;
