<template>
    <li class="list-group-item">
        <div class="row w-100">
            <div class="col-12 col-sm-6 col-md-12 text-center text-sm-left">
                <div id="contact-icon-actions">
                    <IconAction
                        v-if="!updating"
                        id="contact-icon-edit"
                        type="edit"
                        :contact="contact"
                        @click="editingContact(contact)" />
                    <IconAction
                        v-if="!updating"
                        id="contact-icon-delete"
                        type="delete"
                        :contact="contact"
                        @click="deletingContact(contact)" />
                </div>
                <div
                    id="contact-details">
                    <label class="name lead"> {{ contact.firstname }} {{ contact.lastname }} </label>
                    <br>
                    <span class="fa fa-envelope fa-fw text-muted" data-toggle="tooltip" data-original-title="" title=""></span>
                    <span class="text-muted text-truncate"> {{ contact.email }} </span>
                    <br>
                    <span class="fa fa-user fa-fw text-muted" data-toggle="tooltip" data-original-title="" title=""></span>
                    <span class="text-muted text-truncate"> {{ contact.id }} </span>
                    <br>
                    <span class="fa fa-map-marker fa-fw text-muted" data-toggle="tooltip" title="" data-original-title="5842 Hillcrest Rd"></span>
                    <span class="text-muted"> {{ contact.country }} </span>
                </div>
            </div>
            <div
                id="contact-edit">
                <ContactEdit
                    v-if="contact.updating || contact.deleting"
                    :contact="contact"
                    @changed-country="changeCountry"
                    @cancel-edit="cancelEdit(contact)"
                    @confirm-edit="confirmEdit(contact)"
                    @confirm-delete="confirmDelete(contact)" />
            </div>
        </div>
    </li>
</template>

<script>
import ContactEdit from './ContactEdit.vue';
import IconAction from './IconAction.vue';

export default {
    name: 'ContactDetail',
    props: {
        eventhandler: {
            type: Object,
            required: true
        },
        contact: {
            type: Object,
            required: true
        },
        inserting: {
            type: Boolean,
            required: true,
            default: false
        },
        updating: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    components: {
        ContactEdit,
        IconAction
    },
    methods: {
        editingContact: function(contact) {
            this.eventhandler.$emit('editing-contact', {
                data: {
                    contact: contact
                }
            });
        },
        deletingContact: function(contact) {
            this.eventhandler.$emit('deleting-contact', {
                data: {
                    contact: contact
                }
            });
        },
        confirmDelete: function(contact) {
            this.eventhandler.$emit('confirm-delete', {
                data: {
                    contact: contact
                }
            });
        },
        confirmEdit: function(contact) {
            this.eventhandler.$emit('confirm-edit', {
                data: {
                    contact: contact
                }
            });
        },
        cancelEdit: function(contact) {
            this.eventhandler.$emit('cancel-edit', {
                data: {
                    contact: contact
                }
            });
        },
        changeCountry: function(event) {
            this.eventhandler.$emit('changed-country', {
                data: {
                    contact: event.data.contact,
                    country: event.data.country
                }
            });
        },
        addingContact: function(contact) {
            this.eventhandler.$emit('adding-contact');
        }
    }
};
</script>

<style lang="scss" scoped>
.list-group-item {
    margin-bottom: 10px;
    border-radius: 5px;
}
li {
    background-color: #f9f9f9;
}
#contact-details {
    margin-left: 20px;
    .lead {
        font-weight: 700;
    }
}
#contact-icon-actions {
    margin-right: -50px;
    float: right;
}
#contact-icon-edit,
#contact-icon-delete {
    padding-right: 10px;
}
</style>
