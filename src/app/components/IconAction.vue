<template>
    <i
        :class="[iconclass]"
        class="fa"
        @click="click"/>
</template>

<script>
export default {
    name: 'IconAction',

    props: {
        type: {
            type: String,
            required: true,
            validator: function(value) {
                return (
                    [
                        'delete',
                        'detach',
                        'edit',
                        'expand',
                        'filter',
                        'movedown',
                        'moveup',
                        'notallowed'
                    ].indexOf(value.toLowerCase()) > -1
                );
            }
        }
    },

    computed: {
        iconclass: function() {
            var faClass;
            switch (this.type.toLowerCase()) {
                case 'delete':
                    faClass = 'fa-remove fa-lg warn';
                    break;
                case 'detach':
                    faClass = 'fa-chain-broken fa-lg warn';
                    break;
                case 'edit':
                    faClass = 'fa-pencil fa-lg std';
                    break;
                case 'expand':
                    faClass = 'fa-caret-down fa-2x std';
                    break;
                case 'filter':
                    faClass = 'fa-filter fa-2x std';
                    break;
                case 'movedown':
                    faClass = 'fa-chevron-down fa-lg std';
                    break;
                case 'moveup':
                    faClass = 'fa-chevron-up fa-lg std';
                    break;
                case 'notallowed':
                    faClass = 'fa-ban fa-lg notallowed';
                    break;
            }
            return faClass;
        }
    },

    methods: {
        click: function() {
            if (this.type.toLowerCase() !== 'notallowed') {
                this.$emit('click');
            }
        }
    }
};
</script>

<style scoped>
.notallowed:hover {
    color: lightgray;
    cursor: not-allowed;
}

.fa {
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    color: lightgray;
}

.std:hover {
    color: black;
}

.warn:hover {
    color: red;
}
</style>
