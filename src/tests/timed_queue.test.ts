import {TimedQueue} from '../game/structure/timed_queue';
import {ms} from '../game/structure/time';

const INTERVAL: ms = 1000;

test('instantiate', () => {
  let t: TimedQueue<number> = new TimedQueue(INTERVAL);
  expect(t).toBeDefined();
});

test('enqueue works', () => {
  let t: TimedQueue<number> = new TimedQueue(INTERVAL);
  t.enqueue(1);
});

test('dequeue only after increment', () => {
  let t: TimedQueue<number> = new TimedQueue(INTERVAL);
  t.enqueue(1);
  expect(t.readyToDequeue()).toEqual(false);

  t.incrementTime(INTERVAL);
  expect(t.readyToDequeue()).toEqual(true);
});

test('successfully dequeue multiple elements', () => {
  let t: TimedQueue<number> = new TimedQueue(INTERVAL);
  t.enqueue(1);
  t.enqueue(2);
  t.enqueue(3);

  expect(t.readyToDequeue()).toEqual(false);
  t.incrementTime(INTERVAL);
  expect(t.readyToDequeue()).toEqual(true);
  expect(t.dequeue()).toEqual(1);

  expect(t.readyToDequeue()).toEqual(false);
  t.incrementTime(INTERVAL);
  expect(t.readyToDequeue()).toEqual(true);
  expect(t.dequeue()).toEqual(2);

  t.incrementTime(INTERVAL);
  expect(t.dequeue()).toEqual(3);
});

test('custom per-element delays', () => {
  let t: TimedQueue<number> = new TimedQueue(500);
  t.enqueue(1);
  t.enqueueCustomDelays({ value: 2, delay: 600 });
  t.enqueueCustomDelays({ value: 3, delay: 2000 });

  expect(t.readyToDequeue()).toEqual(false);
  t.incrementTime(500);
  expect(t.readyToDequeue()).toEqual(true);
  expect(t.dequeue()).toEqual(1);

  expect(t.readyToDequeue()).toEqual(false);
  t.incrementTime(500);
  expect(t.readyToDequeue()).toEqual(false);
  t.incrementTime(100);
  expect(t.readyToDequeue()).toEqual(true);
  expect(t.dequeue()).toEqual(2);

  t.incrementTime(1950);
  expect(t.readyToDequeue()).toEqual(false);
  t.incrementTime(50);
  expect(t.readyToDequeue()).toEqual(true);
  expect(t.dequeue()).toEqual(3);
});
