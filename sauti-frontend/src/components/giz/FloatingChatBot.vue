<template>
  <div class="chatbot-container">
    <!-- Report button - navigates to report page -->
    <router-link to="/report" class="chat-button" aria-label="Report a Case">
      <!-- Chat bubble icon for reporting -->
      <MessagesSquare class="w-6 h-6" aria-hidden="true" />
    </router-link>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue";
import { MessagesSquare } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import emitter from '@/utils/eventBus.js';

export default {
  name: 'FloatingChatBot',
  components: { MessagesSquare },
  setup() {
    const router = useRouter();

    onMounted(() => {
      // Listen for the open-chat event and redirect to report page
      emitter.on('open-chat', () => {
        console.log('Received open-chat event - redirecting to report page');
        router.push('/report');
      });
    });

    onBeforeUnmount(() => {
      // Clean up
      emitter.off('open-chat');
    });

    return {};
  }
}
</script>

<style scoped>
/* Import Giz base and layout styles to ensure proper rendering within the scoped component */
@import url('@/assets/giz-css/base.css');
@import url('@/assets/giz-css/layout.css');

.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 40; /* Max z-index to ensure visibility */
}

.chat-button {
  background-color: #252923; /* Red */
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(30, 38, 28, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.chat-button:hover {
  background-color: #444d3c; /* Darker red */
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(30, 38, 28, 0.16);
}

.chat-button:active {
  transform: scale(0.98);
}
</style>
