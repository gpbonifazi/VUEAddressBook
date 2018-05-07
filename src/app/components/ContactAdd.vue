<template>
    <li class="list-group-item">
        <div class="container">
            <form
                id="contact-add"
                class="well form-horizontal">
                <fieldset>
                    <div class="form-group">
                        <label class="col-md-4 control-label">
                            First Name
                            <span class="required">
                                {{ fieldErrors.firstname }}
                            </span>
                        </label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <input
                                    v-model="contact.firstname"
                                    name="first_name"
                                    placeholder="First Name"
                                    class="form-control"
                                    type="text">

                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">
                            Last Name
                            <span class="required">
                                {{ fieldErrors.lastname }}
                            </span>
                        </label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <input
                                    v-model="contact.lastname"
                                    name="last_name"
                                    placeholder="Last Name"
                                    class="form-control"
                                    type="text">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">
                            E-Mail
                            <span class="required">
                                {{ fieldErrors.email }}
                            </span>
                        </label>
                        <div class="col-md-4 inputGroupContainer">
                            <div class="input-group">
                                <input
                                    v-model="contact.email"
                                    name="email"
                                    placeholder="E-Mail Address"
                                    class="form-control"
                                    type="text">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">
                            Country
                        </label>
                        <div class="col-md-4 selectContainer">
                            <div class="input-group">
                                <vSelect
                                    id="contact-country"
                                    :on-change="changeCountry"
                                    :options="this.countries"
                                    placeholder="Choose Country"/>
                            </div>
                        </div>
                    </div>
                    <div
                        id="contact-required-fields"
                        v-if="!isValidData">
                        {{ errormessage }}
                    </div>
                </fieldset>
            </form>

            <div id="buttons-group">
                <button-action
                    title="Cancel"
                    type="cancel"
                    @click="cancelAdd" />
                <button-action
                    title="Confirm Add"
                    type="confirm"
                    :disabled="!isValidData"
                    @click="confirmAdd" />
            </div>
        </div>
    </li>
</template>

<script>
import ButtonAction from './ButtonAction.vue';
import vSelect from '../../../node_modules/vue-select';

const uuid = require('node-uuid');

export default {
    name: 'ContactAdd',
    data() {
        return {
            country: this.countries,
            contact: {
                id: uuid.v4(),
                firstname: '',
                lastname: '',
                email: '',
                country: '',
                updating: false,
                deleting: false,
                active: true
            },
            fieldErrors: {
                firstname: undefined,
                lastname: undefined,
                email: undefined
            },
            errormessage: '* Required fields'
        };
    },
    mounted() {
        // console.log(this.countries);
    },
    components: {
        ButtonAction,
        vSelect: vSelect
    },
    methods: {
        cancelAdd: function() {
            this.$emit('cancel-add');
        },
        confirmAdd: function() {
            this.$emit('confirm-add', {
                data: {
                    contact: this.contact
                }
            });
        },
        changeCountry: function(valObj) {
            if (valObj !== null) {
                this.contact.country = valObj.label;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#contact-add {
    padding: 20px 0 0 5px;
    label {
        font-size: 0.8em;
        font-weight: 800;
        color: #0d0d0d;
    }
    ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #d7d9dd;
    }
    ::-moz-placeholder {
        /* Firefox 19+ */
        color: #d7d9dd;
    }
    :-ms-input-placeholder {
        /* IE 10+ */
        color: #d7d9dd;
    }
    :-moz-placeholder {
        /* Firefox 18- */
        color: #d7d9dd;
    }
    .required {
        color: red;
    }
    #contact-required-fields {
        margin-left: 15px;
        font-size: 0.8em;
        font-weight: 800;
        color: red;
    }
}
#buttons-group {
    margin: 0px -20px -5px 0px;
    float: right;
}
</style>
