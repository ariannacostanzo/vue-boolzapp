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
            messageIdShown: 1,
            isShown: false,
            isWriting: false,
            replies: ['Ok', 'ma stai bene', 'ho conosciuto un ragazzo troppo simpatico', 'come stai?', 'Laura mi ha scritto', 'tutto ok?', 'ok...', 'Va bene', 'Boh ok','💓💓💓','💛💛','Veramente?', 'Non va bene', 'okok', 'ma che dici?', 'non voglio parlare con te adesso', '🌞','😄','sei insopportabile', 'Mi presti 10 euro?', '🤣🤣','vuoi uscire stasera?' ,'🥰🥰🥰🥰🥰🥰🥰', 'ti va una pizza?', 'ho fame', '😋😋😋😋😋😋😋','nerdiamo?', 'ci vediamo una serie nuova assieme?','😑😑😑😑😑😑😑','☹️☹️☹️☹️☹️☹️☹️☹️☹️☹️'],
            emojis: ['💘','💝','💖','💗','💓','💞','💕','💟','❣️','💔','❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍','❤️‍','🔥','❤️‍','🌜️','☀️','🌝','🌞','🪐','💫','⭐️','😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','☺️','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐️','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','😮‍','💨','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','😶‍','🌫️','🥴','😵‍','💫','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤'],
            showEmpty: false,
            showFilter: false,
            filterMessage: '',
            showInfo: false,
            seconds: 0,
            minutes: 0,
            timer: '00:00',
            isRecording: false,
            recordingInterval: null,
            waves: [],
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
                if (message.text.includes(this.filterMessage)) return message
            })
        },
        currentMessage () {
            return this.messages.find((message) => {
                if(message.id === this.messageIdShown) {
                    return message
                }
            })
        },
        
         
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
            this.messageIdShown = 1
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
        //funzione che uso per mostrare l'ultimo messaggio 
        cutMessage(contact) {
            if (contact.messages.length) {
                const lastMessageStatus = contact.messages[contact.messages.length - 1].status
                let lastMessage = contact.messages[contact.messages.length - 1].text
                
                //se il messaggio è più lungo di un tot aggiungo ... per fare vedere che lo sto tagliando
                if (lastMessage.length > 35) {
                    lastMessage = lastMessage.slice(0, 35);
                    lastMessage += '...'
                } 

                //se l'ultimo messaggio è una foto mostra l'icona di foto e foto
                if (lastMessage.includes('<img src=')) lastMessage = '<i class="fa-solid fa-image"></i> Foto'

                //se l'ultimo messaggio è uno inviato spunta tu: messaggio
                if (lastMessageStatus === 'sent') 
                {return `<span class="double-check message-checked me-2"><i class="fa-solid fa-check"></i><i class="fa-solid fa-check"></i></span> Tu: ${lastMessage}`}
                
                return lastMessage
            } else {
                //se non ci sono messaggi non vedo niente
                return ''
            }
            
        }, 
        //mostro la data dell'ultimo messaggio oppure se non ho messaggi mostro oggi oppure niente
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
            const index = this.messages.findIndex((item) => item.id === id);
            this.messages.splice(index, 1)

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
            if (!this.showInfo) {
                this.messages.forEach(() => {
                    this.messages.splice(0, this.messages.length)
                })
                this.showEmpty = false;
            }   else this.showEmpty = false;

            
        },
        //ottengo un item random da un array
        getRandom(array) {
            const randomNumber = Math.floor(Math.random() * (array.length))
            return array[randomNumber]
        },
        getRandomNumber(min, max) {
            return randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min
        },
        //al click prendo un emoji random e l'aggiungo al box per scrivere un messaggio
        printEmoji() {
            const randomEmoji = this.getRandom(this.emojis)
            this.textSent += randomEmoji
        },
        //toggla svuota la chat
        toggleEmpty() {
            if (!this.showInfo) {
                this.showEmpty = !this.showEmpty
            }
            else return
            
        },
        //ottengo il nome del file scelto e lo invio come immagine
        //funziona solo se le immagini sono prese dalla cartella img di questa cartella
        previewFiles(event) {
            const fileName = (event.target.files[0]).name
            const img = `<img src="img/${fileName}" class='sent-image'>`
            this.textSent = img
            this.sendMessage()
            this.textSent = ''
        },
        runningTimer() {
            this.recordingInterval = setInterval(() => {
                this.seconds++;
                this.populatingWaves()

                // se secondi arriva a 60 aumentano i minuti
                if (this.seconds === 60) {
                    this.seconds = 0;
                    this.minutes++;
                }
            
                const formattedSeconds = this.setFullNumbers(this.seconds);
                const formattedMinutes = this.setFullNumbers(this.minutes);
            
                this.timer = formattedMinutes + ':' + formattedSeconds;
            
            }, 1000);
        },
        //funzione che aumenta i secondi durante la registrazione
        recording() {

            this.isRecording = true;
            this.runningTimer()
            
        },
        //ferma il timer e resetta tutti i valori
        stopRecording() {

            this.isRecording = false;
            clearInterval(this.recordingInterval)
            this.seconds = 0;
            this.minutes = 0;
            this.timer = '00:00';
            this.waves = []
        },
        //da implementare
        pauseRecording() {
            clearInterval(this.recordingInterval)
        },
        //aggiunge con l'aumento dei secondi un nuovo oggetto wave con random height
        populatingWaves() {
            const wave = {
                height: this.getRandomNumber(5,35)
            }

            this.waves.push(wave)
            console.log(wave)
            this.deletingWaves()
        },
        //elimina dall'array la prima wave se ce ne sono un tot
        deletingWaves() {
            if (this.waves.length > 36) {
                this.waves.shift()
            }
        }
        
        
    }


});


app.mount('#root');



