<template>
    <button
        :disabled="disabled"
        :tabindex="tabindex"
        :class="['btn', buttonclass]"
        type="button"
        @click="click"
        @keyup.enter="click">
        <i :class="[iconclass]"/>
    </button>
</template>

<script>
export default {
    name: 'ButtonAction',
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0
        },
        type: {
            type: String,
            required: true,
            validator: function(value) {
                return (
                    [
                        'add',
                        'cancel',
                        'delete',
                        'confirm',
                        'pdf',
                        'search',
                        'spreadsheet',
                        'view'
                    ].indexOf(value.toLowerCase()) > -1
                );
            }
        },
        colour: {
            type: String,
            required: false,
            default: '',
            validator: function(value) {
                return (
                    [
                        '',
                        'danger',
                        'info',
                        'inverse',
                        'muted',
                        'primary',
                        'success',
                        'warning'
                    ].indexOf(value.toLowerCase()) > -1
                );
            }
        }
    },
    computed: {
        iconclass: function() {
            var faClass;
            switch (this.type.toLowerCase()) {
                case 'view':
                    faClass = 'fa fa-eye';
                    break;
                case 'pdf':
                    faClass = 'fa fa-file-pdf-o';
                    break;
                case 'add':
                    faClass = 'fa fa-plus';
                    break;
                case 'confirm':
                    faClass = 'fa fa-check';
                    break;
                case 'cancel':
                    faClass = 'fa fa-remove';
                    break;
                case 'delete':
                    faClass = 'fa fa-trash';
                    break;
                case 'search':
                    faClass = 'fa fa-search';
                    break;
                case 'spreadsheet':
                    faClass = 'fa fa-file-excel-o';
                    break;
            }
            return faClass;
        },
        buttonclass: function() {
            var btnClass;
            var btnColour = this.colour.toLowerCase();
            var iconType = this.type.toLowerCase();
            if (btnColour === '' && iconType === 'cancel') {
                btnClass = 'btn-secondary';
            } else {
                switch (btnColour) {
                    case 'primary':
                        btnClass = 'btn-primary';
                        break;
                    case 'info':
                        btnClass = 'btn-info';
                        break;
                    case 'danger':
                        btnClass = 'btn-danger';
                        break;
                    case ('success', ''):
                        btnClass = 'btn-success';
                        break;
                    case 'warning':
                        btnClass = 'btn-warning';
                        break;
                    case 'inverse':
                        btnClass = 'btn-inverse';
                        break;
                    case 'muted':
                        btnClass = 'btn-danger';
                        break;
                }
            }
            return btnClass;
        }
    },
    methods: {
        click: function() {
            this.$emit('click');
        }
    }
};
</script>


<style scoped>
.btn {
    margin: 5px 0px 10px 0px;
    text-decoration: none;
}

.btn.disabled {
    pointer-events: none;
}

.btn.disabled,
.btn[disabled] {
    cursor: not-allowed;
}
</style>
