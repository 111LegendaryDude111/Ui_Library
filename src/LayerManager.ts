class LayerManagerClass {
  private layers: VoidFunction[];
  constructor() {
    this.layers = [];
  }

  register(fn: VoidFunction): void {
    this.layers.push(fn);
  }

  unregister(fn: VoidFunction): void {
    this.layers = this.layers.filter((el) => el !== fn);
  }

  callFn() {
    const close = this.layers.pop();
    close?.();
  }
}

export const LayerManager = new LayerManagerClass();

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    LayerManager.callFn();
  }
});
