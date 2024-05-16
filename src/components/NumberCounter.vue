<template>

    <div v-if="$store.state.loginUser">{{ $store.state.loginUser.name }}</div>
    <div>{{ value }}</div>
    <div>
        <v-btn @click="countDown">-</v-btn>
        <span class="value">{{ modelValue }}</span>
        <v-btn @click="countUp">+</v-btn>
    </div>
</template>

<script>
export default {
    props: ["modelValue", "label"],
    methods: {
        countUp() {
            this.$emit("update:modelVlaue", this.modelValue + 1)

        },
        countDown() {
            if (this.modelValue > 0) {
                this.$emit("update:modelValue", this.modelValue - 1)
            }

        }
    }

}


</script>