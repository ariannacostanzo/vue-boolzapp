// console.log(Vue)

const {createApp} = Vue;

const app = createApp ({
    name: 'Boolzapp',
    data() {
        return {
            data,
            userID: 0,
        }
    },
    computed: {
        contacts() {
            return this.data.contacts
        },
        messages() {
            return this.contacts.filter((contact) => {
                if (this.userID === contact.id) {
                    console.log(this.userID)
                    console.log(contact.messages)
                    return contact.messages
                }
            })
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
                    console.log(contact.messages)
                    console.log('userId dopo:' +this.userID)
                    return
                } 
            })

        },
        printMessages(id) {

        }
    }




});


app.mount('#root');

//al click di una chat devo fare in modo che appaia l'oggetto messaggi di quella persona
