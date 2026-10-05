<template>
  <footer class="sauti-footer">
    <div class="container-custom">
      <div class="footer-support"><div><p>Here when you need us.</p><h2>One call can make<br />a difference.</h2></div><div class="footer-support-actions"><a href="tel:116" class="footer-call"><Phone aria-hidden="true" /> Call 116 <ArrowUpRight aria-hidden="true" /></a><span>Toll-free. Confidential. Available 24/7.</span><router-link to="/report" class="footer-report">Report a case online <ArrowUpRight aria-hidden="true" /></router-link></div></div>
      <div class="footer-directory">
        <div class="footer-brand"><router-link to="/" aria-label="Sauti 116 home">Sauti <span>116</span></router-link><p>Uganda's verified National Child Helpline. Providing 24/7 confidential support, guidance, and emergency intervention for all citizens.</p><div class="footer-social"><a v-for="social in socials" :key="social.label" :href="social.url" :aria-label="social.label" target="_blank" rel="noopener noreferrer"><component :is="social.icon" aria-hidden="true" /></a></div></div>
        <nav v-for="group in groups" :key="group.title" :aria-label="group.title"><h3>{{ group.title }}</h3><ul><li v-for="link in group.links" :key="link.to"><router-link :to="link.to">{{ link.label }}</router-link></li></ul></nav>
        <div class="footer-contact"><h3>Get in touch</h3><a href="tel:116">Call 116</a><a href="mailto:info@sauti116.ug">info@sauti116.ug</a><p>Ministry of Gender, Labour and Social Development<br />Uganda</p></div>
      </div>
      <div class="footer-bottom"><p>© {{ new Date().getFullYear() }} Sauti 116. Ministry of Gender, Labour and Social Development.</p><nav aria-label="Legal information"><router-link to="/privacy">Privacy Policy</router-link><router-link to="/terms">Terms of Service</router-link><router-link to="/accessibility">Accessibility</router-link></nav></div>
    </div>
  </footer>
</template>
<script setup>
import {Phone,ArrowUpRight,Facebook,Twitter,MessageCircle} from 'lucide-vue-next'
const socials=[{label:'Sauti on Facebook',url:'https://facebook.com/Sauti116Helpline',icon:Facebook},{label:'Sauti on X',url:'https://x.com/sauti116',icon:Twitter},{label:'Contact Sauti on WhatsApp',url:'https://wa.me/256743889999',icon:MessageCircle}]
const groups=[
 {title:'Explore Sauti',links:[{label:'Home',to:'/'},{label:'Who We Are',to:'/about'},{label:'Services',to:'/operations'},{label:'Partners',to:'/partners'},{label:'Donate',to:'/donate'}]},
 {title:'Learn & stay informed',links:[{label:'Updates & Blogs',to:'/blogs'},{label:'News',to:'/news'},{label:'Videos',to:'/videos'},{label:'Resources',to:'/resources'},{label:'Reports & Insights',to:'/reports'}]},
 {title:'Find support',links:[{label:'Report a Case',to:'/report'},{label:'FAQs',to:'/faqs'},{label:'Contact Us',to:'/contact'}]}
]
</script>
<style scoped>
.sauti-footer {background:#eef2ec;color:#263d2e;border-top:1px solid #d8dfd5;padding-block:4rem 1.5rem;}
.footer-support {display:flex;align-items:center;justify-content:space-between;gap:3rem;padding-bottom:3rem;border-bottom:1px solid #d0d9ce;}
.footer-support p {font-size:1rem;color:#526052;margin-bottom:1rem;}
.footer-support h2 {font-size:clamp(2rem,4vw,3.5rem);font-weight:600;line-height:1.08;letter-spacing:-.045em;}
.footer-support-actions {display:flex;flex-direction:column;align-items:flex-start;gap:.875rem;}
.footer-call {display:inline-flex;align-items:center;justify-content:center;gap:.75rem;background:#294c36;color:#fff;border-radius:100px;min-height:52px;padding:.875rem 1.5rem;font-size:1.125rem;font-weight:500;}
.footer-call svg {width:1.125rem;height:1.125rem;}
.footer-support-actions span {color:#526052;font-size:.9375rem;}
.footer-report {display:inline-flex;align-items:center;gap:.5rem;min-height:44px;font-weight:500;}
.footer-report svg {width:1rem;height:1rem;}
.footer-directory {display:grid;grid-template-columns:1.6fr repeat(3,1fr) 1.3fr;gap:2rem;padding-block:3rem;}
.footer-brand>a {font-size:2rem;font-weight:600;letter-spacing:-.045em;}
.footer-brand>a span {color:#567041;}
.footer-brand p,.footer-contact p {font-size:.9375rem;line-height:1.65;color:#526052;margin:1rem 0;max-width:30ch;}
.footer-directory h3 {font-size:.875rem;font-weight:600;letter-spacing:0;margin-bottom:1rem;}
.footer-directory ul {list-style:none;margin:0;padding:0;}
.footer-directory li a,.footer-contact>a {display:block;font-size:.9375rem;line-height:1.5;padding:.5rem 0;overflow-wrap:anywhere;color:#526052;}
.footer-social {display:flex;gap:.5rem;}
.footer-social a {display:flex;align-items:center;justify-content:center;width:44px;height:44px;border:1px solid #c8d3c5;border-radius:50%;}
.footer-social svg {width:1.125rem;height:1.125rem;stroke-width:1.5;}
.footer-bottom {border-top:1px solid #d0d9ce;padding-top:1.5rem;display:flex;justify-content:space-between;gap:1.5rem;font-size:.8125rem;line-height:1.6;color:#526052;}
.footer-bottom nav {display:flex;gap:1.25rem;flex-wrap:wrap;}
.footer-bottom a {padding:.5rem 0;}
.sauti-footer a {transition:color .15s;}
.sauti-footer a:hover {color:#182f1f;text-decoration:underline;text-underline-offset:4px;}
.sauti-footer .footer-call:hover {background:#1e3b28;color:white;text-decoration:none;}
.sauti-footer a:focus-visible {outline:3px solid #567041;outline-offset:4px;}
@media(max-width:1199px){.footer-directory{grid-template-columns:repeat(3,minmax(0,1fr))}.footer-brand{grid-column:span 2}.footer-bottom{flex-direction:column}}
@media(max-width:639px){.sauti-footer{padding-top:3rem}.footer-support{flex-direction:column;align-items:flex-start;gap:2rem}.footer-directory{grid-template-columns:repeat(2,minmax(0,1fr));gap:2rem 1rem}.footer-brand,.footer-contact{grid-column:span 2}.footer-directory li a{min-height:44px}.footer-bottom nav{gap:1rem}}
</style>
