
import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import { UseCartStore } from './carrito';

export const useCouponStore = defineStore('coupon', () => {

   const cart = UseCartStore(); //instanciamos el store de carrito
   const couponInput = ref(''); //creamos una referencia reactiva couponInput que es un string vacío que contendrá el cupón de descuento                
   const couponValidationMessage = ref(''); //creamos una referencia reactiva couponValidationMessage que es un string vacío que contendrá el mensaje de validación del cupón de descuento
   const discountPercentage = ref(0); //creamos una referencia reactiva discountPercentage que es un número que contendrá el porcentaje de descuento
   const discount = ref(0); //creamos una referencia reactiva discount que es un número que contendrá el descuento

   const VALID_COUPONS = [ //creamos una constante VALID_COUPONS que es un array de objetos con los cupones de descuento válidos
      { name: '10DESCUENTO', discount: .10 },
      { name: '20DESCUENTO', discount: .20 },
   ]

   watch(discountPercentage, () => { //el watch me permite observar los cambios en el porcentaje de descuento para calcular el descuento que se le asingará
      discount.value = (cart.total * discountPercentage.value).toFixed(2); //calculamos el descuento que se le asignará al carrito de compras
   })

   function applyCoupon() { //creamos una función applyCoupon que se encarga de aplicar el cupón de descuento
      if (VALID_COUPONS.some(coupon => coupon.name === couponInput.value)) { //si el cupón de descuento es válido 
         couponValidationMessage.value = 'Aplicando...' //mostramos el mensaje de validación del cupón de descuento

         setTimeout(() => { //esperamos 3 segundos
            discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
            couponValidationMessage.value = '¡Descuento Aplicado 🥳!'
            //asignamos el porcentaje de descuento al cupón de descuento y mostramos el mensaje de descuento aplicado

         }, 3000);

      } else {
         couponValidationMessage.value = 'No existe ese cupón' //mostramos el mensaje de que el cupón de descuento no existe
      }
      setTimeout(() => {
         couponValidationMessage.value = '' //esperamos 6 segundos y limpiamos el mensaje de validación del cupón de descuento
      }, 6000);
   }

   function $reset() { //creamos una función $reset que se encarga de limpiar el cupón de descuento
      couponInput.value = ''; //limpiamos el cupón de descuento
      couponValidationMessage.value = ''; //limpiamos el mensaje de validación del cupón de descuento
      discountPercentage.value = 0; //limpiamos el porcentaje de descuento
      discount.value = 0; //limpiamos el descuento
   }

   const isValidCoupon = computed(() => discountPercentage.value > 0); //creamos una computada isValidCoupon que se encarga de validar si el cupón de descuento es válido

   return {
      couponInput,
      discount,
      applyCoupon,
      $reset,
      couponValidationMessage,
      isValidCoupon
   }

});