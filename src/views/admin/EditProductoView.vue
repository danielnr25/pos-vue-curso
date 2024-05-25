<script setup>
import { watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc } from "firebase/firestore";
import Links from "@/components/Links.vue";
import { useFirestore, useDocument } from "vuefire";
import { useProductsStore } from "@/stores/productos";
import useImage from "@/composables/useImage";

// Obtenemos el id del producto a editar
const route = useRoute();
const router = useRouter();
const db = useFirestore();
const docRef = doc(db, "products", route.params.id);
const product = useDocument(docRef);


const { onFileChange, url, urlComputed } = useImage();
const products = useProductsStore();

const formData = reactive({
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
});

watch(product, () => { // Actualizamos los valores del formulario con los valores del producto a editar si existe un producto a editar
  if (product.value) { // Si existe un producto a editar
   //  formData.name = product.value.name; 
   //  formData.category = product.value.category;
   //  formData.price = product.value.price;
   //  formData.stock = product.value.stock;
   //  formData.image = product.value.image;
      Object.assign(formData, product.value); // Asignamos los valores del producto a editar al formulario de edicion es lo mismo que las lineas anteriores pero en una sola linea esto es gracias a Object.assign que copia los valores de un objeto a otro objeto
  }else{
      router.push({name: 'productos'}); // Redireccionamos a la pagina de productos si no existe un producto a editar
  }
});

const submitHandler = async data => {
   try {
      await products.updateProduct(docRef, {...data, url})
      router.push({name: 'productos'})
   } catch (error) {
      console.log(error)
   }
}



</script>

<template>
  <div class="px-10 lg:px-0 lg:pb-10">
    <div class="mt-1">
      <Links to="productos"> Volver </Links>
      <h1 class="text-4xl my-8 font-bold">Editar Producto</h1>

      <div class="flex justify-center bg-white shadow max-w-4xl mx-auto">
         <div class="mx-auto mt-3 p-10 w-full  2xl:w-4/4">
          <FormKit
            type="form"
            :value="formData"
            submit-label="Guardar Cambios"
            incomplete-message="No se pudo enviar, revisa los mensajes"
            @submit="submitHandler"
            :actions="false"
          >
            <FormKit
              type="text"
              label="Nombre"
              name="name"
              placeholder="Nombre de Producto"
              validation="required"
              v-model.trim="formData.name"
              :validation-messages="{
                required: 'El Nombre del Producto es Obligatorio',
              }"
            />

            <FormKit
              type="select"
              label="Categoría"
              name="category"
              validation="required"
              v-model.number="formData.category"
              :validation-messages="{ required: 'La Categoría es Obligatoria' }"
              :options="products.categoryOptions"
            />

            <FormKit
              type="number"
              label="Precio"
              name="price"
              placeholder="Precio de Producto"
              step="1"
              min="1"
              v-model.number="formData.price"
            />

            <FormKit
              type="number"
              label="Disponibles"
              name="stock"
              placeholder="Productos Disponibles"
              v-model.number="formData.stock"
              step="1"
              min="0"
            />

            <div v-if="urlComputed">
              <p class="font-black">Imagen Nueva:</p>
              <img :src="url" alt="Nueva imagen Producto" class="w-52" />
            </div>

            <div v-else>
              <p class="font-black">Imagen Actual:</p>
              <img
                :src="formData.image"
                :alt="'Imagen de' + formData.image"
                class="w-52"
              />
            </div>

            <FormKit
              type="file"
              label="Cambiar Imagen"
              name="image"
              multiple="false"
              accept=".jpg"
              @change="onFileChange"
            />

            <FormKit type="submit">Guardar Cambios</FormKit>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>
