<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Eagle Eye Networks Preview App</h1>
  </header>

  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin: 0;
  font-size: 1.8rem;
}
</style>
