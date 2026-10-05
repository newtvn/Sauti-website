import {test} from 'node:test'
import assert from 'node:assert/strict'
import {summarizeCategories, selectRegionSeries} from '../src/utils/report-data.js'
test('percentages are derived from the displayed counts',()=>{
 const rows=summarizeCategories(['A','B'],[30,70]);assert.equal(rows[0].percentage,30);assert.equal(rows[1].percentage,70)
})
test('empty totals never produce NaN percentages',()=>{
 assert.equal(summarizeCategories(['A'],[0])[0].percentage,0)
})
test('regional selection excludes other series',()=>{
 assert.deepEqual(selectRegionSeries({CENTRAL:[1],WESTERN:[2]},'Central'),{CENTRAL:[1]})
})
