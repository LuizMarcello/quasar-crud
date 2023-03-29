<!-- eslint-disable -->
<template>
  <q-page padding>
    <q-table title="Treats" :rows="postss" :columns="coolumns" row-key="name" />
  </q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
/* Consumindo a api diretamente aqui neste componente */
import { api } from "boot/axios";

export default defineComponent({
  name: "IndexPage",

  /* Criando as lógicas do componente */
  setup() {
    const postss = ref([]);

    const coolumns = [
      {
        name: "id",
        field: "id",
        label: "Id",
        sortable: true,
        align: "left",
      },
      {
        name: "title",
        field: "title",
        label: "Título",
        sortable: true,
        align: "left",
      },
      {
        name: "author",
        field: "author",
        label: "Autor",
        sortable: true,
        align: "left",
      },
    ];

    onMounted(() => {
      getPosts();
    });

    /* Uma arrow-function */
    /* O método de requisição  */
    const getPosts = async () => {
      try {
        const { data } = await api.get('postts');
        postss.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      postss,
      coolumns,
    };
  },
});
</script>
