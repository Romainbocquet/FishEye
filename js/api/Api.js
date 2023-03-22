class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res.data)
            .catch(err => console.log('an error occurs', err));
    }
}

export default class PhotographApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url);
    }

    async getPhotographs() {
        return await this.get();
    }
}