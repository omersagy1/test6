type Brand<base, brand> = base & { _brand?: brand };

export type ms = Brand<number, 'ms'>;
export type secs = Brand<number, 'secs'>;
export type mins = Brand<number, 'mins'>;
export type hrs = Brand<number, 'hrs'>;

export const millis = (
  s: secs = 0,
  m: mins = 0,
  h: hrs = 0): ms => {

  return 1000 * (s + 60 * (m + 60 * h));
}
