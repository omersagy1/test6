export const dampenFire = (factor) => (state) => {
  state.fire.dampen(factor);
}

export const noOp = () => {};