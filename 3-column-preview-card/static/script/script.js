import cacheApi from './cache-api.js'
import asyncWrapper from './async-wrapper.js'
// Items to cache
const urls= ['/static/style/css/style.css', '/static/script/cache-api.js', '/static/script/async-wrapper.js', '/static/fonts/LexendDeca-VariableFont_wght.ttf', '/static/fonts/BigShouldersDisplay-VariableFont_wght.ttf', '/static/fonts/fonts.css', '/static/images/icon-suvs.svg', '/static/images/icon-sedans.svg', '/static/images/icon-luxury.svg', '/static/images/favicon-32x32.png'] 



// checking if browser supports Cache API
if('caches' in window) {
	
	// cache API supported 
	const cacheName = '3-column-preview-card'

	// open cache 
	cacheApi.openCache(cacheName, urls)

} else {
	// cache API is not supported 
}

