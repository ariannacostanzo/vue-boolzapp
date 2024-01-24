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
        // messages() {
        //     return this.contacts.messages
        // }
            
    },
    methods: {
        filteredMessages(id) {
            console.log(id)
            const filteredMessages = this.contacts.filter((contact) => {
                if (id === contact.id) {
                    console.log('è uguale')
                } else {
                    console.log(' non è uguale')
                }
            })

            console.log(filteredMessages)
            return filteredMessages
        }
    }




});


app.mount('#root');