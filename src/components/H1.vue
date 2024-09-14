<template>
   <p class="h1">{{ text }}</p>
</template>

<script>
    export default {
        props: ['text'],     
    }
</script>

<style scoped>
.h1{
    font-size: 28px;
}
</style>