import asyncWrapper from './async-wrapper.js'


// Implementing Cache

// Items to cache 
const urls= ['/static/style/css/style.css', '/static/script/cache-api-config.js', '/static/script/async-wrapper.js'] 



// checking if browser supports Cache API
if('caches' in window) {
	const cacheName = '3-column-preview-card'

	const store = await asyncWrapper(caches.open(cacheName))
	console.log(store)
	
	// Add Static files to cache
	async function addToCache(filePath) {
		return await asyncWrapper(store.addAll(filePath))
	}
	//await addToCache('./static/style/css/style.css')
	await addToCache('/static/style/css/style.css')
	await addToCache('/static/*')


	const getCachedFilesByPath = async (filePath) => {
		return await asyncWrapper( store.matchAll(filePath));
	}
	console.log(await getCachedFilesByPath('/static/*'))

	// store.then((res) => res.add('/static/style/css/style.css'))


	// cache API supported 
	// console.log("Oh yea");	
} else {
	// cache API is not supported 
	console.log("Oh no");	
}


//console.log(window.cache)

