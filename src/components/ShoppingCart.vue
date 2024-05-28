<script setup>
   import {UseCartStore} from '@/stores/carrito';
   import {useCouponStore} from '@/stores/cupones';
   import ShoppingCartItem from './ShoppingCartItem.vue';
   import Amount from './Amount.vue';
   import CouponForm from './CouponForm.vue';
   import {formatCurrency} from '../helpers';

   const cart = UseCartStore();
   const coupon = useCouponStore();
</script>

<template>
   <p v-if="cart.isEmpty" class="text-xl font-semibold text-center text-gray-900">El carrito esta vacio</p>
   <div v-else>
      <p class="text-4xl font-bold text-gray-900">Resumen de venta</p>
      <ul role="list"
      class="mt-6 divide-y divide-gray-400 ">
         <ShoppingCartItem 
            v-for="item in cart.items"
            :key="item.id"
            :item="item"
         /> 
      </ul>

      <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
         <Amount>
            <template #label>Subtotal:</template>
            {{  formatCurrency(cart.subtotal) }}
         </Amount>
         
         <Amount>
            <template #label>Impuesto:</template>
            {{  formatCurrency(cart.taxes) }}
         </Amount>


         <Amount>
            <template #label>Total a pagar:</template>
            {{  formatCurrency(cart.total) }}
         </Amount>
      </dl>

      <CouponForm />

      <button  
         type="button"
         class="mt-10 w-full bg-blue-900 hover:bg-blue-700 text-white uppercase font-bold p-3">
            Confirmar compra
      </button>
   
   </div>
</template>


