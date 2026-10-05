<template><component :is="symbol" fill="none" :stroke-width="1.75" aria-hidden="true" /></template>
<script setup>
import {computed} from 'vue'
import {ArrowLeft,Minus,Maximize2,X,ThumbsUp,ThumbsDown,TriangleAlert,MapPin,CloudUpload,Phone,Mic,MicOff,ArrowUp,SkipForward,CircleAlert,Info,CircleCheck,Download,Plus,BookOpen,MessagesSquare,FileText,FileImage,FileVideo,FileAudio,Paperclip} from 'lucide-vue-next'
const props=defineProps({icon:{type:[Array,String,Object],required:true}})
const symbols={'arrow-left':ArrowLeft,minus:Minus,maximize:Maximize2,xmark:X,times:X,'thumbs-up':ThumbsUp,'thumbs-down':ThumbsDown,'exclamation-triangle':TriangleAlert,'map-marker-alt':MapPin,'cloud-upload-alt':CloudUpload,phone:Phone,microphone:Mic,'microphone-slash':MicOff,'paper-plane':ArrowUp,forward:SkipForward,'exclamation-circle':CircleAlert,'info-circle':Info,'check-circle':CircleCheck,download:Download,plus:Plus,book:BookOpen,comments:MessagesSquare,'file-alt':FileText,'file-image':FileImage,'file-video':FileVideo,'file-audio':FileAudio}
const symbol=computed(()=>symbols[Array.isArray(props.icon)?props.icon[1]:typeof props.icon==='object'?props.icon.iconName:props.icon] || Paperclip)
</script>
