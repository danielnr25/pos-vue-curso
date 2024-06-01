import { defineStore } from 'pinia';
import {ref,computed,watchEffect } from 'vue';
import { useFirestore } from 'vuefire';
import { useCouponStore } from './cupones';
import { addDoc, collection,doc,runTransaction } from 'firebase/firestore';
import {getCurrentDate} from '@/helpers';

export const UseCartStore = defineStore('cart',() =>{
   
   const coupon = useCouponStore();
   const db = useFirestore();

   const items = ref([]);
   const subtotal = ref(0);
   const taxes = ref(0);
   const total = ref(0);


   const MAX_PRODUCTS = 5;
   const TAX_RATE = 0.18;

   watchEffect(() => {

      subtotal.value = items.value.reduce((total, item)=> total + item.quantity*item.price,0); 

      taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2));
      
      total.value = Number(((subtotal.value + taxes.value) - coupon.discount).toFixed(2));
   })

   async function checkout(){
      try {
         await addDoc(collection(db,'sales'),{
            items: items.value.map(item =>{
               const {stock,category,...data} = item;
               return data;
            }),
            subtotal: subtotal.value,
            taxes: taxes.value,
            discount: coupon.discount,
            total: total.value,
            date: getCurrentDate()
         })

         items.value.forEach(async item =>{
            const productRef = doc(db,'products',item.id);
            await runTransaction(db,async transaction =>{
               const currentProduct = await transaction.get(productRef);
               const stock = currentProduct.data().stock - item.quantity;

               transaction.update(productRef,{stock});
            })

            $reset();
            coupon.$reset();

            window.alert('Compra realizada con éxito');

         })



      } catch (error) {
         console.error(error);
      }
   }


   function addItem(item){
      const index = isItemInCart(item.id);

      if(index >= 0){
         if(isProductAvailable(item,index)) {
            alert('No hay más stock disponible');
            return
         }

         items.value[index].quantity++;
      }else{
         items.value.push({...item,quantity:1,id:item.id});
      }
  
   }

   function updateQuantity(id,quantity){
      items.value = items.value.map( item => item.id === id?{
         ...item,quantity
      }:item);
   }

   const isItemInCart = id => items.value.findIndex(item => item.id === id);


   const isProductAvailable = (item, index) =>{
      return items.value[index].quantity >= item.stock || items.value[index].quantity >= MAX_PRODUCTS;
   }

   const isEmpty = computed(() => items.value.length === 0);

   const checkProductQuantity = computed(() =>{
      return (product) => product.stock < MAX_PRODUCTS ? product.stock : MAX_PRODUCTS;
   });


   function $reset(){
      items.value = [];
      subtotal.value = 0;
      taxes.value = 0;
      total.value = 0;
   }

   function removeItem(id){
      items.value = items.value.filter(item => item.id !== id);
   }

   return {
      items,
      subtotal,
      taxes,
      total,
      isEmpty,
      addItem,
      updateQuantity,
      removeItem,
      checkout,
      checkProductQuantity
   }

});