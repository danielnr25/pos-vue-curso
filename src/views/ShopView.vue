
<script setup>
import { storeToRefs } from 'pinia';
import MainNave from '@/components/MainNave.vue';
import { useProductsStore } from '@/stores/productos';
import ProductoCard from '@/components/ProductoCard.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
const products = useProductsStore();
const {filteredProducts, noResults} = storeToRefs(products);


</script>

<template>
   
      <MainNave />
      <main class="lg:flex lg:h-screen lg:overflow-y-hidden">
         <div class="lg:w-2/3 lg:screen lg:overflow-y-scroll py-8 px-10">
            <p v-if="noResults" class="text-center text-3xl text-yellow-500">No hay productos</p>
            <div 
                   v-else
                   class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"
               >
                   <ProductoCard
                       v-for="product in filteredProducts"
                       :key="product.id"
                       :product="product"
                   />
            </div>
        </div>
        <aside class="lg:w-1/3 lg:screen lg:overflow-y-scroll py-8 px-10">
            <ShoppingCart />
        </aside>
      </main>
      
  
</template>

