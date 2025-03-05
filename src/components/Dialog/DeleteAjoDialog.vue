<template>
  <div class="tw-text-center">
    <h2 class="tw-text-2xl tw-font-medium tw-text-black">{{ capitalizedRole }} Ajo</h2>
    <p class="tw-text-[#333333] tw-pt-4">Are you sure you want to {{ role }} Ajo?</p>

    <div class="tw-flex tw-flex-col tw-gap-5 tw-pt-8">
      <Button :label="`Yes, ${role} Ajo`" color="danger" @click="logout" />
      <Button label="Cancel" color="link" @click="closeDialog" />
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import { useAjoStore } from "@/stores/ajo.js";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    Button,
  },

  props: {
    user: { type: Object, required: true },
    ajo: { type: Object, required: true },
  },

  setup(props) {
    const ajoStore = useAjoStore();
    const route = useRoute();
    const router = useRouter();

    const closeDialog = () => {
      eventBus.emit("close-dialog");
    };

    const role = computed(() => {
      return props.user.id === props.ajo.user_id ? "delete" : "leave";
    });

    const logout = async () => {
      const emailDetails = props.ajo.ajo_members.find((member) => member.email === props.user.email);

      try {
        if (role.value === "delete") {
          const res = await ajoStore.deleteAjo(route.params.id);

          console.log(res);
          if (res) {
            router.push("/app/contributions");
          }
        } else {
          const res = await ajoStore.addDeleteParticipant(emailDetails.id);

          if (res) {
            router.push("/app/contributions");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        closeDialog();
      }
    };

    const capitalizedRole = computed(() => {
      return role.value.charAt(0).toUpperCase() + role.value.slice(1);
    });

    return {
      logout,
      closeDialog,
      capitalizedRole,
      role,
    };
  },
};
</script>
