<script setup>
import { formatCurrency } from "../helpers";
import Amount from "./Amount.vue";
defineProps({
  sale: {
    type: Object,
  },
});
</script>

<template>
  <div
  class="border-t border-gray-200 shadow space-y-6 py-6 bg-gray-50 px-3 rounded-md"
  >
    <h2 class="text-2xl font-bold">Detalles Venta:</h2>
    <p class="text-xl font-semibold text-blue-700">Productos Vendidos</p>
    <ul
      role="list"
      class="mt-6 divide-y divide-gray-900 border-t border-gray-200 font-medium text-gray-700"
    >
      <li
        v-for="item in sale.items"
        class="flex space-x-6 py-6 px-3 rounded bg-slate-100"
      >
        <img
          :src="item.image"
          :alt="'Imagen de ' + item.name"
          class="h-24 w-24 flex-none rounded-lg"
        />
        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900 text-md">{{ item.name }}</h3>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>

        <dl
        class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-800 bg-slate-100 px-3 rounded pb-4"
        >
        <Amount>
            <template #label>Subtotal:</template>
            {{  formatCurrency(sale.subtotal) }}
         </Amount>
         <Amount>
            <template #label>Impuestos:</template>
            {{  formatCurrency(sale.taxes) }}
         </Amount>
         <Amount v-if="sale.discount" class="bg-green-200 p-2">
            <template #label>Descuento:</template>
            {{  formatCurrency(sale.discount) }}
         </Amount>
      
         <Amount class="text-indigo-800">
            <template #label>Total Pagado:</template>
            <span class="text-indigo-800 font-bold">
               {{  formatCurrency(sale.total) }}
            </span>
         </Amount>
      
        
      </dl>
      </li>
    </ul>
  </div>
</template>
