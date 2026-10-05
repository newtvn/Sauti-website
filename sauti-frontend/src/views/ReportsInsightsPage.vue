<template>
 <div class="public-page reports-page">
  <header class="page-header"><div class="container-custom"><p class="section-label">Reports & Insights</p><h1 class="page-header-title">Reports <span>&</span> Insights</h1><p class="page-header-subtitle">{{ reportsInsightsSubtitle }}</p></div></header>
  <div class="page-width reports-content">
   <div class="sample-notice" role="note"><strong>Illustrative sample data</strong><span>The charts below use the website’s existing sample datasets for 2025. They are not live or verified operational statistics.</span></div>
   <div class="report-overview"><div><span>Category dataset</span><strong>{{ totalCases.toLocaleString('en-UG') }}</strong><small>Sample cases</small></div><div><span>Largest category</span><strong>{{ categoryRows[0].label }}</strong><small>{{ categoryRows[0].percentage.toFixed(1) }}% of the category sample</small></div><div><span>Reporting period</span><strong>Jan–Dec 2025</strong><small>12 monthly observations</small></div></div>
   <div class="report-chart-grid">
    <section class="report-panel"><div class="report-panel-heading"><div><p class="section-label">Case distribution</p><h2>{{ reportsInsightsCasesPerCategory }}</h2></div><span class="report-badge">Sample</span></div><ReportChart kind="category" :labels="categoryLabels" :values="categoryValues" description="Sample case category distribution. Exact counts and percentages are listed below." /><ul class="category-legend"><li v-for="(row,i) in categoryRows" :key="row.label"><span class="legend-dot" :style="{background:palette[i]}" /><span>{{ row.label }}</span><strong>{{ row.count.toLocaleString('en-UG') }}</strong><small>{{ row.percentage.toFixed(1) }}%</small></li></ul></section>
    <section class="report-panel"><div class="report-panel-heading"><div><p class="section-label">Monthly trends</p><h2>{{ reportsInsightsCasesPerRegion }}</h2></div><label class="region-filter"><span class="sr-only">Region Selection</span><select v-model="region"><option value="all">All regions</option><option>Central</option><option>Eastern</option><option>Northern</option><option>Western</option></select></label></div><ReportChart kind="region" :labels="timelineLabels" :series="visibleRegions" description="Monthly sample case counts by region, January to December 2025. Open the data table for exact values." /><p class="chart-note">Select a region or use the legend to compare monthly trends.</p><details class="chart-table"><summary>View monthly data</summary><div class="table-scroll" tabindex="0" role="region" aria-label="Monthly case data"><table><caption>Monthly sample cases · 2025</caption><thead><tr><th scope="col">Month</th><th v-for="(_,name) in visibleRegions" :key="name" scope="col">{{ name }}</th></tr></thead><tbody><tr v-for="(month,i) in timelineLabels" :key="month"><th scope="row">{{ month }}</th><td v-for="(values,name) in visibleRegions" :key="name">{{ values[i] }}</td></tr></tbody></table></div></details></section>
    <section class="report-panel full-width"><div class="report-panel-heading"><div><p class="section-label">Age distribution</p><h2>{{ reportsInsightsCaseCategoriesPerAgeGroup }}</h2></div><span class="report-badge">Sample</span></div><ReportChart kind="age" :labels="ageGroupLabels" :series="ageGroupData" description="Sample cases by category and age group. Open the data table for exact counts." /><details class="chart-table"><summary>View age group data</summary><div class="table-scroll" tabindex="0" role="region" aria-label="Age group case data"><table><caption>Age group sample dataset</caption><thead><tr><th scope="col">Category</th><th v-for="(_,name) in ageGroupData" :key="name" scope="col">{{ name }}</th></tr></thead><tbody><tr v-for="(label,i) in ageGroupLabels" :key="label"><th scope="row">{{ label }}</th><td v-for="(values,name) in ageGroupData" :key="name">{{ values[i] }}</td></tr></tbody></table></div></details></section>
    <section class="report-panel full-width"><div class="report-panel-heading"><div><p class="section-label">Gender distribution</p><h2>{{ reportsInsightsCaseCategoriesPerGender }}</h2></div><span class="report-badge">Sample</span></div><ReportChart kind="gender" :labels="ageGroupLabels" :series="genderData" description="Sample cases by category and gender. Open the data table for exact counts." /><details class="chart-table"><summary>View gender data</summary><div class="table-scroll" tabindex="0" role="region" aria-label="Gender case data"><table><caption>Gender sample dataset</caption><thead><tr><th scope="col">Category</th><th v-for="(_,name) in genderData" :key="name" scope="col">{{ name }}</th></tr></thead><tbody><tr v-for="(label,i) in ageGroupLabels" :key="label"><th scope="row">{{ label }}</th><td v-for="(values,name) in genderData" :key="name">{{ values[i] }}</td></tr></tbody></table></div></details></section>
   </div>
   <p class="chart-note">Each chart represents its own sample dataset. Totals across the separate datasets may differ.</p>
  </div>
 </div>
</template>
<script setup>
import {ref,computed,onMounted} from 'vue'
import {useSettingsStore} from '@/store/settings'
import ReportChart from '@/components/reports/ReportChart.vue'
import {summarizeCategories,selectRegionSeries} from '@/utils/report-data'
const settingsStore=useSettingsStore()
const region=ref('all')
const palette=['#295d43','#5983a3','#c18b48','#826a98','#849640','#727a75']
onMounted(()=>settingsStore.fetchGlobalSettings())
  // Computed properties for content
  const reportsInsightsSubtitle = computed(() => settingsStore.settings.reports_insights_subtitle || 'Explore the data collected by Sauti Uganda 116 helpline to understand the trends and patterns in child abuse and neglect across the country.')
  const reportsInsightsCasesPerCategory = computed(() => settingsStore.settings.reports_insights_cases_per_category || 'Cases Per Category')
  const reportsInsightsCasesPerRegion = computed(() => settingsStore.settings.reports_insights_cases_per_region || 'Regional Distribution')
  const reportsInsightsCaseCategoriesPerAgeGroup = computed(() => settingsStore.settings.reports_insights_case_categories_per_age_group || 'Age Group Analysis')
  const reportsInsightsCaseCategoriesPerGender = computed(() => settingsStore.settings.reports_insights_case_categories_per_gender || 'Gender Sensitivity Data')

  // Original illustrative datasets; these are not live operational statistics.
  const categoryLabels = [
    'Child Neglect',
    'Physical Violence',
    'Sexual Violence',
    'Economic Violence',
    'Emotional Abuse',
    'Others'
  ]
  const categoryValues = [2746, 817, 595, 423, 134, 400]

  const timelineLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const regionTimeSeriesData = {
    'CENTRAL': [310, 230, 260, 330, 470, 270, 330, 270, 260, 280, 20, 5],
    'EASTERN': [100, 110, 110, 120, 150, 120, 120, 120, 120, 150, 5, 0],
    'NORTHERN': [20, 70, 20, 20, 290, 20, 20, 20, 20, 170, 5, 0],
    'WESTERN': [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0]
  }

  const ageGroupLabels = ['Child Neglect', 'Physical Violence', 'Sexual Violence', 'Economic Violence', 'Others']
  const ageGroupData = {
    '0-4': [895, 334, 120, 50, 30],
    '5-9': [620, 95, 90, 40, 20],
    '10-13': [489, 100, 95, 60, 40],
    '14-17': [400, 170, 150, 100, 80],
    '18+': [200, 163, 170, 145, 120]
  }

  const genderData = {
    'Female': [1402, 482, 557, 260, 200],
    'Male': [1297, 326, 32, 155, 150],
    'Unknown': [62, 11, 3, 11, 10]
  }


const categoryRows=computed(()=>summarizeCategories(categoryLabels,categoryValues))
const totalCases=computed(()=>categoryValues.reduce((sum,value)=>sum+value,0))
const visibleRegions=computed(()=>selectRegionSeries(regionTimeSeriesData,region.value))
</script>
<style scoped>
.reports-content { padding-bottom:72px; }
.section-label { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:#5d7450; margin-bottom:10px; }
.sample-notice { display:flex; flex-direction:column; gap:8px; padding:20px 24px; border:1px solid #dce5d2; border-radius:16px; background:#f2f6eb; color:#46543e; font-size:13px; line-height:1.6; }
.report-overview { display:grid; grid-template-columns:repeat(3,1fr); gap:32px; padding:32px 0; }
.report-overview > div { display:flex; flex-direction:column; gap:8px; }
.report-overview span,.report-overview small { color:#697560; font-size:12px; }
.report-overview strong { font-size:clamp(22px,2.6vw,32px); font-weight:600; letter-spacing:-.04em; color:#25422e; }
.report-chart-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px; }
.report-panel { padding:28px; border:1px solid #e1e7db; background:#fcfdfb; border-radius:20px; min-width:0; }
.full-width { grid-column:1/-1; }
.report-panel-heading { display:flex; justify-content:space-between; align-items:center; gap:16px; margin-bottom:20px; }
.report-panel h2 { font-size:22px; font-weight:600; letter-spacing:-.035em; line-height:1.2; color:#243c2b; margin:0; }
.report-badge { background:#edf3e5; color:#567145; border-radius:100px; font-size:10px; padding:6px 10px; }
.category-legend { list-style:none; padding:0; display:grid; gap:12px; margin:16px 0 0; }
.category-legend li { display:flex; align-items:center; gap:10px; font-size:12px; color:#586450; }
.legend-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
.category-legend strong { margin-left:auto; color:#2c3d27; font-weight:600; font-variant-numeric:tabular-nums; }
.category-legend small { width:44px; text-align:right; font-variant-numeric:tabular-nums; }
.region-filter select { border:1px solid #dfe5d8; border-radius:100px; padding:9px 12px; font-size:12px; color:#46573d; background:#fcfdfb; }
.chart-note { font-size:12px; color:#727c6b; line-height:1.6; margin:16px 0; }
.chart-table { border-top:1px solid #e5eadf; margin-top:20px; padding-top:16px; }
.chart-table summary { cursor:pointer; font-size:12px; font-weight:500; color:#3f6332; padding:8px 0; }
.table-scroll { overflow:auto; max-width:100%; margin-top:12px; }
.chart-table table { width:100%; border-collapse:collapse; font-size:12px; font-variant-numeric:tabular-nums; }
.chart-table caption { text-align:left; padding:10px; color:#6b775f; }
.chart-table th,.chart-table td { text-align:left; padding:10px; border-bottom:1px solid #e5eadf; white-space:nowrap; }
.chart-table thead { background:#f2f5ee; }
.report-panel :is(select,summary,.table-scroll):focus-visible { outline:3px solid #658b4e; outline-offset:4px; }
@media(max-width:800px){.report-chart-grid{grid-template-columns:1fr}.report-overview{gap:16px}.report-panel{padding:20px}.report-panel-heading{align-items:flex-start;flex-wrap:wrap}}
@media(max-width:480px){.report-overview{grid-template-columns:1fr;gap:20px}.report-overview > div{gap:4px}.report-overview strong{font-size:24px}.sample-notice{padding:18px}}
</style>
