<template>
  <div class="editorial-home">
    <!-- 1. Hero Section - Take No Chances -->
    <section class="hero-section">
      <div class="hero-container">
        <!-- Left Content -->
        <div class="hero-content">
          <!-- Logos Header -->
          <div class="hero-logos">
            <img 
              src="@/assets/sauti-logo.jpeg" 
              alt="Sauti 116 - Speak Up Against Violence" 
              class="logo-sauti"
            />
            <div class="logo-divider"></div>
            <img 
              src="@/assets/logo.png" 
              alt="Republic of Uganda" 
              class="logo-uganda"
            />
          </div>

          <!-- Main Message -->
          <div class="hero-message">
            <h1 class="hero-headline">
              TAKE NO CHANCES!
            </h1>
            <h2 class="hero-subheadline">
              Report a case now
            </h2>
            <p class="hero-cta-text">
              Call <span class="hotline-number">{{ settingsStore.settings.hotline_number || '116' }}</span> Toll Free
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="hero-actions">
            <a 
              :href="`tel:${settingsStore.settings.hotline_number || '116'}`" 
              class="btn-call-now"
            >
              <Phone class="btn-icon" />
              <span>Call Now</span>
            </a>
            <router-link to="/report" class="btn-report-online">
              <ShieldCheck class="btn-icon" />
              <span>Report a case here</span>
            </router-link>
          </div>
        </div>

        <!-- Right Image -->
        <div class="hero-image-container">
          <img 
            src="@/assets/hero-family.png" 
            alt="Ugandan mother protecting her children" 
            class="hero-image"
          />
        </div>
      </div>
    </section>

    <!-- 2. Sauti Updates -->
    <section class="home-updates section-padding bg-white">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div class="text-left space-y-4">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-light/10 text-secondary-light rounded-full font-black text-[10px] uppercase tracking-[0.2em] border border-secondary-light/20 w-fit">
              <Heart class="w-4 h-4" />
              <span>Our Impact</span>
            </div>
            <div>
              <h2 class="campaign-header text-4xl text-secondary mb-4">{{ newsTitle }}</h2>
              <p class="text-xl text-black max-w-2xl font-bold opacity-70">{{ newsDescription }}</p>
            </div>
          </div>
          
          <!-- Social Media Icons -->
          <div class="flex items-center gap-4">
            <!-- X (Twitter) -->
            <a href="#" class="p-3 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 group" aria-label="X (Twitter)">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
            </a>
            <!-- Instagram -->
            <a href="#" class="p-3 rounded-full bg-gray-100 hover:bg-[#E1306C] hover:text-white transition-all duration-300 group" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
            </a>
            <!-- Facebook -->
            <a href="#" class="p-3 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all duration-300 group" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
            </a>
            <!-- TikTok -->
            <a href="#" class="p-3 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 group" aria-label="TikTok">
               <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12v8.76c0 5.05-5.46 8.01-9.63 5.36-2.5-1.59-3.56-4.96-2.29-7.74 1.05-2.3 3.53-3.71 6.04-3.41v4.07c-1.41.06-2.84.85-3.49 2.13-.67 1.31-.22 3.08 1.03 3.91 1.25.84 3.08.57 3.98-.74.63-.9.49-2.07.49-3.15V.02h-.21z"/></svg>
            </a>
          </div>
        </div>

        <div v-if="latestVideos.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Featured Post (Left) -->
          <div v-if="latestVideos[0]" class="group cursor-pointer">
            <div class="rounded-3xl overflow-hidden aspect-[16/10] shadow-xl mb-6">
              <img :src="latestVideos[0].thumbnail" :alt="latestVideos[0].title"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="space-y-3">
              <span class="text-primary font-bold text-sm tracking-widest uppercase">{{ latestVideos[0].category }}</span>
              <h3 class="text-3xl font-bold text-secondary leading-tight group-hover:text-primary transition-colors">
                {{ latestVideos[0].title }}
              </h3>
              <p class="text-gray-600 line-clamp-3" v-if="latestVideos[0].excerpt">{{ latestVideos[0].excerpt }}</p>
              <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">{{ latestVideos[0].date }}</p>
            </div>
          </div>

          <!-- Side List (Right) -->
          <div class="flex flex-col gap-8">
            <div v-for="post in latestVideos.slice(1)" :key="post.id" class="group cursor-pointer flex gap-6 items-start">
              <div class="shrink-0 w-32 h-32 rounded-2xl overflow-hidden shadow-md">
                <img :src="post.thumbnail" :alt="post.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="space-y-2">
                <span class="text-primary font-bold text-xs tracking-widest uppercase">{{ post.category }}</span>
                <h3 class="text-xl font-bold text-secondary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {{ post.title }}
                </h3>
                <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">{{ post.date }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State / Loading - Mock Data for Design Review -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <!-- Featured Mock -->
           <div class="group cursor-pointer">
            <div class="rounded-3xl overflow-hidden aspect-[16/10] shadow-xl mb-6 bg-gray-200">
               <img src="@/assets/diverse_helpline_operations.png" class="w-full h-full object-cover opacity-80" />
            </div>
            <div class="space-y-3">
              <span class="text-primary font-bold text-sm tracking-widest uppercase">Community</span>
              <h3 class="text-3xl font-bold text-secondary leading-tight">Sauti 116 Expands Reach to Rural Areas</h3>
              <p class="text-gray-600">We are dedicated to ensuring every voice is heard. Our latest initiative focuses on reaching remote villages to provide immediate support.</p>
              <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Jan 12, 2026</p>
            </div>
          </div>
           <!-- Side Mock -->
           <div class="flex flex-col gap-8">
             <div class="flex gap-6 items-start group cursor-pointer">
                <div class="shrink-0 w-32 h-32 rounded-2xl overflow-hidden shadow-md bg-gray-200"></div>
                <div class="space-y-2">
                   <span class="text-primary font-bold text-xs tracking-widest uppercase">Education</span>
                   <h3 class="text-xl font-bold text-secondary leading-snug">School Outreach Programs Launching Soon</h3>
                   <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Jan 10, 2026</p>
                </div>
             </div>
             <div class="flex gap-6 items-start group cursor-pointer">
                <div class="shrink-0 w-32 h-32 rounded-2xl overflow-hidden shadow-md bg-gray-200"></div>
                <div class="space-y-2">
                   <span class="text-primary font-bold text-xs tracking-widest uppercase">Health</span>
                   <h3 class="text-xl font-bold text-secondary leading-snug">Partnership with Ministry of Health</h3>
                   <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Jan 08, 2026</p>
                </div>
             </div>
             <div class="flex gap-6 items-start group cursor-pointer">
                <div class="shrink-0 w-32 h-32 rounded-2xl overflow-hidden shadow-md bg-gray-200"></div>
                <div class="space-y-2">
                   <span class="text-primary font-bold text-xs tracking-widest uppercase">Training</span>
                   <h3 class="text-xl font-bold text-secondary leading-snug">Counselor Training Certification Complete</h3>
                   <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Jan 05, 2026</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>





    <!-- 5. Partner Logos -->
    <section class="home-partners section-padding bg-neutral-offwhite">
      <div class="container-custom">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-secondary mb-4">
            {{ partnersTitle }}
          </h2>
          <p class="text-lg md:text-xl text-black max-w-2xl mx-auto">
            {{ partnersDescription }}
          </p>
        </div>

        <PartnerGrid :partners="partners" />
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { usePartnersStore } from '@/store/partners'
  import { useBlogStore } from '@/store/blog'
  import { useSettingsStore } from '@/store/settings'
  import PartnerGrid from '@/components/common/PartnerGrid.vue'
  import {
    ShieldCheck,
    ArrowRight,
    Heart,
    Phone
  } from 'lucide-vue-next'

  defineOptions({
    name: 'HomePage'
  })

  const partnersStore = usePartnersStore()
  const blogStore = useBlogStore()
  const settingsStore = useSettingsStore()


  const latestVideos = ref([])
  const loadingVideos = ref(false)
  const partners = ref([])



  const newsTitle = computed(() => settingsStore.settings?.news_title || 'Sauti Updates')
  const newsDescription = computed(() => settingsStore.settings?.news_description || 'Stories and news from our team on how we are making Uganda safer.')
  const partnersTitle = computed(() => settingsStore.settings?.partners_title || 'Official Protection Partners')
  const partnersDescription = computed(() => settingsStore.settings?.partners_description || 'Working together to protect every child and survivor in Uganda.')



  const activeBadges = computed(() => {
    const badges = settingsStore.settings?.hero_badges
    if (Array.isArray(badges)) {
      return badges.filter(b => b && b.is_active)
    }
    return []
  })

  onMounted(async () => {
    // Load all data concurrently
    const results = await Promise.allSettled([
      settingsStore.fetchGlobalSettings(),
      partnersStore.fetchPartners(),
      blogStore.fetchPosts({
        status: 'PUBLISHED',
        ordering: '-published_at,-created_at',
        limit: 4
      })
    ])

    // Handle partners result
    if (results[1].status === 'fulfilled') {
      const partnersData = partnersStore.partners
      console.log('Partners data loaded:', partnersData)
      // Ensure we are setting an array, regardless of potential proxy/reactivity nesting
      if (Array.isArray(partnersData)) {
        partners.value = [...partnersData]
      } else if (partnersData && partnersData.results && Array.isArray(partnersData.results)) {
        partners.value = [...partnersData.results]
      } else {
        partners.value = []
      }
    } else {
      console.error('Failed to load partners:', results[1].reason)
      partners.value = []
    }

    // Handle blog posts result
    if (results[2].status === 'fulfilled') {
      latestVideos.value = blogStore.posts
        .filter(post => post.featured_image)
        .map(post => ({
          id: post.id,
          title: post.title,
          category: post.category?.name || 'Story',
          thumbnail: post.featured_image,
          excerpt: post.excerpt || post.summary || '',
          date: new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }))
    } else {
      console.error('Failed to load recent publications:', results[2].reason)
    }

    // Help Services handled by store state directly

    // Auto-expand from hash if valid service key
    const hash = window.location.hash.replace('#', '')
    if (hash && helpServicesStore.services.some(s => s.key === hash)) {
      expandedServiceKey.value = hash
    }

    loadingVideos.value = false
  })
</script>

<style scoped>
.hero-section { background: var(--editorial-paper); padding: 24px clamp(20px, 5vw, 80px) 64px; }
.hero-container { max-width: 1440px; margin: auto; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 5vw, 80px); align-items: center; }
.hero-content { display: flex; flex-direction: column; align-items: flex-start; gap: 36px; padding: 24px 0; min-width: 0; }
.hero-logos { display: flex; gap: 20px; align-items: center; }
.logo-sauti { height: 44px; width: auto; }
.logo-uganda { height: 44px; width: auto; }
.logo-divider { height: 36px; width: 1px; background: var(--editorial-line); }
.hero-message { display: flex; flex-direction: column; gap: 20px; }
.hero-headline { font-size: clamp(64px, 7.4vw, 112px); font-weight: 400; line-height: .94; letter-spacing: -.065em; color: var(--editorial-ink); margin: 0; max-width: 8ch; text-wrap: balance; }
.hero-subheadline { font-size: clamp(24px, 2.5vw, 36px); font-weight: 400; letter-spacing: -.035em; color: var(--editorial-ink); margin: 0; }
.hero-cta-text { margin: 0; font-size: 18px; color: var(--editorial-ink); }
.hotline-number { color: rgb(var(--color-secondary)); font-weight: 700; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.btn-call-now, .btn-report-online { display: inline-flex; align-items: center; gap: 12px; min-height: 48px; padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; transition: background .2s ease, transform .2s ease; }
.btn-call-now { background: var(--editorial-ink); color: var(--editorial-paper); }
.btn-report-online { border: 1px solid var(--editorial-line); color: var(--editorial-ink); }
.btn-call-now:hover { background: rgb(var(--color-secondary)); transform: translateY(-2px); }
.btn-report-online:hover { background: var(--editorial-muted); }
.btn-icon { width: 20px; height: 20px; }
.hero-image-container { height: clamp(440px, 48vw, 690px); overflow: hidden; border-radius: 32px; clip-path: polygon(23% 0, 100% 0, 100% 74%, 76% 100%, 0 100%, 0 24%); background: var(--editorial-muted); }
.hero-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.section-padding { padding-block: clamp(64px, 8vw, 112px); }
.line-clamp-2, .line-clamp-3 { display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-2 { -webkit-line-clamp: 2; }
.line-clamp-3 { -webkit-line-clamp: 3; }
@media (max-width: 900px) {
 .hero-container { grid-template-columns: 1fr; gap: 32px; }
 .hero-content { gap: 24px; padding: 0; }
 .hero-headline { font-size: clamp(62px, 12vw, 96px); max-width: 12ch; }
 .hero-image-container { height: clamp(320px, 75vw, 560px); }
 .hero-section { padding-top: 24px; padding-bottom: 48px; }
}
@media (prefers-reduced-motion: reduce) {
 .btn-call-now, .btn-report-online { transition: none; }
}
</style>
