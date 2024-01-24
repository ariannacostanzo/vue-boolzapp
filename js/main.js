// console.log(Vue)

const {createApp} = Vue;

const app = createApp ({
    name: 'Boolzapp',
    data() {
        return {
            data,
            userID: 1,
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
            const currentContact = this.currentContact
            return currentContact.messages
        },
        
            
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
        }
        
        
    }




});


app.mount('#root');

