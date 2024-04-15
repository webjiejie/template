<template>
    <div class="home">
        <div class="home-c" @click="jump">
            home-{{ $store.state.name }}-{{ $store.state.user.id }}
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'home',
    created(){
        let num:string = "1";
        console.log(num,this.$store.state)

    },

    methods:{
        jump(){
            this.$router.push("/login")
        }
    }
  })
  </script>
  <style lang="scss" scoped>
  .home{
    height: 100%;
  }
  </style>
  