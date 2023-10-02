// warps asyn await 
const asyncWrapper = async (prom) => {
	try {
		return await prom
	} 
	catch(err) {
		console.log(err.message)
	}
}


export default asyncWrapper
