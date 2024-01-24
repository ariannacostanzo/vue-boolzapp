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

//al click di una chat devo fare in modo che appaia l'oggetto messaggi di quella persona


contatti = data.contacts

contatti.forEach((item) => {

    console.log(item)

    console.log( item.messages)
   

}) 