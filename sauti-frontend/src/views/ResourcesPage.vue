<template>
  <div class="public-page resource-library">
    <header class="page-header"><div class="container-custom resource-intro"><div><p class="section-label">Knowledge & support</p><h1>{{ resourcesDownloadsTitle }}</h1><p class="page-header-subtitle">Public awareness materials and official guidance.</p><a href="#resource-search" class="text-link">Find a resource <ArrowDown aria-hidden="true" /></a></div><img src="@/assets/sauti_happy_students.png" alt="Children together at school in Uganda" fetchpriority="high" /></div></header>
    <section class="container-custom library-content" aria-labelledby="library-heading">
      <div class="library-title"><div><p class="section-label">The resource library</p><h2 id="library-heading">Guidance you can keep.</h2></div><p aria-live="polite">{{ loading ? 'Loading resources…' : error ? 'Library unavailable' : `${pagination.count} ${resourcesAvailable}` }}</p></div>
      <form id="resource-search" class="library-filters" role="search" @submit.prevent="fetchList(1)">
        <label class="library-search"><span>Search resources</span><div><Search aria-hidden="true" /><input v-model="search" :placeholder="resourcesSearchPlaceholder" type="search" /></div></label>
        <label><span>Category</span><select v-model="category"><option value="">{{ resourcesAllCategories }}</option><option v-for="cat in categories" :key="cat.slug || cat.id" :value="cat.slug || cat.id">{{ cat.name }}</option></select></label>
        <label><span>Language</span><select v-model="language"><option value="">All languages</option><option value="en">English</option><option value="lg">Luganda</option><option value="sw">Swahili</option></select></label>
        <button class="library-reset" type="button" :disabled="!search && !category && !language" @click="clearFilters">Clear filters</button>
      </form>
      <AppLoader v-if="loading" message="Loading resources…" />
      <div v-else-if="error" class="library-state" role="status"><CircleAlert aria-hidden="true" /><h3>Resources are temporarily unavailable.</h3><p>We couldn’t load the library. Please try again.</p><button type="button" class="btn btn-primary" @click="fetchList(page)">Try again</button></div>
      <div v-else-if="resources.length" class="library-grid">
        <article v-for="resource in resources" :key="resource.id" class="library-card">
          <div class="library-card-top"><component :is="isAudioResource(resource)?Headphones:FileText" aria-hidden="true" /><span>{{ isAudioResource(resource)?'Audio':(resource.file_type || 'Document').toUpperCase() }}</span></div>
          <div class="library-meta"><span v-if="resource.category_name || resource.category?.name">{{ resource.category_name || resource.category.name }}</span><span v-if="resource.language">{{ getLanguageName(resource.language) }}</span></div>
          <h3>{{ resource.title }}</h3><p>{{ resource.description }}</p>
          <audio v-if="isAudioResource(resource) && resource.file" :src="resource.file" controls preload="none" :aria-label="`Listen to ${resource.title}`" />
          <div class="library-card-bottom"><a v-if="resource.file" :href="resource.file" :download="resource.title" target="_blank" rel="noopener noreferrer" :aria-label="`Download ${resource.title}`">Download <Download aria-hidden="true" /></a><span v-else>File unavailable</span><small>{{ resource.download_count || 0 }} downloads</small></div>
        </article>
      </div>
      <div v-else class="library-state" role="status"><Search aria-hidden="true" /><h3>{{ settingsStore.settings.resources_no_results || 'No Resources Found' }}</h3><p>{{ settingsStore.settings.resources_no_results_subtitle || 'Try adjusting your search criteria.' }}</p><button v-if="search || category || language" type="button" class="btn btn-outline" @click="clearFilters">Clear all filters</button></div>
      <nav v-if="pagination.next || pagination.previous" class="library-pagination" aria-label="Resource pages"><button :disabled="!pagination.previous || loading" @click="fetchList(resourcePage(pagination.previous))">Previous</button><span>Page {{ page }}</span><button :disabled="!pagination.next || loading" @click="fetchList(resourcePage(pagination.next))">Next</button></nav>
      <aside class="library-help"><ShieldCheck aria-hidden="true" /><div><h3>Need to talk to someone?</h3><p>Call 116 for free, confidential support, any time.</p></div><a href="tel:116">Call 116 <ArrowUpRight aria-hidden="true" /></a></aside>
    </section>
  </div>
</template>
<script setup>
import {ref,computed,watch,onMounted,onUnmounted} from 'vue'
import {Search,FileText,Headphones,Download,ArrowDown,ArrowUpRight,ShieldCheck,CircleAlert} from 'lucide-vue-next'
import {useResourcesStore} from '@/store/resources'
import {useSettingsStore} from '@/store/settings'
import AppLoader from '@/components/common/AppLoader.vue'
import {normalizeResources,resourcePage,isAudioResource} from '@/utils/resource-catalogue'
const resourcesStore=useResourcesStore(),settingsStore=useSettingsStore()
const resources=ref([]),loading=ref(true),error=ref(false),search=ref(''),category=ref(''),language=ref(''),categories=ref([]),page=ref(1)
const pagination=ref({count:0,next:null,previous:null})
const resourcesDownloadsTitle=computed(()=>settingsStore.settings.resources_downloads_title || 'Resources')
const resourcesAvailable=computed(()=>settingsStore.settings.resources_available || 'items available')
const resourcesSearchPlaceholder=computed(()=>settingsStore.settings.resources_search_placeholder || 'Search keywords…')
const resourcesAllCategories=computed(()=>settingsStore.settings.resources_all_categories || 'All Categories')
let timer,request=0
async function fetchList(targetPage=1){
 clearTimeout(timer)
 const current=++request;loading.value=true;error.value=false;page.value=targetPage
 try{
  const data=await resourcesStore.fetchResources({status:'PUBLISHED',page:targetPage,...(search.value?{search:search.value}:{}),...(category.value?{category:category.value}:{}),...(language.value?{language:language.value}:{})})
  if(current!==request)return
  const normalized=normalizeResources(data)
  resources.value=normalized.results;pagination.value={count:normalized.count,next:normalized.next,previous:normalized.previous}
 }catch{if(current===request){error.value=true;resources.value=[];pagination.value={count:0,next:null,previous:null}}}
 finally{if(current===request)loading.value=false}
}
function clearFilters(){search.value='';category.value='';language.value='';fetchList(1)}
const getLanguageName=code=>({en:'English',lg:'Luganda',sw:'Swahili'}[code] || code)
watch(search,()=>{++request;loading.value=true;clearTimeout(timer);timer=setTimeout(()=>fetchList(1),300)})
watch([category,language],()=>fetchList(1))
onMounted(async()=>{const [cats]=await Promise.all([resourcesStore.fetchCategories(),fetchList()]);categories.value=cats})
onUnmounted(()=>{clearTimeout(timer);++request})
</script>
<style scoped>
.resource-intro{display:grid;grid-template-columns:1.3fr 1fr;gap:4rem;align-items:center;}
.resource-intro h1{margin:.75rem 0 1rem;}
.resource-intro img{width:100%;height:280px;object-fit:cover;border-radius:20px;}
.resource-intro .text-link{margin-top:1.5rem;}
.library-content{padding-block:1rem 5rem;}
.library-title{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;margin-bottom:2rem;}
.library-title h2{margin-top:.5rem;}.library-title>p{font-size:.9375rem;color:var(--ui-secondary-label);margin:0;}
.library-filters{display:grid;grid-template-columns:2fr 1fr 1fr auto;align-items:end;gap:1rem;padding:1.25rem;border:1px solid var(--ui-separator);border-radius:16px;background:var(--ui-surface);box-shadow:var(--ui-control-shadow);margin-bottom:2rem;scroll-margin-top:2rem;}
.library-filters label>span{display:block;font-size:.8125rem;font-weight:500;margin-bottom:.5rem;color:var(--ui-secondary-label);}
.library-search>div{position:relative;}.library-search svg{width:1.125rem;height:1.125rem;position:absolute;left:.875rem;top:50%;transform:translateY(-50%);color:var(--ui-secondary-label);}
.library-filters input,.library-filters select{width:100%;min-width:0;min-height:44px;border:1px solid var(--ui-separator);border-radius:10px;background:var(--ui-background);font-size:.9375rem;padding:.625rem .75rem;}
.library-search input{padding-left:2.5rem;}.library-reset{min-height:44px;font-size:.875rem;padding:.625rem .5rem;color:var(--ui-accent);}.library-reset:disabled{opacity:.45;}
.library-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem;}
.library-card{display:flex;flex-direction:column;padding:1.75rem;border:1px solid var(--ui-separator);background:var(--ui-surface);border-radius:20px;min-width:0;box-shadow:var(--ui-control-shadow);}
.library-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;}.library-card-top svg{width:2rem;height:2rem;color:var(--ui-accent);}.library-card-top span{font-size:.75rem;color:var(--ui-secondary-label);}
.library-meta{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem;}.library-meta span{font-size:.75rem;background:var(--ui-tint);color:var(--ui-accent);border-radius:6px;padding:.25rem .5rem;}
.library-card h3{font-size:1.5rem;margin-bottom:1rem;overflow-wrap:anywhere;}.library-card>p{font-size:1rem;line-height:1.6;color:var(--ui-secondary-label);margin-bottom:1.5rem;}
.library-card audio{width:100%;margin-bottom:1rem;}.library-card-bottom{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:auto;padding-top:1rem;border-top:1px solid var(--ui-separator);}.library-card-bottom a{display:inline-flex;align-items:center;gap:.5rem;color:var(--ui-accent);font-weight:500;min-height:44px;}.library-card-bottom svg{width:1rem;height:1rem;}.library-card-bottom small{font-size:.75rem;color:var(--ui-secondary-label);}
.library-state{padding:4rem 1.5rem;text-align:center;background:var(--ui-surface);border:1px solid var(--ui-separator);border-radius:20px;}.library-state>svg{width:2rem;height:2rem;margin:0 auto 1.5rem;color:var(--ui-secondary-label);}.library-state h3{font-size:1.5rem;}.library-state p{color:var(--ui-secondary-label);font-size:1rem;margin:1rem 0 1.5rem;}
.library-pagination{display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-top:2rem;}.library-pagination button{padding:.625rem 1rem;border:1px solid var(--ui-separator);border-radius:10px;min-height:44px;}.library-pagination button:disabled{opacity:.4;}
.library-help{display:flex;align-items:center;gap:1.25rem;background:var(--ui-tint);padding:1.5rem;border-radius:16px;margin-top:3rem;}.library-help>svg{width:2rem;height:2rem;flex-shrink:0;color:var(--ui-accent);}.library-help h3{font-size:1.125rem;}.library-help p{font-size:1rem;color:var(--ui-secondary-label);margin:.25rem 0 0;}.library-help a{display:inline-flex;align-items:center;gap:.5rem;margin-left:auto;min-height:44px;white-space:nowrap;color:var(--ui-accent);}.library-help a svg{width:1rem;height:1rem;}
@media(max-width:1023px){.library-filters{grid-template-columns:1fr 1fr}.library-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.resource-intro{gap:2rem}}
@media(max-width:639px){.resource-intro{grid-template-columns:1fr}.resource-intro img{height:220px}.library-title{flex-direction:column;align-items:flex-start;gap:1rem}.library-filters,.library-grid{grid-template-columns:1fr}.library-help{flex-wrap:wrap;align-items:flex-start}.library-help>div{flex:1}.library-help a{margin-left:3.25rem}.library-card{padding:1.5rem}}
</style>
