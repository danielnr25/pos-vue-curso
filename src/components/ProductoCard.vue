<script setup>
   import { UseCartStore } from '@/stores/carrito';
   import { formatCurrency } from '@/helpers';
   
   const cart = UseCartStore();

   defineProps({
      product:{
         type: Object,
      }
   })

</script>

<template>
   <div class="rounded-lg bg-gray-100 shadow-md relative">
      <img class="rounded-t-lg lg:w-full w-96 cursor-pointer transition-transform transform hover:scale-105 hover:rounded-lg" :src="product.image" :alt="'Imagen de ' + product.name" />
      <div class="p-2 space-y-2 bg-gray-100 rounded-b-md">
        <h3 class="text-base font-bold text-gray-800">{{ product.name }}</h3>
        <div class="flex justify-between">
           <p class="text-lg font-extrabold text-blue-900">
             {{ formatCurrency(product.price) }}
           </p>
           <p class="text-gray-600">Disponibles: 
               <span class="font-bold text-green-500">{{ product.stock }}</span>
           </p>
        </div>
      </div>
  
      <button
        type="button"
        class="absolute top-5 -right-4"
        @click="cart.addItem(product)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 bg-blue-800 rounded-full text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
   </div>
</template>


