<script setup>
import { useProductsStore } from '@/stores/productos';
const products = useProductsStore();

const selectCategory = (categoryId) => {
  products.selectedCategory = categoryId;
};

</script>

<template>
  <div class="bg-gray-200 p-5">
    <div class="mt-2">
      <div class="border-b border-gray-200">
        <div class="-mb-px flex space-x-8 px-4" aria-orientation="horizontal" role="tablist">
          <button
            v-for="category in products.categories"
            :key="category.id"
            :class="{
              'border-b-2 border-indigo-500 text-blue-700 text-xl font-bold': products.selectedCategory === category.id,
              'border-transparent text-gray-900 text-lg font-semibold': products.selectedCategory !== category.id
            }"
            @click="selectCategory(category.id)"
            role="tab"
            type="button"
            :aria-controls="'tabs-1-panel-' + category.id"
            :aria-selected="products.selectedCategory === category.id"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>