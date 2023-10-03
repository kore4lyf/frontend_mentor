import asyncWrapper from './async-wrapper.js'


// Implementing Cache

// Items to cache 
const urls= ['/static/style/css/style.css', '/static/script/cache-api-config.js', '/static/script/async-wrapper.js', '/static/fonts/LexendDeca-VariableFont_wght.ttf', '/static/fonts/BigShouldersDisplay-VariableFont_wght.ttf', '/static/fonts/fonts.css', '/static/images/icon-suvs.svg', '/static/images/icon-sedans.svg', '/static/images/icon-luxury.svg', '/static/images/favicon-32x32.png'] 



// checking if browser supports Cache API
if('caches' in window) {
	
	// cache API supported 
	const cacheName = '3-column-preview-card'

	// fetch cache with cache name
	const store = await asyncWrapper(caches.open(cacheName))
	
	// load all static files
	await addAllToCache(store, urls)


	await getCachedFileByDir(store, '/static/fonts/*')

	// Getting cached files from the cache 
	// for(let url of urls) {
	//	console.log(await getCachedFile(store, url))
	// }



} else {
	// cache API is not supported 
}



/* 
 * Name: addOneToCache
 * Description: adds a single file to the cache 
 * @filePath: is the absolute path or URL to the file
 */
async function addOneToCache(cache, filePath) {
	return await asyncWrapper(cache.add(filePath))
}


/* 
 * Name: addAllToCache
 * Description: adds a ist of files to the cache 
 * @arr: is an array of urls
 */
async function addAllToCache(cache, arr) {
	return await asyncWrapper(cache.addAll(arr))
}



/* 
 * Name: getCachedFile
 * Description: returns the cached file data from cache
 * @filePath: is the absolute path or URL to the file
 */
async function getCachedFile(cache, filePath) {
	return await asyncWrapper(cache.match(filePath));
}



/* 
 * Name: getCachedFileByDir
 * Description: returns cached file data within a secified directory from cache
 * @dirPath: is the absolute path to the directory
 */
async function getCachedFileByDir(cache, dirPath) {
	const options = {
		ignoreSearch: true,
		ignoreMethod: true,
		ignoreVary: true
	}; 

	return await asyncWrapper(cache.matchAll(dirPath, options));
}



