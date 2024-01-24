// console.log(Vue)

const {createApp} = Vue;

const app = createApp ({
    name: 'Boolzapp',
    data() {
        return {
            data,
            userID: 1,
            textSent: '',
        }
    },
    computed: {
        contacts() {
            return this.data.contacts
        },
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
            let currentDate = ''
            const now = new Date;
            const dayMonthYear = now.toLocaleDateString();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            currentDate = `${dayMonthYear} ${hour}:${minutes}:${seconds}`

            return currentDate
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

        },
        isSent(status) {
            return status === 'sent' 
        },
        sendMessage() {
            const newMessage = {
                id: new Date().toISOString(),
                date: this.currentDate,
                text: this.textSent,
                status: 'sent'
            }

            this.messages.push(newMessage)
            this.textSent =''
        }
        
        
    }




});


app.mount('#root');

