<template>
  <div class="app-container flex h-screen gap-4 p-7 flex items-center justify-center min-h-screen"
    style="width: 100svw; height: 100svh;">
    <span style="position: fixed; top: 5rem;     min-width: 120rem;">
      <TextHoverEffect class="max-lg:w-full min-md:flex-1" text="Argon Chat" />
    </span>

    <div v-if="!isCompletedPhase">
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

      <div class="flex items-center gap-4 text-4xl text-white/80" style="flex-direction: column;" v-if="isSuccessLink">
        <div>
          <img :src="sse" style="width: 10rem;" />
        </div>

        <Sparkness text="Success linked" :colors="{ first: '#9E7AFF', second: '#FE8BBB' }" :sparkles-count="10"
          class="my-8" />
        <Confetti ref="confettiRef" class="absolute left-0 top-0 z-0 size-full" @mouseenter="fireConfetti" />
      </div>
      <div v-else>
        <div class="flex items-center gap-4 text-4xl text-white/80" style="flex-direction: column;">
          <div>
            <img :src="sss" style="width: 10rem;" />
          </div>
          Unknown error, please try again later ☹️
        </div>
      </div>
    </div>


  </div>



</template>

<script setup lang="ts">
import { LoginWidget } from 'vue-tg'
import type { LoginWidgetUser } from 'vue-tg'
import { PhTelegramLogo, PhPlus } from "@phosphor-icons/vue";
import { useRouteQuery } from '@vueuse/router'
import { computed, ref } from 'vue';
import { logger } from '@/lib/logger';
import basex from 'base-x';
import sss from "@/assets/undraw_farming_u62j.svg";
import sse from "@/assets/undraw_zoom-in_miok.svg";
import Confetti from '@/components/Confetti.vue';
import Sparkness from "@/components/SparklesText.vue";
import TextHoverEffect from '@/components/TextHoverEffect.vue';

import { createTransportClient } from "@argon-chat/argx";

const brd = basex("123qpxcvd");

const confettiRef = ref(null as any);

function fireConfetti() {
  confettiRef.value?.fire({});
}

interface IUserInteraction {
  CreateSocialBoundAsync(request: { User: string, Token: string, Kind: "Telegram", UserSlash: string }): Promise<boolean>;
}

const rrd = {
  encode: (e: string) => brd.encode(new TextEncoder().encode(e)),
  decode: (e: string) => new TextDecoder().decode(brd.decode(e))
};

(window as any)["rrd"] = rrd;

const avatarBlock = useRouteQuery('aav', "", { transform: { get: rrd.decode, set: rrd.encode } });
const authKey = useRouteQuery("aac", "", { transform: { get: rrd.decode, set: rrd.encode } });

const isCompletedPhase = ref(false);
const isSuccessLink = ref(false);

const client = createTransportClient("https://api.argon.gl", () => "");
const handleUserScope = client.scope<IUserInteraction>("IUserInteraction");
const avatarUrl = computed(() => `https://xcdn.argon.gl/user/${avatarBlock.value}.jpg`);


async function handleUserAuth(user: LoginWidgetUser) {
  try {
    isSuccessLink.value = await handleUserScope.CreateSocialBoundAsync({
      Token: authKey.value,
      User: JSON.stringify(user),
      Kind: "Telegram",
      UserSlash: avatarBlock.value
    });
  }
  catch (e) {
    logger.error(e);
    isSuccessLink.value = false;
  }
  finally {
    isCompletedPhase.value = true;
  }
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