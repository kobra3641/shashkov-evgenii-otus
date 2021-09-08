<template>
    <button :class="[roundKeyClass, getClassForColor]"
            :disabled="disabled"
            @click="$emit('handleKeyClick', keyTitle)">
        {{keyTitle}}
    </button>
</template>

<script>
    export default {
        name: "RoundKey",
        props: {
            keyTitle: String,
            disabled: Boolean
        },
        data() {
            return {
                numberColorClass: 'blue',
                stringColorClass: 'grey',
                roundKeyClass: 'round-key'
            }
        },
        computed: {
            getClassForColor() {
                if (this.keyTitle === '') {
                    return 'blank'
                } else if (parseInt(this.keyTitle)) {
                    return 'blue'
                }
                return 'grey'
            }
        }
    }
</script>

<style scoped>
    .round-key {
        margin: 0 auto;
        padding: 0;
        width: 2.2em;
        height: 2.2em;
        border: 1px solid;
        border-radius: 1.1em;
        text-align: center;
        line-height: 2.2em;
        font-size: 1.5em;
        font-weight: bold;
        box-shadow: 0 3px 5px 1px gray;
        cursor: pointer;
        color: white;
    }

    .blue {
        border-color: #2846c2;
        background-color: #2846c2;
    }

    .grey {
        color: #2846c2;
        border-color: lightgrey;
        background-color: lightgrey;
    }

    .blank {
        box-shadow: none;
        border-color: transparent;
        background: none;
        cursor: auto;
    }

    .round-key:active {
        box-shadow: none;
    }
</style>
