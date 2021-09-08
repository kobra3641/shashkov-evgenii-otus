<template>
    <div>
        <input :id="id" type="checkbox" :name="id" :checked="isChecked">
        <label :for="id">{{labelText}}</label>
    </div>
</template>

<script>
    export default {
        name: "Checkbox",
        props: {
            id: String,
            labelText: String,
            isChecked: Boolean,
        }
    }
</script>

<style scoped>
    label {
        display: inline-block;
        cursor: pointer;
        position: relative;
        padding-left: 2.5em;
        margin: 0.2em 0;
        font-size: 1em;
    }

    input[type=checkbox] {
        display: none;
    }

    label:before {
        content: "";
        display: inline-block;
        width: 1em;
        height: 1em;
        position: absolute;
        left: 0;
        bottom: 1px;
        border: 2px solid #35495e;
        border-radius: 3px;
    }

    input[type=checkbox]:checked + label:before {
        content: "\2713";
        font-size: 1em;
        font-weight: bolder;
        background-color: #2846c2;
        color: #ffffff;
        text-align: center;
        line-height: 1em;
        border: none;
    }

</style>
