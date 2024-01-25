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
            isShown: false
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
                id: new Date().toISOString(),
                date: this.currentDate,
                text: 'ok!',
                status: 'received'
            }

            const receiveText = setInterval(() => {
                this.messages.push(newMessageReceived)
                clearInterval(receiveText)
            }, 1000)
            

        },
        setFullNumbers(value) {
            return value.toString().padStart(2, '0')
        },
        cutMessage(contact) {
            const lastMessage = contact.messages[contact.messages.length - 1].text
            const cutMessage = lastMessage.slice(0, 95) + '...'
            return cutMessage
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
            this.filteredMessages.forEach((item, i) => {
                if (id === item.id) {
                    console.log(id)
                    console.log(item)
                    console.log(i)
                    this.filteredMessages.splice(i, 1)
                    console.log(this.filteredMessages)
                }
            })
            
            
        }
    }


});


app.mount('#root');





