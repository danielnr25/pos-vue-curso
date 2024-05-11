<script setup>
import Logox from './Logox.vue';
import Links from './Links.vue';

</script>

<template>
   <header class="px-10 py-5 bg-gray-900 text-white flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10">
      <div>
         <Logox />
      </div>
      <nav>
         <Links 
            to="admin"
         >
            Administrar
         </Links>
      </nav>
   </header>
</template>
