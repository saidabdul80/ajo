<template>
    <img @error="handleError" :src="src?src:'-'"  :width="width" :height="height" :alt="alt" />
</template>

<script>

    export default {
        props: {
            height: {
                type: String,
                default: '100px'
            },
            width: {
                type: String,
                default: '100px'
            },
            alt: {
                type: String,
                default: 'image'
            },
            src: {
                type: String,
                default: null
            },
        },        
        methods: {
            handleError(event){                
                event.target.src =  "/user.png"
            }      
        },
    }

</script>

<style lang="scss" scoped>

</style>