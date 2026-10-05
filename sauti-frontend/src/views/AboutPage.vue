<template>
  <div class="public-page bg-neutral-white min-h-screen font-sans">

    <!-- A. Hero Section -->
    <!-- A. Hero Section (Centralized Floating Grid) -->
    <!-- A. Hero Section (Grid Moodboard Layout) -->
    <section class="about-community page-width">
      <div class="section-heading"><div><p class="section-label">Who we are</p><h1>About <span>Sauti 116</span></h1><p>From Uganda, For Children.</p></div><span class="about-promise">Every Child Matters</span></div>
      <div class="about-photo-grid"><img src="@/assets/sauti-aboutpage.webp" alt="Sauti team" fetchpriority="high" /><img src="@/assets/sauti_happy_students.png" alt="Children together at school" /><img src="@/assets/children-uganda-1.jpeg" alt="Children in the Ugandan community" /><img src="@/assets/helpline-center.png" alt="Sauti helpline center" loading="lazy" /></div>
    </section>









    <!-- E. Timeline Section ("Our Journey") -->
    <section class="py-24 bg-primary/5">
       <div class="container-custom">
          <div class="text-center mb-16">
             <h2 class="text-4xl font-black text-secondary mb-4">Our Journey</h2>
             <p class="text-black/60 font-bold">Milestones that define our commitment.</p>
          </div>
          <p v-if="timelineLoading" role="status" class="text-center">Loading our journey…</p>
          <AppTimeline v-else-if="timelineEvents.length" :timeline-events="timelineEvents" />
          <p v-else role="status" class="text-center">{{ timelineError ? 'Our journey is temporarily unavailable.' : 'Milestones will appear here when published.' }}</p>
       </div>
    </section>

    <ResolutionJourney :steps="resolutionSteps" />

  </div>
</template>

<script setup>
import { ref, onMounted, markRaw } from 'vue'
import { api } from '@/utils/axios'
import AppTimeline from '@/components/AppTimeline.vue'
import ResolutionJourney from '@/components/common/ResolutionJourney.vue'
import { Phone, Clock, ShieldCheck, Users } from 'lucide-vue-next'
const timelineEvents = ref([])
const timelineLoading = ref(true)
const timelineError = ref(false)
const resolutionSteps = [
  {
    title: 'Caller',
    subtitle: 'Case reported',
    description: 'A concerned community member, child, or parent calls the 116 helpline to report a case of abuse or concern.',
    color: '#005f99',
    icon: markRaw(Phone)
  },
  {
    title: 'Call Center',
    subtitle: 'Assessment',
    description: 'Our professional counselors receive the call, provide immediate counseling, and assess the severity of the case.',
    color: '#00ac46',
    icon: markRaw(Clock)
  },
  {
    title: 'Case Management',
    subtitle: 'Coordination',
    description: 'The Case Management team coordinates with local authorities ensuring the child receives medical, legal, and psychosocial support.',
    color: '#7c3aed',
    icon: markRaw(ShieldCheck)
  },
  {
    title: 'Probation',
    subtitle: 'Support',
    description: 'Probation works with police and partners to ensure long-term safety, justice, and family reintegration where possible.',
    color: '#ea580c',
    icon: markRaw(Users)
  }
]

onMounted(async () => {
  try {
    const {data} = await api.get('/content/timeline-events/')
    const events = Array.isArray(data) ? data : data.results
    timelineEvents.value = Array.isArray(events) ? events : []
  } catch { timelineError.value = true }
  finally { timelineLoading.value = false }
})
</script>
