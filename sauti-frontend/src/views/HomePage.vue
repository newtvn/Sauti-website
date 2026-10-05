<template>
  <div class="public-page community-home">
    <section class="community-hero page-width">
      <div class="hero-copy">
        <div class="institutional-marks"><img src="@/assets/sauti-logo.jpeg" alt="Sauti 116 — Speak Up Against Violence" /><img src="@/assets/logo.png" alt="Republic of Uganda" /></div>
        <p class="section-label">Uganda’s National Child Helpline</p>
        <h1>TAKE NO<br /><span>CHANCES!</span></h1>
        <h2>Report a case now</h2>
        <p class="hero-description">Call <strong>{{ hotline }}</strong> Toll Free</p>
        <div class="action-row"><a :href="`tel:${hotline}`" class="action-primary"><Phone :size="18" /> Call Now <ArrowUpRight :size="18" /></a><router-link to="/report" class="action-secondary">Report a case here <ArrowUpRight :size="18" /></router-link></div>
        <p class="hero-note"><ShieldCheck :size="16" /> 24/7 confidential support across Uganda.</p>
      </div>
      <div class="community-photo-grid" aria-label="Communities supported by Sauti">
        <figure class="photo-family"><img src="@/assets/hero-family.png" alt="A Ugandan mother with her children" fetchpriority="high" /></figure>
        <figure class="photo-school"><img src="@/assets/sauti_happy_students.png" alt="Children together at school" /></figure>
        <figure class="photo-response"><img src="@/assets/diverse_helpline_operations.png" alt="The helpline team supporting callers" /></figure>
        <div class="photo-caption"><span class="availability-dot"></span><span>Every voice matters.</span><a :href="`tel:${hotline}`" :aria-label="`Call ${hotline} toll free`">{{ hotline }} <ArrowUpRight :size="18" /></a></div>
      </div>
    </section>

    <section class="coverage-strip page-width" aria-label="Helpline availability"><div><strong>24/7</strong><span>Available</span></div><div><strong>26</strong><span>Local languages</span></div><div><strong>{{ hotline }}</strong><span>Toll-free access</span></div><div><strong>Uganda</strong><span>Nationwide support</span></div></section>

    <section class="community-services page-width" aria-labelledby="services-title">
      <div class="section-heading"><div><p class="section-label">Operations & Services</p><h2 id="services-title">Support for every voice.</h2></div><router-link to="/operations" class="text-link">All services <ArrowUpRight :size="18" /></router-link></div>
      <div class="support-grid"><router-link v-for="(service, index) in services" :key="service.key || service.title" :to="service.key ? `/get-help/${service.key}` : '/operations'" class="support-tile" :class="{ 'support-tile-green': index === 1 }"><span class="support-number">0{{ index + 1 }}</span><component :is="serviceIcons[index % serviceIcons.length]" class="support-icon" :stroke-width="1.3" /><h3>{{ service.title }}</h3><p>{{ service.summary }}</p><span class="tile-link">Learn more <ArrowUpRight :size="18" /></span></router-link></div>
      <div v-if="expandedService" :id="expandedService.key" class="service-detail"><ServiceExpandableCard :service="expandedService" :isOpen="true" @toggle="clearServiceHash" /></div>
    </section>

    <section class="community-callout page-width"><div><p class="section-label">Here when you need us</p><h2>Speak up against violence.</h2><p>Professional counseling services available 24/7 through our toll-free helpline {{ hotline }}.</p><router-link to="/report" class="action-lime">Report a case here <ArrowUpRight :size="18" /></router-link></div><img src="@/assets/helpline-action.png" alt="A helpline counselor ready to provide support" loading="lazy" /></section>

    <section class="community-stories page-width" aria-labelledby="stories-title"><div class="section-heading"><div><p class="section-label">Our Impact</p><h2 id="stories-title">{{ newsTitle }}</h2><p>{{ newsDescription }}</p></div><router-link to="/blogs" class="text-link">All blogs <ArrowUpRight :size="18" /></router-link></div><div v-if="blogStore.loading" class="content-status" role="status">Loading updates…</div><div v-else-if="recentPosts.length" class="publication-grid"><BlogCard v-for="post in recentPosts" :key="post.id" :post="post" /></div><div v-else class="content-status"><p>{{ blogStore.error ? 'Updates are temporarily unavailable.' : 'New updates will appear here when published.' }}</p><router-link to="/blogs" class="text-link">Explore updates <ArrowRight :size="18" /></router-link></div></section>

    <section class="community-videos" aria-labelledby="videos-title"><div class="page-width"><div class="section-heading"><div><p class="section-label">Watch & Learn</p><h2 id="videos-title">Sauti Videos</h2><p>Educational and awareness videos.</p></div><router-link to="/videos" class="text-link">All videos <ArrowUpRight :size="18" /></router-link></div><div v-if="videosStore.loading" class="content-status" role="status">Loading videos…</div><div v-else-if="recentVideos.length" class="publication-grid"><button v-for="video in recentVideos" :key="video.id" class="home-video" @click="selectedVideo = video"><span class="video-art"><img :src="video.thumbnail || video.youtube_thumbnail_url || videoFallback" :alt="video.title" loading="lazy" @error="imageFallback" /><span class="play-button"><Play :size="22" fill="currentColor" /></span></span><span class="video-info"><span class="section-label">{{ video.category?.name || 'Sauti 116' }}</span><span class="video-title">{{ video.title }}</span><span class="video-date">{{ formatDate(video.published_at || video.created_at) }}</span></span></button></div><div v-else class="content-status"><p>{{ videosStore.error ? 'Videos are temporarily unavailable.' : 'New videos will appear here when published.' }}</p><router-link to="/videos" class="text-link">Explore the video library <ArrowRight :size="18" /></router-link></div></div></section>

    <section class="community-partners page-width"><div class="section-heading"><div><p class="section-label">Working together</p><h2>{{ partnersTitle }}</h2><p>{{ partnersDescription }}</p></div><router-link to="/partners" class="text-link">Our partners <ArrowUpRight :size="18" /></router-link></div><PartnerGrid :partners="partnersStore.partners" /></section>
    <VideoPlayerModal v-if="selectedVideo" :isOpen="!!selectedVideo" :video="selectedVideo" @close="selectedVideo = null" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Phone, ShieldCheck, ArrowUpRight, ArrowRight, Play, HeartHandshake, MessagesSquare, BookOpen, MapPin } from 'lucide-vue-next'
import { useSettingsStore } from '@/store/settings'
import { useBlogStore } from '@/store/blog'
import { useVideosStore } from '@/store/videos'
import { usePartnersStore } from '@/store/partners'
import { useHelpServicesStore } from '@/store/help-services'
import BlogCard from '@/components/blog/BlogCard.vue'
import PartnerGrid from '@/components/common/PartnerGrid.vue'
import VideoPlayerModal from '@/components/videos/VideoPlayerModal.vue'
import ServiceExpandableCard from '@/components/home/ServiceExpandableCard.vue'
import videoFallback from '@/assets/helpline-action.png'
const settingsStore = useSettingsStore(), blogStore = useBlogStore(), videosStore = useVideosStore(), partnersStore = usePartnersStore(), helpStore = useHelpServicesStore()
const route = useRoute(), router = useRouter(), selectedVideo = ref(null)
const hotline = computed(() => settingsStore.settings?.hotline_number || '116')
const newsTitle = computed(() => settingsStore.settings?.news_title || 'Sauti Updates')
const newsDescription = computed(() => settingsStore.settings?.news_description || 'Stories and news from our team on how we are making Uganda safer.')
const partnersTitle = computed(() => settingsStore.settings?.partners_title || 'Official Protection Partners')
const partnersDescription = computed(() => settingsStore.settings?.partners_description || 'Working together to protect every child and survivor in Uganda.')
const recentPosts = computed(() => blogStore.posts.slice(0, 3))
const recentVideos = computed(() => videosStore.videos.slice(0, 3))
const serviceIcons = [MessagesSquare, HeartHandshake, BookOpen, MapPin]
const services = computed(() => Array.isArray(helpStore.services) && helpStore.services.length ? helpStore.services.slice(0, 4) : [
 {title: 'Telephone Counseling', summary: 'Professional counseling services available 24/7 through our toll-free helpline 116.'},
 {title: 'Walk-In Support', summary: 'Handle walk-in clients at our offices for face-to-face consultation and support.'},
 {title: 'Information & Guidance', summary: 'Provision of information and guidance on child care and protection matters.'},
 {title: 'Essential Service Referrals', summary: 'Referral to essential services including healthcare, legal aid, and social support.'}
])
const expandedService = computed(() => Array.isArray(helpStore.services) ? helpStore.services.find(s => s.key === route.hash.slice(1)) : null)
const clearServiceHash = () => router.replace({path: '/', hash: ''})
function imageFallback(event) { event.target.onerror = null; event.target.src = videoFallback }
function formatDate(value) { if (!value) return ''; const date = new Date(value); return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-UG', {month: 'short', day: 'numeric', year: 'numeric'}) }
onMounted(() => Promise.allSettled([settingsStore.fetchGlobalSettings(), blogStore.fetchPosts({status: 'PUBLISHED', ordering: '-published_at,-created_at', limit: 3}), videosStore.fetchVideos({status: 'PUBLISHED', ordering: '-published_at', limit: 3}), partnersStore.fetchPartners(), helpStore.fetchServices()]))
</script>
