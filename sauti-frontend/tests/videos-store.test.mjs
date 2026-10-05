import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const source = readFileSync(process.env.VIDEO_STORE_SOURCE || new URL('../src/store/videos.js', import.meta.url), 'utf8')
  .replace(/^import .*$/gm, '').replace('export const useVideosStore', 'const useVideosStore')
function storeFor(response, fail = false) {
  const context = { ref: value => ({ value }), defineStore: (_, setup) => setup,
    api: { get: async () => { if (fail) throw new Error('Offline'); return { data: response } } },
    console: { error() {} } }
  return runInNewContext(`${source}\nuseVideosStore()`, context)
}
test('loads paginated published videos', async () => {
  const store = storeFor({results: [{id: 1, title: 'Safety'}]})
  await store.fetchVideos({status: 'PUBLISHED'})
  assert.equal(store.videos.value[0].title, 'Safety')
  assert.equal(store.loading.value, false)
})
test('loads non-paginated published videos', async () => {
  const store = storeFor([{id: 2, title: 'Support'}])
  await store.fetchVideos()
  assert.equal(store.videos.value[0]?.title, 'Support')
})
test('malformed responses produce an empty gallery', async () => {
  const store = storeFor({results: null})
  await store.fetchVideos()
  assert.equal(store.videos.value.length, 0)
})
test('network errors provide an error state and clear loading', async () => {
  const store = storeFor(null, true)
  await store.fetchVideos()
  assert.equal(store.error.value, 'Offline')
  assert.equal(store.loading.value, false)
})
