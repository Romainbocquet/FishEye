import RatingSorterApi from "../lib/sorter/index.js";

export default class ProxyRatingSorter {
    constructor() {
        this.cache = []
    }

    async sorter(media, orderBy) {
        
        const cachedResult = this.cache.find(elt => elt.key === orderBy)

        if (cachedResult) {
            console.log('get from cache')

            return cachedResult
        }

        const data = await RatingSorterApi.sorter(media, orderBy)

        this.cache.push(data)
        return data
    }
}
