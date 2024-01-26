// console.log(Vue)

const {createApp} = Vue;


const app = createApp ({
    name: 'Boolzapp',
    // Variabili iniziali
    data() {
        return {
            data,
            user: data.user,
            contacts: data.contacts,
            userID: 1,
            textSent: '',
            filteredName: '',
            messageIdShown: 0,
            isShown: false,
            isWriting: false,
            replies: ['Ok', 'ma stai bene', 'ho conosciuto un ragazzo troppo simpatico', 'come stai?', 'Laura mi ha scritto', 'tutto ok?', 'ok...', 'Va bene', 'Boh ok','💓💓💓','💛💛','Veramente?', 'Non va bene', 'okok', 'ma che dici?', 'non voglio parlare con te adesso', '🌞','😄','sei insopportabile', 'Mi presti 10 euro?', '🤣🤣','vuoi uscire stasera?' ,'🥰🥰🥰🥰🥰🥰🥰', 'ti va una pizza?', 'ho fame', '😋😋😋😋😋😋😋','nerdiamo?', 'ci vediamo una serie nuova assieme?','😑😑😑😑😑😑😑','☹️☹️☹️☹️☹️☹️☹️☹️☹️☹️'],
            emojis: ['💘','💝','💖','💗','💓','💞','💕','💟','❣️','💔','❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍','❤️‍','🔥','❤️‍','🌜️','☀️','🌝','🌞','🪐','💫','⭐️','😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐️','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','😮‍','💨','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','😶‍','🌫️','🥴','😵‍','💫','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤'],
            showEmpty: false,
        }
    },
    computed: {
        // contacts() {
        //     return this.data.contacts
        // },
        currentContact() {
            return this.contacts.find((contact) => {
                if (this.userID === contact.id) return contact
            })
        },
        messages() {
            const currentContact = this.currentContact;
            return currentContact.messages
        },
        
        //array che mostro per filtrare i contatti
        filteredContacts() {
            return this.contacts.filter((contact) => {
                const lowerName = contact.name.toLowerCase();
                const filteredLower = this.filteredName.toLowerCase();
                return lowerName.includes(filteredLower)
            })
        },
        //array di messaggio che mostro per filtrarli
        filteredMessages() {
            return this.messages.filter((message) => {
                return message
            })
        }
        
         
    },
    methods: {
        //questa era il vecchio modo di formattare la data
        // currentDate() {
        //     let currentFullDate = ''
        //     const now = new Date;
        //     const currentDate = `${this.setFullNumbers(now.getDate())}/${this.setFullNumbers(now.getMonth() + 1)}/${now.getFullYear()}`;
        //     const currentTime = `${this.setFullNumbers(now.getHours())}:${this.setFullNumbers(now.getMinutes())}:${this.setFullNumbers(now.getSeconds())}`;
        //     currentFullDate = `${currentDate} ${currentTime}`
        //     return currentFullDate

        // },
        //nuovo modo più simile a whatsapp, mostro solo l'ora e i minuti dei nuovi messaggi
        currentDate() {
            let currentFullDate = ''
            const now = new Date;
            const currentTime = `${this.setFullNumbers(now.getHours())}:${this.setFullNumbers(now.getMinutes())}`;
            currentFullDate = `${currentTime}`
            return currentFullDate

        },
        //ottengo l'id dell'utente mostrato
        getCurrentContact(id) {
             this.contacts.forEach((contact) => {
                if (id === contact.id) {
                    this.userID = contact.id
                    return
                } 
            })
            this.messageIdShown = 0
        },
        //funzione che serve ad impostare la classe sent o received
        isSent(status) {
            return status === 'sent' 
        },
        addMessage(text, status) {
            const newMessageSent = {
                id: new Date().getTime(),
                date: this.currentDate(),
                text,
                status
            }

            this.messages.push(newMessageSent)
        },
        //funzione per inviare un nuovo messaggio, dopo 3 secondi mi arriva un messaggio
        sendMessage() {
            

            this.addMessage(this.textSent, 'sent')
            //svuoto il campo
            this.textSent =''
            
            //is Writing
            this.isWriting = true;

            setTimeout(() => {
                this.addMessage(`${this.getRandom(this.replies)}`, 'received')
                this.isWriting = false;
            }, 3000)

        },
        //funzione che uso per mettere uno 0 davanti al numero se non è decimale
        setFullNumbers(value) {
            return value.toString().padStart(2, '0')
        },
        //funzione che uso per mostrare l'ultimo messaggio che non supera i 95 caratteri(perchè poi aumentano
        //la dimensione della casella contatti) oppure se non ho messaggi mi ritorna niente
        cutMessage(contact) {
            if (contact.messages.length) {
                const lastMessage = contact.messages[contact.messages.length - 1].text
                if (lastMessage.includes('<img src=')) {
                    return '<i class="fa-solid fa-image"></i> Foto'
                }
                const cutMessage = lastMessage.slice(0, 95) + '...'
                return cutMessage
            } else {
                return ''
            }
            
        }, 
        //mostro la data dell'ultimo messaggio oppure se non ho messaggi mostro oggi
        showDate(contact, testo) {
            if (contact.messages.length) {
                
                return contact.messages[contact.messages.length - 1].date
            } else return testo
        },
        //toggla isShown
        showDelete(currentMessage) {
            this.messageIdShown = currentMessage.id
            this.isShown = !this.isShown
        },
        //toggla il div di cancella messaggio in base a isShown e l'id del messaggio
        checkIdMessage(id) {
            if (id === this.messageIdShown) 
            return this.isShown
        },
        //cliccando 'cancella messaggio' il messaggio relativo viene rimosso da messages
        deleteMessage(id) {
            this.messages.forEach((item, i) => {
                if (id === item.id) this.messages.splice(i, 1)
            })
            
        },
        //premendo la x pulisco il filtro contatti
        clearFilter() {
            this.filteredName = ''
        },
        //Se l'utente è quello della chat mostrata e is writing è vero spunta sennò spunta l'ultimo messaggio(o niente se non ci sono messaggi)
        showIsWriting(id, cont) {
            if (this.isWriting && id === this.currentContact.id) {
                return 'Sta scrivendo...'
            } else return this.cutMessage(cont)      
        },
        //attiva la class is writing se l'utente è quello della chat mostrata e is writing è vero
        showIsWritingClass(id) {
            if (this.isWriting && id === this.currentContact.id) {
                return 'writing'
            } else return ''     
        },
        //svuoto i messaggi dell'utente relativo e nascondo empty chat
        emptyChat() {
            this.messages.forEach(() => {
                this.messages.splice(0, this.messages.length)
            })
            this.showEmpty = false;
        },
        //ottengo un item random da un array
        getRandom(array) {
            const randomNumber = Math.floor(Math.random() * (array.length))
            return array[randomNumber]
        },
        //al click prendo un emoji random e l'aggiungo al box per scrivere un messaggio
        printEmoji() {
            const randomEmoji = this.getRandom(this.emojis)
            this.textSent += randomEmoji
        },
        //toggla svuota la chat
        toggleEmpty() {
            this.showEmpty = !this.showEmpty
        },
        //ottengo il nome del file scelto e lo invio come immagine
        previewFiles(event) {
            const fileName = (event.target.files[0]).name
            const img = `<img src="img/${fileName}" class='sent-image'>`
            this.textSent = img
            this.sendMessage()
            this.textSent = ''
        },
        
    }


});


app.mount('#root');







