<template>
  <header ref="header" class="site-header" @keydown.esc="closeMenus">
    <nav class="site-navbar" aria-label="Main Navigation">
      <router-link to="/" class="site-wordmark" aria-label="Sauti 116 home"><span>Sauti <strong>116</strong></span><small>Uganda’s national child helpline</small></router-link>
      <div class="site-primary-links"><router-link v-for="link in primaryLinks" :key="link.to" :to="link.to" :aria-current="route.path===link.to?'page':undefined">{{ link.label }}</router-link></div>
      <div class="site-nav-actions"><a :href="`tel:${settings.hotline_number || '116'}`" class="site-call"><Phone aria-hidden="true" /><span>Call 116</span></a><router-link to="/report" class="site-report">Report a case <ArrowUpRight aria-hidden="true" /></router-link>
        <details ref="explore" class="site-menu"><summary aria-label="Explore all pages"><Menu aria-hidden="true" /><span>Explore</span><ChevronDown aria-hidden="true" /></summary><div class="site-menu-panel"><p class="site-menu-title">Explore Sauti</p><nav aria-label="All pages"><router-link v-for="link in allLinks" :key="link.to" :to="link.to" :aria-current="route.path===link.to?'page':undefined" @click="closeMenus">{{ link.label }}<ArrowUpRight aria-hidden="true" /></router-link></nav><div class="site-menu-help"><span>Free, confidential support. 24/7.</span><a :href="`tel:${settings.hotline_number || '116'}`">Call 116 <Phone aria-hidden="true" /></a></div></div></details>
      </div>
    </nav>
  </header>
</template>
<script setup>
import {computed,ref,watch,onMounted,onUnmounted} from 'vue'
import {useRoute} from 'vue-router'
import {useSettingsStore} from '@/store/settings'
import {Phone,ArrowUpRight,Menu,ChevronDown} from 'lucide-vue-next'
const route=useRoute(),settingsStore=useSettingsStore()
const settings=computed(()=>settingsStore.settings)
const header=ref(null),explore=ref(null)
const primaryLinks=[{to:'/',label:'Home'},{to:'/about',label:'Who We Are'},{to:'/operations',label:'Services'},{to:'/resources',label:'Resources'},{to:'/blogs',label:'Updates'}]
const allLinks=[{to:'/report',label:'Report a Case'},...primaryLinks,{to:'/videos',label:'Videos'},{to:'/news',label:'News'},{to:'/faqs',label:'FAQs'},{to:'/contact',label:'Contact Us'},{to:'/reports',label:'Reports & Insights'},{to:'/partners',label:'Our Partners'},{to:'/donate',label:'Donate'}]
const closeMenus=()=>{if(explore.value)explore.value.open=false}
const closeOutside=event=>{if(!header.value?.contains(event.target))closeMenus()}
watch(()=>route.fullPath,closeMenus)
onMounted(()=>document.addEventListener('click',closeOutside))
onUnmounted(()=>document.removeEventListener('click',closeOutside))
</script>
<style scoped>
.site-header{position:relative;z-index:50;background:rgba(250,251,249,.95);border-bottom:1px solid var(--ui-separator);backdrop-filter:blur(20px);}
.site-navbar{max-width:1440px;margin:auto;padding:1.125rem clamp(1.25rem,4vw,4rem);display:flex;align-items:center;gap:2rem;}
.site-wordmark{display:flex;flex-direction:column;flex-shrink:0;color:var(--ui-label);text-decoration:none;}
.site-wordmark>span{font-size:1.5rem;font-weight:600;letter-spacing:-.045em;line-height:1.15;}
.site-wordmark strong{color:var(--ui-accent);font-weight:600;}
.site-wordmark small{font-size:.6875rem;color:var(--ui-secondary-label);margin-top:.25rem;}
.site-primary-links{display:flex;align-items:center;gap:1.5rem;justify-content:center;flex:1;}
.site-primary-links a{min-height:44px;display:flex;align-items:center;position:relative;font-size:.875rem;font-weight:500;white-space:nowrap;}
.site-primary-links a[aria-current]{color:var(--ui-accent);}
.site-primary-links a[aria-current]:after{content:'';height:2px;position:absolute;bottom:2px;left:0;right:0;background:var(--ui-accent);border-radius:2px;}
.site-nav-actions{display:flex;align-items:center;gap:.625rem;margin-left:auto;}
.site-call,.site-report{min-height:44px;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;white-space:nowrap;padding:.625rem 1rem;border-radius:100px;font-size:.875rem;font-weight:500;}
.site-call{color:var(--ui-accent);background:var(--ui-surface);border:1px solid var(--ui-separator);}
.site-report{background:var(--ui-accent);color:white;}
.site-nav-actions svg{width:1rem;height:1rem;stroke-width:1.75;}
.site-menu{position:relative;}
.site-menu summary{min-height:44px;cursor:pointer;display:flex;align-items:center;gap:.5rem;list-style:none;font-size:.875rem;padding:.625rem .875rem;border:1px solid var(--ui-separator);border-radius:100px;background:var(--ui-surface);}
.site-menu summary::-webkit-details-marker{display:none;}
.site-menu summary>svg:first-child{display:none;}
.site-menu-panel{position:absolute;right:0;top:calc(100% + 1rem);width:min(460px,calc(100vw - 40px));padding:1.5rem;border-radius:20px;border:1px solid var(--ui-separator);background:var(--ui-surface);box-shadow:var(--ui-shadow);max-height:75dvh;overflow:auto;}
.site-menu-title{font-size:.8125rem;font-weight:600;color:var(--ui-secondary-label);margin:0 0 1rem;}
.site-menu-panel nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.25rem .75rem;}
.site-menu-panel nav a{display:flex;align-items:center;justify-content:space-between;gap:.5rem;min-height:44px;font-size:.9375rem;padding:.5rem;border-radius:8px;}
.site-menu-panel nav a svg{opacity:.5;width:.875rem;}
.site-menu-panel nav a:hover,.site-menu-panel nav a[aria-current]{background:var(--ui-tint);color:var(--ui-accent);}
.site-menu-help{border-top:1px solid var(--ui-separator);margin-top:1rem;padding-top:1rem;font-size:.8125rem;color:var(--ui-secondary-label);}
.site-menu-help a{display:inline-flex;align-items:center;gap:.5rem;min-height:44px;margin-left:.5rem;font-weight:600;color:var(--ui-accent);}
.site-header a:focus-visible,.site-menu summary:focus-visible{outline:3px solid var(--ui-focus);outline-offset:4px;}
@media(max-width:1199px){.site-primary-links{display:none;}.site-navbar{gap:1rem}.site-menu summary>svg:first-child{display:block;}.site-menu summary>span,.site-menu summary>svg:last-child{display:none;}.site-menu summary{width:44px;justify-content:center;padding:0}}
@media(max-width:639px){.site-navbar{padding:1rem 1.25rem;gap:.5rem}.site-wordmark small{display:none}.site-wordmark>span{font-size:1.375rem}.site-report{display:none}.site-call{padding:.625rem .75rem}.site-nav-actions{gap:.5rem}.site-menu-panel nav{grid-template-columns:1fr}.site-menu-panel{right:0;width:calc(100vw - 40px)}}
@media(prefers-reduced-transparency:reduce){.site-header{background:var(--ui-background);backdrop-filter:none}}
</style>
