<script setup>
   import {useCouponStore} from '@/stores/cupones'
   const store = useCouponStore();

</script>

<template>
   <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes un cupón?</p>

   <div class="flex">
      <input 
         type="text"
         placeholder="Ingresa un cupón"
         class="p-1.5 bg-white border-gray-300 w-full"
         v-model="store.couponInput"
      />
      <button
      type="button"
      class="p-1.5 bg-black text-gray-50 font-bold disabled:opacity-30"
      @click="store.applyCoupon"
      :disabled="store.isValidCoupon"
      >Canjear</button>
   </div>
   <p class="py-2 text-center text-sm font-extrabold">
      {{ store.couponValidationMessage }}
   </p>

</template>

