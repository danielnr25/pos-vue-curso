<script setup>
import {RouterLink, useRoute} from 'vue-router';
import Logox from './Logox.vue';
import Links from './Links.vue';

const route = useRoute();
const isLinkActive = (name) => route.name === name;
</script>

<template>
   <header class="px-10 py-5 bg-gray-900 text-white flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10">
      <div>
         <Logox />
      </div>
      <nav class="space-x-4">
         <RouterLink 
            :to="{name: 'productos'}"
            class="rounded text-white font-bold p-2"
            :class="{'text-indigo-500 border-b-2 border-indigo-400': isLinkActive('productos')}"
         >
            Productos
         </RouterLink>
         
         <RouterLink 
            :to="{name: 'ventas'}"
            class="rounded text-white font-bold p-2"
            :class="{'text-indigo-500 border-b-2 border-indigo-400': isLinkActive('ventas')}"
         >
            Ventas
         </RouterLink>
         <Links 
            to="shop"
         >
            Ir a Tienda
         </Links>
      </nav>
   </header>
</template>
