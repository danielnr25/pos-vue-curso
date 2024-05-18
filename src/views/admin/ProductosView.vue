<script setup>
   import Links from '@/components/Links.vue'
   import {useProductsStore} from "@/stores/productos";
   import Producto from '@/components/Producto.vue'

   const products = useProductsStore();
</script>

<template>
   <div>
      <Links
         to="new-producto"
      >
         Nuevo Producto
      </Links>

      <ul role="list" class="grid grid-cols gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">   
         <Producto 
            v-for="product in products.productsCollection" 
            :key="product.id" 
            :product="product"
         
         />
      </ul>
      
   </div>
</template>


