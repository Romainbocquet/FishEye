export default class PhotographersCard {
    constructor(photograph) {
        this._photograph = photograph;

        this.$wrapperPhotographCard = document.createElement('div');
        this.$wrapperPhotographCard.classList.add('photograph-card-wrapper');

        this.$wrapperPhotographBanner = document.createElement('div');
        this.$wrapperPhotographBanner.classList.add('photograph-banner-wrapper');

    }

    createPhotographCard() {
        const photographCard = `
            <a href="photograph.html?id=${this._photograph.id}" alt="${this._photograph.name}">
                <article>
                    <img
                        alt="${this._photograph.name}"
                        src="${this._photograph.portrait}"
                    />
                    <h2 class="photographer-name">${this._photograph.name}</h2>
                    <p class="info">
                        <span id="location">${this._photograph.location}</span>
                        <span id="tagline">${this._photograph.tagline}</span>
                        <span id="price">${this._photograph.price}</span>
                    </p>
                </article>
            </a>
        `;

        this.$wrapperPhotographCard.innerHTML = photographCard;
        return this.$wrapperPhotographCard;
    }

    openContactModal() {
        const buttonOpen = this.$wrapperPhotographBanner.querySelector('.contact-button');
        const contactModal = this.$wrapperPhotographBanner.querySelector('.modal-contact');
        const buttonClose = this.$wrapperPhotographBanner.querySelector('.close-contact');

        buttonOpen.addEventListener('click', e => {
            e.preventDefault();
            contactModal.classList.add('open');
        });
        buttonClose.addEventListener('click', e => {
            e.preventDefault();
            contactModal.classList.remove('open');
        });
    }

    regExEmail(value) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    regExNomPrenom(value) {
        return /^[A-Za-z]{2,20}$/.test(value);
    }

    regExMessage(value) {
        return /^[A-Za-z0-9]{1,5000}$/.test(value);
    }

    testMail(mail) {
        let emailError = this.$wrapperPhotographBanner.querySelector('#email-error');

        if (this.regExEmail(mail)) {
            emailError.classList.remove('d-show');
            return true;
        } else {
            emailError.classList.add('d-show');
            return false;
        }
    }

    testNom(nom) {
        let nomError = this.$wrapperPhotographBanner.querySelector('#nom-error');

        if (this.regExNomPrenom(nom)) {
            nomError.classList.remove('d-show');
            return true;
        } else {
            nomError.classList.add('d-show');
            return false;
        }
    }


    testPrenom(prenom) {
        let prenomError = this.$wrapperPhotographBanner.querySelector('#prenom-error');

        if (this.regExNomPrenom(prenom)) {
            prenomError.classList.remove('d-show');
            return true;
        } else {
            prenomError.classList.add('d-show');
            return false;
        }
    }

    testMessage(message) {
        let messageError = this.$wrapperPhotographBanner.querySelector('#message-error');

        if (this.regExMessage(message)) {
            messageError.classList.remove('d-show');
            return true;
        } else {
            messageError.classList.add('d-show');
            return false;
        }
    }

    keepFocusOnModal() {
                // add all the elements inside modal which you want to make focusable
                const  focusableElements =
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
                const modal = this.$wrapperPhotographBanner.querySelector('.modal-contact'); // select the modal by it's id
                const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
                const focusableContent = modal.querySelectorAll(focusableElements);
                const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
        
        
                document.addEventListener('keydown', function(e) {
                let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
        
                if (!isTabPressed) {
                return;
                }
        
                if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
                }
                } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
                }
                }
                });
        
                firstFocusableElement.focus(); 
    }

    envoyerContactModal() {
        let contactModal = this.$wrapperPhotographBanner.querySelector('.modal-contact');
        let buttonEnvoyer = this.$wrapperPhotographBanner.querySelector('#send-button');
        let nomValue = this.$wrapperPhotographBanner.querySelector('#nom');
        let prenomValue = this.$wrapperPhotographBanner.querySelector('#prenom');
        let emailValue = this.$wrapperPhotographBanner.querySelector('#email');
        let messageValue = this.$wrapperPhotographBanner.querySelector('#message');
        const contactObj = {}; // objet contenant les informations du formulaire 

        buttonEnvoyer.addEventListener('click', e => {
            e.preventDefault();
            this.testMail(emailValue.value);
            this.testNom(nomValue.value);
            this.testPrenom(prenomValue.value);
            this.testMessage(messageValue.value);
            if (this.testMail(emailValue.value) && this.testNom(nomValue.value) && this.testPrenom(prenomValue.value) && this.testMessage(messageValue.value)) {
                contactModal.classList.remove('open');
                contactObj.nom = nomValue.value;
                contactObj.prenom = prenomValue.value;
                contactObj.email = emailValue.value;
                contactObj.message = messageValue.value;
                console.log(contactObj);
            }
        });
    }

    createPhotographBanner() {
        const $workCards = document.querySelectorAll('.work-card-wrapper');
        const $hearthList = document.querySelectorAll('.img-like');
        let totalLikes = 0;

        $hearthList.forEach(($hearth) => {
            $hearth.addEventListener('click', () => {
                if ($hearth.classList.contains('liked')) {
                    totalLikes += 1;
                } else {
                    totalLikes -= 1;
                }
                const $totalLikeElement = document.querySelector('.total-like');
                $totalLikeElement.textContent = `${totalLikes}`;
            });
        });

        // Boucler à travers chaque élément work-card-wrapper pour obtenir la valeur totale de likes
        $workCards.forEach($card => {
            // Obtenir la valeur de like pour cet élément work-card-wrapper
            const likes = parseInt($card.querySelector('#like-value').textContent);
            // Ajouter la valeur de like à la variable totale de likes
            totalLikes += likes;
        });

        const photographCard = `
                <article class="photograph-work">
                    <div class="photograph-info">
                        <h1 class="photographer-name">${this._photograph.name}</h1>
                        <p class="info">
                            <span id="location">${this._photograph.location}</span>
                            <span id="tagline">${this._photograph.tagline}</span>
                        </p>
                    </div>
                    <button class="contact-button" alt="contact me">Contactez-moi</button>
                    <div class="modal-contact" alt="contact me, ${this._photograph.name}" aria-labeledby="contact title">
                    <form>
                        <h3 for="contact title">Contactez-moi <br>${this._photograph.name}</h3>
                        <label for="prenom">Prénom *</label>
                        <input type="text" name="name" id="prenom" alt="first name">
                        <p id="prenom-error">Prénom incorrect</p>
                        <label for="nom">Nom *</label>
                        <input type="text" name="last-name" id="nom" alt="last name">
                        <p id="nom-error">Nom incorrect</p>
                        <label for="email">Email *</label>
                        <input type="email" name="email" id="email" alt="email">
                        <p id="email-error">Email incorrect</p>
                        <label for="message">Votre message *</label>
                        <input type="text" name="message" id="message" alt="your message">
                        <p id="message-error">Veuillez renseigner un massage</p>
                        <input type="button" id="send-button" alt="Send" value="Envoyer">
                        <button class="close-contact" alt="close contact form"><i class="fa-sharp fa-solid fa-xmark"></i></button>
                    </form>
                </div>
                    <img
                        alt="${this._photograph.name}"
                        src="${this._photograph.portrait}"
                        class="photograph-profil-picture"
                    />
                </article>
                <div class="bottom-section">
                    <span class="total-like">${totalLikes}</span><i class="fa-solid fa-heart"></i> 
                    <span class="photographer-price">${this._photograph.price}</span>
                </div>
        `;



        this.$wrapperPhotographBanner.innerHTML = photographCard;
        this.openContactModal();
        this.envoyerContactModal();
        this.keepFocusOnModal();

        return this.$wrapperPhotographBanner;
    }
}
