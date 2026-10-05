<template>
  <section class="resolution-journey" :aria-labelledby="headingId">
    <div class="container-custom">
      <div class="resolution-heading"><p class="section-label">From concern to support</p><h2 :id="headingId">{{ title }}</h2><p>{{ subtitle }}</p></div>
      <ol class="resolution-steps">
        <li v-for="(step,index) in steps" :key="step.title">
          <div class="resolution-step-top"><span class="resolution-number">{{ String(index+1).padStart(2,'0') }}</span><component :is="step.icon" aria-hidden="true" /></div>
          <p class="resolution-tag">{{ step.subtitle || step.tag }}</p>
          <h3>{{ step.title }}</h3><p class="resolution-description">{{ step.description || step.text }}</p>
        </li>
      </ol>
      <div class="resolution-outcome"><ShieldCheck aria-hidden="true" /><div><h3>Our goal: a safe child.</h3><p>Support, coordination and follow-up, with the child’s safety at the centre.</p></div><router-link to="/report">Report a concern <ArrowUpRight aria-hidden="true" /></router-link></div>
    </div>
  </section>
</template>
<script setup>
import {ShieldCheck,ArrowUpRight} from 'lucide-vue-next'
defineProps({title:{type:String,default:'Path to Resolution'},subtitle:{type:String,default:'How a reported concern moves through assessment, coordination and support.'},steps:{type:Array,required:true},headingId:{type:String,default:'resolution-heading'}})
</script>
<style scoped>
.resolution-journey {padding-block:clamp(3rem,7vw,6rem);background:#f2f5f0;color:#24392c;}
.resolution-heading {max-width:44rem;margin-bottom:3rem;}
.resolution-heading h2 {margin:.75rem 0 1rem;}
.resolution-heading>p:last-child {font-size:1.125rem;line-height:1.6;color:#536157;max-width:55ch;}
.resolution-steps {list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:2rem;padding:0;margin:0;}
.resolution-steps li {border-top:1px solid #c9d5ca;padding-top:1.5rem;min-width:0;}
.resolution-step-top {display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;color:#39664b;}
.resolution-number {font-size:2rem;font-weight:500;font-variant-numeric:tabular-nums;letter-spacing:-.04em;}
.resolution-step-top svg {width:1.5rem;height:1.5rem;stroke-width:1.5;}
.resolution-tag {font-size:.8125rem;font-weight:500;color:#536157;margin-bottom:.5rem;}
.resolution-steps h3 {font-size:1.5rem;line-height:1.2;font-weight:600;letter-spacing:-.025em;margin-bottom:1rem;}
.resolution-description {font-size:1rem;line-height:1.65;color:#536157;}
.resolution-outcome {display:flex;align-items:center;gap:1.25rem;margin-top:3rem;padding:1.5rem 0;border-top:1px solid #c9d5ca;}
.resolution-outcome>svg {width:2rem;height:2rem;flex-shrink:0;stroke-width:1.5;}
.resolution-outcome h3 {font-size:1.125rem;font-weight:600;letter-spacing:-.02em;}
.resolution-outcome p {margin-top:.25rem;line-height:1.5;color:#536157;}
.resolution-outcome a {display:inline-flex;gap:.5rem;align-items:center;margin-left:auto;white-space:nowrap;min-height:44px;font-weight:500;}
.resolution-outcome a svg {width:1rem;height:1rem;}
@media(max-width:1023px) {.resolution-steps{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:639px) {.resolution-steps{grid-template-columns:1fr;gap:2rem}.resolution-step-top{margin-bottom:1rem}.resolution-outcome{align-items:flex-start;flex-wrap:wrap}.resolution-outcome>div{flex:1}.resolution-outcome a{margin-left:3.25rem}}
</style>
