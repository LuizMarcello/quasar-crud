<!-- eslint-disable -->
<template>
  <q-page padding>
    <q-table title="Treats" :rows="posts" :columns="columns" row-key="name" />
  </q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  /* Criando as lógicas do componente */
  setup() {
    const posts = ref([]);

    const columns = [
      {
        name: "id",
        field: "id",
        label: "Id",
        sortable: true,
        align: 'left'
      },
      {
        name: "title",
        field: "title",
        label: "Título",
        sortable: true,
        align: 'left'
      },
      {
        name: "author",
        field: "author",
        label: "Autor",
        sortable: true,
        align: 'left'
      },
    ];

    return {
      posts,
      columns,
    };
  },
});
</script>
