import Vue from 'vue'
import App from './app/App.vue'

const emailvalidator = require('email-validator');
const countrymodule = require('country-list')();

Vue.mixin({
    data: function () {
        return {
            emailvalidator: emailvalidator,
            countries: _.map(countrymodule.getData(), function(country) {
                let data = {};
                data.id = country.code;
                data.label = country.name;
                return data;
            })
        }
    },
    methods: {
        validateForm(fields) {
          const errors = {};
          if (!fields.firstname) {
              errors.firstname = '(*)';
          }
          if (!fields.lastname) {
              errors.lastname = '(*)';
          }
          if (!emailvalidator.validate(fields.email)) {
              errors.email = '(*)';
          }
          return errors;
        }
    },
    computed: {
        isValidData: function() {
            var isValid = false;
            this.fieldErrors = this.validateForm(this.contact);
            if (
                this.contact.email.trim() !== '' &&
                this.contact.firstname.trim() !== '' &&
                this.contact.lastname.trim() !== '' &&
                this.emailvalidator.validate(this.contact.email)
            ) {
                isValid = true;
            } else {
            }
            return isValid;
        }
    }
})

new Vue({
    el: '#app',
    render: h => h(App),
    created () {
        // console.log('Vue App Created!');
    },
    updated () {
        // console.log('Vue App Updated!');
    }
});
