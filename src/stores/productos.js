import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFirestore, useFirebaseStorage, useCollection } from "vuefire";
import { collection, addDoc, orderBy, query, limit, updateDoc,doc,getDoc, deleteDoc } from "firebase/firestore";

import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useProductsStore = defineStore('products', () => {

   const db = useFirestore();
   const storage = useFirebaseStorage();
   let hideDeleteModal = ref(false);
   const selectedCategory = ref(1);
   const search = ref('');

   const q = query(
      collection(db, 'products'), 
      orderBy('name')
   );

   const productsCollection = useCollection(q);
   //const productsCollection = useCollection(collection(db, 'products'));

   const categories = [
      { id: 1, name: 'Polos' },
      { id: 2, name: 'Zapatillas' },
      { id: 3, name: 'Relojes' },
      { id: 4, name: 'Carteras' },
   ];

   // crear producto
   async function createProduct(product) {
      await addDoc(collection(db, 'products'), product);
   }


   async function updateProduct(docRef, product) { // Definimos una función para actualizar un producto en Firestore con el documento de referencia y el producto
      const { image, url, ...values } = product // Obtenemos la imagen, la URL y los valores del producto


      if (image.length) { // Si la imagen tiene una longitud
       
         await updateDoc(docRef, { // Actualizamos el documento con el documento de referencia y los valores del producto actualizados 
            ...values, // Obtenemos los valores del producto actualizados
            image: url.value // Obtenemos la URL de la imagen
         })

         const imageRef = storageRef(storage, image) // Obtenemos la referencia de la imagen con el almacenamiento y la imagen
         await deleteObject(imageRef) // Eliminamos la imagen del producto
         
        
      } else {
         await updateDoc(docRef, values) // Actualizamos el documento con el documento de referencia y los valores del producto actualizados
      }
   }


   async function deleteProduct(id) {
      const docRef = doc(db, 'products', id) // Obtenemos el documento de referencia con el ID del producto
      const docSnap = await getDoc(docRef)// Obtenemos el documento con el documento de referencia para eliminar el producto
      const { image } = docSnap.data() // Obtenemos la imagen del documento del producto
      const imageRef = storageRef(storage, image) // Obtenemos la referencia de la imagen con el almacenamiento y la imagen

      await Promise.all([ // Esperamos a que se completen todas las promesas para eliminar el producto y la imagen del producto
         deleteDoc(docRef), // Eliminamos el documento del producto
         deleteObject(imageRef) // Eliminamos la imagen del producto
      ]);

      hideDeleteModal.value = false;
   }


   const categoryOptions = computed(() => {
      const options = [
         { label: 'Seleccione', value: '', attrs: { disabled: true } },
         ...categories.map((category) => ({
            label: category.name,
            value: category.id
         }))
      ];
      return options;
   });

   const noResults = computed(() => productsCollection.value.length === 0) // Obtenemos el valor de la colección de productos de Firestore 

   // Filtrar productos por categoría 
   const filteredProducts = computed(() => {
      return productsCollection.value
         .filter( product => product.category === selectedCategory.value)
         .filter( product => product.stock > 0)
   });

   const filteredProductsSearch = computed(() =>{
      return productsCollection.value
      .filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()))
      .filter(product => product.stock > 0)
   })


   async function loadProducts(){ // Definimos una función para cargar los productos de Firestore
      const productsSnapshot = await useFirestore().collection('products').get(); // Obtenemos los productos de Firestore
      productsCollection.value = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapeamos los documentos de la colección de productos de Firestore
   }


   return {
      createProduct,
      updateProduct,
      deleteProduct,
      categoryOptions,
      productsCollection,
      noResults,
      filteredProducts,
      selectedCategory,
      hideDeleteModal,
      categories,
      loadProducts,
      filteredProductsSearch
   }
});