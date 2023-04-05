<!-- eslint-disable -->
<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        outlined=""
        v-model="forrm.title"
        label="Título"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <q-input
        outlined=""
        v-model="forrm.author"
        label="Autor"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
      />

      <div class="col-lg-12 col-xs-12">
        <q-editor v-model="forrm.content" min-height="5rem" />
      </div>

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Salvar"
          color="primary"
          class="float-right"
          icon="save"
          type="submit"
        />
        <q-btn
          label="Cancelar"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
import postsService from "src/services/poosts";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "FormPost",
  setup() {
    /* Aqui são feitas as "declarações" */
    const { poost, getByyId, update } = postsService();
    const $q = useQuasar();
    /* Para fazer roteamento */
    const router = useRouter();
    /* Para ter informações da rota atual */
    const route = useRoute();

    const forrm = ref({
      title: "",
      content: "",
      author: "",
    });

    /* Verificando se existe um ID na rota */
    /* Para editar um post */
    onMounted(async () => {
      if (route.params.id) {
        getPost(route.params.id);
      }
    });

    const getPost = async (id) => {
      try {
        const response = await getByyId(id);
        forrm.value = response;
      } catch (error) {}
    };

    const onSubmit = async () => {
      try {
        /* Se "form.value.id" existir, é porque
           estou atualizando, e não salvando. */
        if (forrm.value.id) {
          await update(forrm.value);
        } else {
          await poost(forrm.value);
        }

        $q.notify({
          message: "Post salvo com sucesso",
          icon: "check",
          color: "positive",
        });
        /* Enviando para alguma rota */
        router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    };

    return { forrm, onSubmit };
  },
});
</script>
