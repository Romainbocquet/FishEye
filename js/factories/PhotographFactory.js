class PhotographFactory {
    constructor(data, type) {
        if (type === 'photograph') {
            return new Photograph(data)
        } 
        else {
            throw 'Unknown type format'
        }
    }
}
