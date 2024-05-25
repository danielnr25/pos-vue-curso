<script setup>
   import { formatCurrency } from '../helpers';
   import {useProductsStore} from '../stores/productos';
   import {RouterLink} from 'vue-router';
   import { ref } from 'vue';
   
   const products = useProductsStore();
   defineProps({
      product:{
         type: Object,
      }
   })

   const showModal = ref(false);
   const showDeleteModal = () => {
      showModal.value = true;
   }

   const hideDeleteModal = () => {
      showModal.value = false;
   }

</script>

<template>

      <div class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
         <div class="relative group" >
             <div class="p-3">
                 <img  :src="product.image" :alt="product.name"  class="w-full h-80"
                 >
             </div>
             <div class="absolute top-56 left-0 right-0 bottom-0 bg-black bg-transparent flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div class="flex space-x-2">
                     <RouterLink class="w-28 flex items-center text-center py-2 px-4 bg-white text-gray-700 hover:bg-green-400 rounded shadow-md" :to="{
                        name: 'edit-product',
                        params: { id: product.id }
                     }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                     </svg> Editar
      
                     </RouterLink>
                     <button class="flex items-center w-28 text-center py-2 px-4 bg-white text-gray-700 hover:bg-red-300 rounded shadow-md" 
                     type="button"
                     @click="showDeleteModal"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg> Eliminar
                     </button>
                 </div>
             </div>
         </div>
         <div class="border-t p-3 bg-gray-50">
             <div>
                 <h4 class="uppercase font-bold text-gray-900 text-sm">
                     {{ product.name }}
                 </h4>
                
                 <h4 class="flex justify-between">
                     <span class="text-blue-800 font-semibold">{{ formatCurrency( product.price) }}</span>
                     <p class="text-green-600 font-medium">{{ product.stock }} en stock </p>
                 </h4>
             </div>
         </div>
     </div>

      <div v-if="showModal" class="fixed inset-0 space-x-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity">
         <div class="fixed inset-0 flex items-center justify-center">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
               <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
               <div class="sm:flex sm:items-start">
                  <div
                     class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                     <svg
                     class="h-6 w-6 text-red-600"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="2"
                     stroke="currentColor"
                     aria-hidden="true"
                     >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                     />
                     </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                     <h3
                     class="text-lg leading-6 font-medium text-gray-900"
                     id="modal-headline"
                     >
                     Eliminar Producto <span class="text-red-500">{{ product.name }}</span>
                     </h3>
                     <div class="mt-2">
                     <p class="text-sm text-gray-500">
                        ¿Estás seguro de que deseas eliminar este producto?
                     </p>
                     </div>
                  </div>
               </div>
   
               <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                     type="button"
                     class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                     @click="products.deleteProduct(product.id)"
                  >
                     Eliminar
                  </button>
                  <button
                     type="button"
                     class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                     @click="hideDeleteModal"
                  >
                     Cancelar
                  </button>
               </div>
               </div>
            </div>
         </div>
      </div>
 
 

   

</template>


