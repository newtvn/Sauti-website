import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const read=path=>readFileSync(new URL(path,import.meta.url),'utf8')
test('public and admin typography tokens remain identical for independent app builds',()=>{
 assert.equal(read('../src/assets/styles/system-typography.css'),read('../../sauti-admin/src/assets/system-typography.css'))
})
test('admin does not load competing external fonts',()=>{
 assert.doesNotMatch(read('../../sauti-admin/index.html'),/fonts\.(googleapis|gstatic)/)
})

test('public and admin semantic interface colors remain identical',()=>{
 assert.equal(read('../src/assets/styles/system-interface.css'),read('../../sauti-admin/src/assets/system-interface.css'))
})
