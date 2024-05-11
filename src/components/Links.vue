<script setup>
   import {RouterLink} from 'vue-router'
   defineProps({
      to:{
         type:String,
      }
   })


</script>

<template>
   <RouterLink
      :to="{name:to}"
      class="rounded-md bg-blue-900 px-10 py-2 text-white font-bold hover:bg-blue-800 transition duration-300 ease-in-out"
   >
      <slot></slot>
   </RouterLink>
</template>

