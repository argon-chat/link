<template>
  <div class="app-container flex h-screen gap-4 p-7 flex items-center justify-center min-h-screen"
    style="width: 100svw; height: 100svh;">
    <span style="position: fixed;top: 5rem;font-size: 4rem;">Argon Chat</span>

    <div v-if="!isSuccessLink">
      <div class="flex flex-col items-center gap-6 text-center" v-if="avatarBlock && authKey">
        <br />
        <div class="flex items-center gap-4 text-4xl text-white/80">
          <img id="avatar" alt="User Avatar" class=" max-w-16 max-h-16 rounded-full object-cover" :src="avatarUrl" />
          <PhPlus />
          <PhTelegramLogo size="64" class="text-blue-400" />
        </div>
        <div id="telegram-login-button" class="mt-2">
          <LoginWidget bot-username="argon_chat_link_bot" data-size="large" data-userpic="true" data-radius="8"
            @auth="handleUserAuth" />
        </div>
      </div>
      <div v-else>
        <div class="flex items-center gap-4 text-4xl text-white/80" style="    flex-direction: column;">
          <div>
            <img :src="sss" style="width: 10rem;" />
          </div>
          Incorrect parameters or expired link ☹️
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center gap-4 text-4xl text-white/80" style="    flex-direction: column;">
        <div>
          <img :src="sse" style="width: 10rem;" />
        </div>

        <Sparkness text="Success linked" :colors="{ first: '#9E7AFF', second: '#FE8BBB' }" :sparkles-count="10"
          class="my-8" />
        <Confetti ref="confettiRef" class="absolute left-0 top-0 z-0 size-full" @mouseenter="fireConfetti" />
      </div>
    </div>


  </div>



</template>

<script setup lang="ts">
import { LoginWidget } from 'vue-tg'
import type { LoginWidgetUser } from 'vue-tg'
import { PhTelegramLogo, PhPlus } from "@phosphor-icons/vue";
import { useRouteQuery } from '@vueuse/router'
import { computed, onMounted, ref } from 'vue';
import { logger } from '@/lib/logger';
import basex from 'base-x';
import sss from "@/assets/undraw_farming_u62j.svg";
import sse from "@/assets/undraw_zoom-in_miok.svg";
import Confetti from '@/components/Confetti.vue';
import Sparkness from "@/components/SparklesText.vue";

const brd = basex("123qpxcvd");

const confettiRef = ref(null as any);

function fireConfetti() {
  confettiRef.value?.fire({});
}

const rrd = {
  encode: (e: string) => brd.encode(new TextEncoder().encode(e)),
  decode: (e: string) => new TextDecoder().decode(brd.decode(e))
};

(window as any)["rrd"] = rrd;

const avatarBlock = useRouteQuery('aav', "", { transform: { get: rrd.decode, set: rrd.encode } });
const authKey = useRouteQuery("aac", "", { transform: { get: rrd.decode, set: rrd.encode } });

const isSuccessLink = ref(false);

onMounted(() => {
  logger.log("AvatarBlock", avatarBlock.value);
})


const avatarUrl = computed(() => `https://xcdn.argon.gl/user/${avatarBlock.value}.jpg`);


function handleUserAuth(user: LoginWidgetUser) {
  logger.log(user);
  isSuccessLink.value = true;
}

</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #202225;
}
</style>