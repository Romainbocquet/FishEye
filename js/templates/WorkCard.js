export default class WorkCard {
    constructor(work) {
        this._work = work
    }
    
    createWorkCardPhoto() {
        
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('work-card-wrapper')
        const workCard = `
                <article>
                    <img
                        alt="${this._work.title}"
                        src="${this._work.image}"
                    />
                    <div class="info-img">
                        <h2 class="img-title">${this._work.title}</h2>
                        <span id="img-like">${this._work.likes}</span>
                    </div>
                </article>
        `
        $wrapper.innerHTML = workCard
        return $wrapper
    }

    createWorkCardVideo() {
        
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('work-card-wrapper')
        const workCard = `
                <article>
                    <video controls width="350px" height:"300px">                
                        <source src="${this._work.video}" type="video/mp4">
                    </video>
                    <div class="info-img">
                        <h2 class="img-title">${this._work.title}</h2>
                        <span id="img-like">${this._work.likes}</span>
                    </div>
                </article>
        `
        $wrapper.innerHTML = workCard
        return $wrapper
    }
}
