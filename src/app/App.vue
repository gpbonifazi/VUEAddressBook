<template>
    <div id="app">
        <ContactList
            :eventhandler="eventhandler"/>
    </div>
</template>

<script>
import Vue from 'vue';
import ContactList from './components/ContactList.vue';

export default {
    name: 'App',
    data: function() {
        return {
            eventhandler: new Vue()
        };
    },
    components: {
        ContactList
    },
    mounted() {
        // TODO
    }
};
</script>

<style lang="scss">
html,
body {
    // TODO
}
</style>

<style lang="scss" scoped>
#app {
    height: inherit;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
}
</style>
