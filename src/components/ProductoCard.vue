<script setup>
   defineProps({
      product:{
         type: Object,
      }
   })

   import { formatCurrency } from '@/helpers';
</script>

<template>
   <div class="rounded-lg bg-white shadow-md relative">
      <img class="rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:rounded-lg" :src="product.image" :alt="'Imagen de ' + product.name" />
      <div class="p-3 space-y-2">
        <h3 class="text-xl font-bold text-gray-800">{{ product.name }}</h3>
        <p class="text-gray-500">Disponibles: {{ product.stock }}</p>
        <p class="text-2xl font-extrabold text-blue-900">
          {{ formatCurrency(product.price) }}
        </p>
      </div>
  
      <button
        type="button"
        class="absolute top-5 -right-4"
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


