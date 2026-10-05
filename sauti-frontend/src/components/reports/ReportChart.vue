<template>
  <div class="report-chart">
    <Doughnut v-if="kind === 'category'" :data="chartData" :options="options" role="img" :aria-label="description" />
    <Line v-else-if="kind === 'region'" :data="chartData" :options="options" role="img" :aria-label="description" />
    <Bar v-else :data="chartData" :options="options" role="img" :aria-label="description" />
  </div>
</template>
<script setup>
import {computed} from 'vue'
import {Doughnut, Line, Bar} from 'vue-chartjs'
import {Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement} from 'chart.js'
ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement)
const props=defineProps({kind:{type:String,required:true},labels:{type:Array,required:true},series:{type:Object,default:()=>({})},values:{type:Array,default:()=>[]},description:{type:String,required:true}})
const palette=['#295d43','#5983a3','#c18b48','#826a98','#849640','#727a75']
const font={family:'-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',size:12,weight:'400'}
const chartData=computed(()=>({labels:props.labels,datasets:props.kind==='category'?[{label:'Cases',data:props.values,backgroundColor:palette,borderColor:'#fcfdfb',borderWidth:3,hoverOffset:6}]:Object.entries(props.series).map(([label,data],seriesIndex)=>{const index=props.kind==='region'?['CENTRAL','EASTERN','NORTHERN','WESTERN'].indexOf(label):seriesIndex;return {label,data,backgroundColor:palette[index],borderColor:palette[index],borderRadius:4,borderSkipped:false,borderWidth:props.kind==='region'?2:0,maxBarThickness:32,pointRadius:3,pointHoverRadius:6,pointStyle:['circle','rect','triangle','rectRot','star'][index],borderDash:props.kind==='region'&&index>1?[4+index*2,4]:[],tension:0,fill:false}})}))
const options=computed(()=>({responsive:true,maintainAspectRatio:false,animation:window.matchMedia('(prefers-reduced-motion: reduce)').matches?false:{duration:300},color:'#576453',font,cutout:'68%',indexAxis:props.kind==='category'||props.kind==='region'?'x':'y',interaction:{mode:props.kind==='category'?'nearest':'index',intersect:false},layout:{padding:{top:12,right:12,bottom:4}},plugins:{legend:{display:props.kind!=='category',position:'bottom',labels:{usePointStyle:true,pointStyleWidth:10,boxWidth:10,boxHeight:10,padding:20,font,color:'#576453'}},tooltip:{backgroundColor:'#233b2c',titleFont:{...font,weight:'600'},bodyFont:font,padding:12,cornerRadius:10,displayColors:true,callbacks:{label(context){const value=Number(context.raw)||0;const total=props.values.reduce((sum,v)=>sum+v,0);return `${context.dataset.label}: ${value.toLocaleString('en-UG')}${props.kind==='category'&&total?` (${(value/total*100).toFixed(1)}%)`:''}`}}}},...(props.kind==='category'?{}:{scales:{x:{stacked:props.kind==='age',beginAtZero:true,border:{display:false},grid:{display:props.kind!=='region',color:'#e9ede5'},ticks:{font,color:'#65725e',maxRotation:0,precision:0},title:{display:props.kind!=='region',text:'Number of cases',font,color:'#65725e'}},y:{stacked:props.kind==='age',beginAtZero:true,border:{display:false},grid:{display:props.kind==='region',color:'#e9ede5'},ticks:{font,color:'#65725e',precision:0},title:{display:props.kind==='region',text:'Number of cases',font,color:'#65725e'}}}})}))
</script>
<style scoped>
.report-chart { width:100%; height:340px; min-width:0; }
@media(max-width:640px) { .report-chart { height:320px; } }
</style>
