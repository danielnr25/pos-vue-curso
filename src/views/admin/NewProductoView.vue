<script setup>
   import { reactive } from "vue";
   import Links from "@/components/Links.vue";
   import { useRouter } from "vue-router";
   import useImage from "@/composables/useImage";
   import {useProductsStore} from "@/stores/productos";


   const { onFileChange, url, urlComputed } = useImage();
   const products = useProductsStore();
   const router = useRouter();

   const formData = reactive({
      name: "",
      image: "",
      category: "",
      price: "",
      stock: "",
   });

   const submitHandler= async(data) => {
      const {image,...values} = data;  

      try {
         await products.createProduct({
            ...values,
            image: url.value
         });
         router.push({name: "productos"});
      } catch (error) {
         console.log(error)
      }
   };


</script>
<template>
  <div class="px-10 lg:px-0 lg:pb-10">
    <Links to="productos"> Volver </Links>
    <h1 class="text-3xl font-semibold my-8">Nuevo Producto</h1>
    <div class="flex justify-center bg-white shadow max-w-4xl mx-auto">
      <div class="mt-2 p-10 w-full 2xl:w-4/4">
        <FormKit type="form"
          submit-label="Agregar Producto" 
          @submit="submitHandler"
          :value="formData">
          <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Nombre del producto"
            validation="required"
            :validation-messages="{
              required: 'El nombre del producto es obligatorio',
            }"
            v-model.trim="formData.name"
          />
          <FormKit
            type="file"
            label="Imagen Producto"
            name="image"
            validation="required"
            :validation-messages="{
              required: 'La imagen del producto es obligatoria',
            }"
            accept=".jpg"
            @change="onFileChange"
            v-model.trim="formData.image"
          />

          <div v-if="urlComputed">
            <p class="text-sm font-semibold">Imagen seleccionada:</p>
            <img :src="urlComputed" class="w-40 h-40 object-cover rounded-md" />
          </div>

          <FormKit
            type="select"
            label="Categoria"
            name="category"
            validation="required"
            :validation-messages="{
              required: 'La categoria del producto es obligatoria',
            }"
            :options="products.categoryOptions"
            v-model.number="formData.category"
          />
          <FormKit
            type="number"
            label="Precio"
            name="price"
            placeholder="Precio del producto"
            validation="required"
            :validation-messages="{
              required: 'El precio del producto es obligatorio',
            }"
            min="1"
            v-model.number="formData.price"
          />
          <FormKit
            type="number"
            label="Stock"
            name="stock"
            placeholder="Cantidad del producto"
            validation="required"
            :validation-messages="{
              required: 'La cantidad del producto es obligatorio',
            }"
            min="1"
            v-model.number="formData.stock"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
