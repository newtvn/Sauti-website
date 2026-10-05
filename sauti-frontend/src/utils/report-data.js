export function summarizeCategories(labels, values) {
  const total = values.reduce((sum, value) => sum + value, 0)
  return labels.map((label, index) => ({label, count: values[index] || 0, percentage: total ? (values[index] || 0) / total * 100 : 0}))
}
export function selectRegionSeries(series, region) {
  return region === 'all' ? series : Object.fromEntries(Object.entries(series).filter(([label]) => label === region.toUpperCase()))
}
