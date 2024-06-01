<script setup>
   import Links from '@/components/Links.vue';
   import { onMounted } from 'vue';
   import {useProductsStore} from "@/stores/productos";
   import Producto from '@/components/Producto.vue'

   const products = useProductsStore();

   onMounted(() => {
      products.loadProducts();
   
   });
</script>

<template>
   <div>
      <Links
         to="new-producto"
      >
         Nuevo Producto
      </Links>

      <div class="flex lg:my-8 my-6 justify-between">
         <h1 class="lg:text-3xl text-lg font-bold ">Listado de Productos</h1>
         
         <input
            type="text"
            class="border border-gray-300 rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
            placeholder="Buscar Producto"
            v-model="products.Search"
         />

      </div>
      <p v-if="products.noResults" class="text-center font-semibold text-yellow-600 text-2xl">No hay resultados</p>


      <div v-else role="list" class="grid grid-cols gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">   
         <Producto 
            v-for="product in products.filteredProductsSearch" 
            :key="product.id" 
            :product="product"
         />
      </div>

      
   </div>
</template>


