<template>
    <div class="home">
        <div class="home-c" @click="jump">
            home-{{ $store.state.name }}-{{ $store.state.user.id }}
        </div>
    </div>
  </template>
  
  <script>
  
  
  export default {
    name: 'home',
    created(){
        console.log(this.$store.state)
    },
    methods:{
        jump(){
            this.$router.push("/login")
        }
    }
  }
  </script>
  <style lang="scss" scoped>
  .home{
    height: 100%;
  }
  </style>
  