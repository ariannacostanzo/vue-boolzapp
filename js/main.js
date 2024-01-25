// console.log(Vue)

const {createApp} = Vue;


const app = createApp ({
    name: 'Boolzapp',
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
            replies: ['Ok', 'ok...', 'Va bene', 'Boh ok', 'Veramente?', 'Non va bene', 'okok', 'ma che dici?', 'non voglio parlare con te adesso', 'sei insopportabile', 'Mi presti 10 euro?', 'vuoi uscire stasera?' , 'ti va una pizza?', 'ho fame', 'nerdiamo?', 'ci vediamo una serie nuova assieme?']
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
        currentDate() {
            let currentFullDate = ''
            const now = new Date;
            const currentDate = `${this.setFullNumbers(now.getDate())}/${this.setFullNumbers(now.getMonth() + 1)}/${now.getFullYear()}`;
            const currentTime = `${this.setFullNumbers(now.getHours())}:${this.setFullNumbers(now.getMinutes())}:${this.setFullNumbers(now.getSeconds())}`;
            currentFullDate = `${currentDate} ${currentTime}`
            return currentFullDate

        },
        filteredContacts() {
            return this.contacts.filter((contact) => {
                const lowerName = contact.name.toLowerCase();
                const filteredLower = this.filteredName.toLowerCase();
                return lowerName.includes(filteredLower)
            })
        },
        filteredMessages() {
            return this.messages.filter((message) => {
                return message
            })
        }
        
         
    },
    methods: {
        getCurrentContact(id) {
             this.contacts.forEach((contact) => {
                if (id === contact.id) {
                    this.userID = contact.id
                    return
                } 
            })
            this.messageIdShown = 0
        },
        isSent(status) {
            return status === 'sent' 
        },
        sendMessage() {
            const newMessageSent = {
                id: new Date().toISOString(),
                date: this.currentDate,
                text: this.textSent,
                status: 'sent'
            }

            this.messages.push(newMessageSent)
            this.textSent =''

            const newMessageReceived = {
                id: new Date(),
                date: this.currentDate,
                text: `${this.getRandomReply(this.replies)}`,
                status: 'received'
            }
            
            //is Writing
            this.isWriting = true;
            const receiveText = setInterval(() => {
                this.isWriting = false;
                this.messages.push(newMessageReceived)
                clearInterval(receiveText)
            }, 3000)
            

        },
        setFullNumbers(value) {
            return value.toString().padStart(2, '0')
        },
        cutMessage(contact) {
            if (contact.messages.length) {
                const lastMessage = contact.messages[contact.messages.length - 1].text
                const cutMessage = lastMessage.slice(0, 95) + '...'
                return cutMessage
            } else {
                return ''
            }
            
        }, 
        showDate(contact) {
            if (contact.messages.length) {
                return contact.messages[contact.messages.length - 1].date
            } else return 'oggi'
        },
        showDelete(currentMessage) {
            this.messageIdShown = currentMessage.id
            this.isShown = !this.isShown
        },
        checkIdMessage(id) {
            if (id === this.messageIdShown) 
            return this.isShown
        },
        deleteMessage(id) {
            this.messages.forEach((item, i) => {
                if (id === item.id) this.messages.splice(i, 1)
            })
        },
        clearFilter() {
            this.filteredName = ''
        },
        showIsWriting(id, cont) {
            if (this.isWriting && id === this.currentContact.id) {
                return 'Sta scrivendo...'
            } else return this.cutMessage(cont)      
        },
        showIsWritingClass(id) {
            if (this.isWriting && id === this.currentContact.id) {
                return 'writing'
            } else return ''     
        },
        emptyChat() {
            this.messages.forEach(() => {
                this.messages.splice(0, this.messages.length)
            })
        },
        getRandomReply(array) {
            const randomNumber = Math.floor(Math.random() * (array.length))
            return array[randomNumber]
        }

    }


});


app.mount('#root');





