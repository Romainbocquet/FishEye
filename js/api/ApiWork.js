class ApiWork {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async getWork() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res.media)
            .catch(err => console.log('an error occurs', err))
    }
}


export default class WorksApi extends ApiWork { 
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getWorks() {
        return await this.getWork()
    }
}