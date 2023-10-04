import asyncWrapper from './async-wrapper.js'


// Implementing Cache



/* 
 * Name: cacheExists
 * Description: checks if cache name already exists in caches 
 * @cacheName: represents cache name
 */
async function cacheExists(cacheName) {
	return await asyncWrapper(caches.has(cacheName))
}




/* 
 * Name: openCache
 * Description: opens cache with @cacheName. It uses localStorage manage when the referesh the localStorage
 * @cacheName: represents cache name
 */
async function openCache(cacheName, urls) {
	const cache =await asyncWrapper(cacheExists(cacheName))
	if(cache) {
		if(cacheIsValid(cacheName)) {
			const store = await asyncWrapper(caches.open(cacheName))
			return store
		} else {

			console.log("Expired")
			await asyncWrapper(caches.delete(cacheName))
			const store = await createCache(cacheName, urls) 
			return store

		}
		


	} else {
		const store = await createCache(cacheName, urls) 
		return store
	}
}





/* 
 * Name: createCahe
 * Description: opens cache with cache name and sets the cache's expiry date in localStorage 
 * @cacheName: represents cache Name
 */
async function createCache(cacheName, urls) {
	const store = await asyncWrapper(caches.open(cacheName))
	await addAllToCache(store, urls)
	setCacheExpiryDate(cacheName)

	return store
}



/* 
 * Name: cacheIsValid
 * Description: checks if cache is valod or expired
 * @cacheName: represents cache Name
 */
function cacheIsValid(cacheName) {
	const expiryDate = parseInt(getCacheExpiryDate(cacheName))
	const currentDate = new Date().getTime()
	if(currentDate <= expiryDate) return true 
	else return false
}




/* 
 * Name: setCacheExpiryDate
 * Description: sets an exipiration date for a specified cache name 
 * @cacheName: represents cache name
 */
function setCacheExpiryDate(cacheName, days = 1) {
	let oneDay = new Date().getTime() + (days * 24 * 60 * 60 * 1000);
	localStorage.setItem('cacheName', `${oneDay}`)
}



/* 
 * Name: setCacheExpiryDate
 * Description: the  an exipiration date for a specified cache name 
 * @cacheName: represents cache name
 */
function getCacheExpiryDate(cacheName) {
	return localStorage.getItem('cacheName')
}



/* 
 * Name: addOneToCache
 * Description: adds a single file to the cache 
 * @cache: represents the cache store 
 * @filePath: is the absolute path or URL to the file
 */
async function addOneToCache(cache, filePath) {
	return await asyncWrapper(cache.add(filePath))
}



/* 
 * Name: addAllToCache
 * Description: adds a ist of files to the cache 
 * @cache: represents the cache store 
 * @urls: is an array of urls
 */
async function addAllToCache(cache, urls) {
	return await asyncWrapper(cache.addAll(urls))
}



/* 
 * Name: getCachedFile
 * Description: returns the cached file data from cache
 * @cache: represents the cache store 
 * @filePath: is the absolute path or URL to the file
 */
async function getCachedFile(cache, filePath) {
	return await asyncWrapper(cache.match(filePath))
}



/* 
 * Name: getCachedUrls
 * Description: returns the url or path to each cached files
 * @cache: represents the cache store 
 */
async function getCachedUrls(cache) {
	const requests = await asyncWrapper(cache.keys())
	const urls = []
	
	for(let request of requests) {
		urls.push(request.url)
	}

	return urls
}



/* 
 * Name: getCachedFileByDir
 * Description: returns cached file data within a secified directory from cache
 * @cache: represents the cache store 
 * @dirPath: is the absolute path to the directory
 */

async function getCachedFileByDir(cache, dirPath) {
	const urls = await getCachedUrls(cache, dirPath)
	const matchingDir = []

	for(let url of urls) {
		if(url.includes(dirPath)) matchingDir.push(url)	
	}

	return matchingDir 
}




export default { 
	cacheExists, 
	openCache, 
	setCacheExpiryDate,
	getCacheExpiryDate,
	addOneToCache,
	addAllToCache,
	getCachedFile,
	getCachedUrls,
	getCachedFileByDir
}

