export function normalizeResources(data) {
 const results=Array.isArray(data)?data:Array.isArray(data?.results)?data.results:[]
 return {results,count:Array.isArray(data)?data.length:Number(data?.count)||results.length,next:data?.next||null,previous:data?.previous||null}
}
export function resourcePage(link) {
 if(!link)return 1
 const page=Number(new URL(link,'https://sauti.mglsd.go.ug').searchParams.get('page'))
 return Number.isInteger(page)&&page>0?page:1
}
export function isAudioResource(resource) {
 return /mp3|m4a|wav|ogg|audio/i.test(resource.file_type||'')||/\.(mp3|m4a|wav|ogg)(?:[?#]|$)/i.test(resource.file||'')
}
