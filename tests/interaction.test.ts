import test from 'node:test';
import assert from 'node:assert/strict';
import { nextLoopIndex, shouldQueuePreload, targetFromDelta } from '../src/lib/interaction.ts';

test('scene threshold changes at most one scene', () => {
  assert.equal(targetFromDelta(0, 119, 120, 3), 0);
  assert.equal(targetFromDelta(0, 800, 120, 3), 1);
  assert.equal(targetFromDelta(1, -130, 120, 3), 0);
  assert.equal(targetFromDelta(2, 130, 120, 3), 2);
});

test('film sequence loops', () => {
  assert.equal(nextLoopIndex(0, 3), 1);
  assert.equal(nextLoopIndex(2, 3), 0);
  assert.equal(nextLoopIndex(3, 4), 0);
});

test('preload respects bandwidth and buffering signals', () => {
  assert.equal(shouldQueuePreload({ currentReadyState: 4, currentIsBuffering: false }), true);
  assert.equal(shouldQueuePreload({ saveData: true, currentReadyState: 4, currentIsBuffering: false }), false);
  assert.equal(shouldQueuePreload({ effectiveType: '2g', currentReadyState: 4, currentIsBuffering: false }), false);
  assert.equal(shouldQueuePreload({ currentReadyState: 2, currentIsBuffering: true }), false);
});
