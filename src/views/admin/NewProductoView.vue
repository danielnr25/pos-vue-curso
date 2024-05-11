<script setup>
   import Links from '@/components/Links.vue'
</script>
<template>
   <div class="px-10 lg:px-0 lg:pb-10">
      <Links
         to="productos"
      >
         Volver
      </Links>
      <h1 class="text-3xl font-semibold my-8">Nuevo Producto</h1>
      <div class="flex justify-center bg-white shadow max-w-4xl mx-auto">
         <div class="mt-2 p-10 w-full 2xl:w-4/4">
            <FormKit 
               type="form"
               submit-label="Agregar Producto"
            >
               <FormKit 
                  type="text"
                  label="Nombre"
                  name="name"
                  placeholder="Nombre del producto"
                  validation = "required"
                  :validation-messages="{required: 'El nombre del producto es obligatorio'}"
                  
               />
               <FormKit
                  type="file"
                  label="Imagen Producto"
                  name="image"
                  validation = "required"
                  :validation-messages="{required: 'La imagen del producto es obligatoria'}"
                  accept=".jpg,.jpeg,.png"
               />
               <FormKit
                  type="select"
                  label="Categoria"
                  name="category"
                  validation = "required"
                  :validation-messages="{required: 'La categoria del producto es obligatoria'}"
                  :options = [1,2,3]
               />
               <FormKit 
                  type="number"
                  label="Precio"
                  name="price"
                  placeholder="Precio del producto"
                  validation = "required"
                  :validation-messages="{required: 'El precio del producto es obligatorio'}"
                  min="1"
               />
               <FormKit 
                  type="number"
                  label="Stock"
                  name="stock"
                  placeholder="Cantidad del producto"
                  validation = "required"
                  :validation-messages="{required: 'La cantidad del producto es obligatorio'}"
                  min="1"
               />
         
         
            </FormKit>
         </div>
      </div>
   
   
   
   </div>
</template>


