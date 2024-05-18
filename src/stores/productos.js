import { defineStore } from "pinia";
import { computed } from "vue";
import { collection, addDoc } from "firebase/firestore";

import { useFirestore,useFirebaseStorage,useCollection } from "vuefire";

export const useProductsStore = defineStore('products',()=>{

   const db = useFirestore();
   const storage = useFirebaseStorage();

   const productsCollection = useCollection(collection(db,'products'));

   const categories = [
      {id:1,name:'Polos'},
      {id:2,name:'Zapatillas'},
      {id:3,name:'Relojes'},
      {id:4,name:'Carteras'},
   ];

   // crear producto
   async function createProduct(product){
      await addDoc(collection(db,'products'),product);
   }


   const categoryOptions = computed(() => {
      const options =[
         {label:'Seleccione',value:'',attrs:{disabled:true}},
         ...categories.map((category)=>({
            label: category.name,
            value: category.id
         }))
      ];
      return options;
   });

   return {
      createProduct,
      categoryOptions,
      productsCollection
   }

})