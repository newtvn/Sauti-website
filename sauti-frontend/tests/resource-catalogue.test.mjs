import {test} from 'node:test'
import assert from 'node:assert/strict'
import {normalizeResources,resourcePage,isAudioResource} from '../src/utils/resource-catalogue.js'
test('catalogue supports paginated and plain resource lists',()=>{
 assert.deepEqual(normalizeResources([{id:1}]),{results:[{id:1}],count:1,next:null,previous:null})
 assert.equal(normalizeResources({results:[{id:1}],count:30,next:'?page=2'}).count,30)
 assert.deepEqual(normalizeResources(null).results,[])
})
test('resource pagination follows API page links',()=>{
 assert.equal(resourcePage('https://example.com/resources/?page=3&search=child'),3)
 assert.equal(resourcePage('?page=2'),2)
 assert.equal(resourcePage(null),1)
 assert.equal(resourcePage('?page=-4'),1)
})
test('audio detection supports signed download URLs',()=>{
 assert.equal(isAudioResource({file:'https://example.com/guide.mp3?token=x'}),true)
 assert.equal(isAudioResource({file_type:'audio/mpeg'}),true)
 assert.equal(isAudioResource({file_type:'pdf'}),false)
})
