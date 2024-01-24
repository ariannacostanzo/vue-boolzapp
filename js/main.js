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
             const currentContact = this.contacts.find((contact) => {
                if (this.userID === contact.id) {
                    return contact
                }
            })
            return currentContact
        },
        messages() {
            const currentContact = this.currentContact
            return currentContact.messages
        }
            
    },
    methods: {
        getCurrentContact(id) {
            console.log('id premuto:' + id)
            console.log('userId prima:' + this.userID)
             this.contacts.forEach((contact) => {
                if (id === contact.id) {
                    console.log('è uguale')
                    this.userID = contact.id
                    console.log('userId dopo:' +this.userID)
                    return
                } 
            })

        },
        
    }




});


app.mount('#root');

//al click di una chat devo fare in modo che appaia l'oggetto messaggi di quella persona


contatti = data.contacts

contatti.forEach((item) => {

    console.log(item)

    console.log( item.messages)
   

}) 