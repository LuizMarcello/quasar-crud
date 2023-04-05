<!-- eslint-disable -->
<template>
  <q-page padding>
    <q-table title="Artigos" :rows="postss" :columns="coolumns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Artigos</span>
        <q-space />
        <!-- Aqui neste botão, quando clicar no botão, eu posso enviar
             diretamente para uma rota, sem precisar criar algum método -->
        <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }" />
      </template>

      <!-- Quer dizer: Quero mudar o conteúdo da coluna com nome "actions" -->
      <template v-slot:body-cell-actions="prrops">
        <q-td :props="prrops">
          <q-btn
            icon="'delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeletePost(prrops.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
/* Consumindo a api diretamente aqui neste componente */
//import { api } from "boot/axios";
/* Agora Importando do "service" criado */
import postsService from "src/services/poosts";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",

  /* Criando as lógicas do componente */
  setup() {
    const postss = ref([]);
    const { liist, remove } = postsService();

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
      {
        name: "actions",
        field: "actions",
        label: "Ações",
        align: "right",
      },
    ];

    const $q = useQuasar();

    onMounted(() => {
      getPosts();
    });

    /* /* Uma arrow-function assincrona */
    /* O método de requisição  */
    const getPosts = async () => {
      try {
        const data = await liist();
        postss.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    /* Uma arrow-function assincrona */
    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: "Remover",
          message: "Deseja remover este post ?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: "Removido com sucesso",
            icon: "check",
            color: "positive",
          });
          await getPosts();
        });
      } catch (error) {
        $q.notify({ message: "Erro ao apagar o post", icon: "times", color: "negative" });
      }
    };

    return {
      postss,
      coolumns,
      handleDeletePost,
    };
  },
});
</script>
