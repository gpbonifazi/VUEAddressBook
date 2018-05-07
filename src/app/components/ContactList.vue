<template>
    <div id="contact-list" class="container">
        <div>
            <img src="../../../public/images/giglogo.png" alt="Gaming Innovation Group" class="mx-auto d-block img-fluid">
            <h4 class="text-center">Address Book</h4>
        </div>
        <ul class="list-group pull-down">
            <ContactDetail
                id="contact-detail"
                v-for="contact in sharedState.contactsData"
                :key="contact.id"
                :contact="contact"
                :inserting="inserting"
                :updating="updating"
                :eventhandler="eventhandler" />
            <div>
                <div
                    id="no-contact-data"
                    v-if="nocontacts"
                    class="text-center">
                    There are no Contacts in your Address Book. Click the + button to add one.
                </div>
                <div v-if="inserting" >
                    <ContactAdd
                        @cancel-add="cancelAdd"
                        @confirm-add="confirmAdd" />
                </div>
                <ButtonAction
                    id="button-add"
                    v-if="!inserting"
                    :disabled="updating"
                    title="Add a Contact"
                    type="add"
                    @click="addingContact" />

            </div>
        </ul>
    </div>
</template>

<script>
import {contactstore} from '../stores/contactstore.js';
import ContactDetail from './ContactDetail.vue';
import ContactAdd from './ContactAdd.vue';
import ButtonAction from './ButtonAction.vue';

export default {
    name: 'ContactList',
    props: {
        eventhandler: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            sharedState: contactstore.state,
            inserting: false,
            updating: false,
            addressbook: [],
            clone: {}
        };
    },
    mounted() {
        var self = this;
        if (localStorage.getItem('addressbook')) {
            self.sharedState.contactsData = JSON.parse(
                localStorage.getItem('addressbook')
            );
        }
        self.addressbook = self.sharedState.contactsData;

        let cloneArray = _.filter(self.addressbook, function(contact) {
            return contact.updating === true;
        });

        if (cloneArray.length == 1) {
            cloneArray[0].updating = false;
            cloneArray[0].deleting = false;
            this.clone = cloneArray[0];
        }

        // Event Listeners
        self.eventhandler.$on('editing-contact', function(args) {
            self.editingContact(args);
        });
        self.eventhandler.$on('deleting-contact', function(args) {
            self.deletingContact(args);
        });
        self.eventhandler.$on('confirm-delete', function(args) {
            self.confirmDelete(args);
        });
        self.eventhandler.$on('confirm-edit', function(args) {
            self.confirmEdit(args);
        });
        self.eventhandler.$on('cancel-edit', function(args) {
            self.cancelEdit(args);
        });
        self.eventhandler.$on('changed-country', function(args) {
            self.changeCountry(args);
        });
        self.eventhandler.$on('adding-contact', function(args) {
            self.addingContact(args);
        });
    },
    watch: {
        addressbook: {
            handler() {
                // console.log('Address Book changed!');
                localStorage.setItem(
                    'addressbook',
                    JSON.stringify(this.sharedState.contactsData)
                );
            },
            deep: true
        }
    },
    components: {
        ContactDetail,
        ContactAdd,
        ButtonAction
    },
    computed: {
        nocontacts: function() {
            var nodata = false;
            if (this.sharedState.contactsData.length === 0 && !this.inserting) {
                nodata = true;
            }
            return nodata;
        }
    },
    methods: {
        editingContact(args) {
            this.clone = _.cloneDeep(args.data.contact);
            this.inserting = false;
            this.updating = true;
            args.data.contact.updating = true;
        },
        deletingContact(args) {
            this.clone = _.cloneDeep(args.data.contact);
            this.inserting = false;
            this.updating = true;
            args.data.contact.deleting = true;
        },
        addingContact() {
            this.clone = {};
            this.inserting = true;
        },
        confirmDelete(args) {
            var index = _.findIndex(
                this.sharedState.contactsData,
                args.data.contact
            );
            this.sharedState.contactsData.splice(index, 1);
            this.updating = false;
        },
        confirmEdit(args) {
            args.data.contact.updating = false;
            this.updating = false;
            this.clone = {};
        },
        confirmAdd(args) {
            this.sharedState.contactsData.push(args.data.contact);
            this.inserting = false;
        },
        cancelEdit(args) {
            var index = _.findIndex(
                this.sharedState.contactsData,
                args.data.contact
            );
            this.clone.updating = false;
            this.sharedState.contactsData.splice(index, 1, this.clone);
            // this.sharedState.contactsData[index] = this.clone;
            this.updating = false;
            this.deleting = false;
            this.clone = {};
        },
        cancelAdd(args) {
            this.inserting = false;
        },
        changeCountry(args) {
            var index = _.findIndex(
                this.sharedState.contactsData,
                args.data.contact
            );
            this.sharedState.contactsData[index].country = args.data.country;
        }
    }
};
</script>

<style lang="scss" scoped>
#contact-list {
}
#contact-detail {
}
#no-contact-data {
    margin: 15px;
}
#button-add {
    float: right;
}
</style>
