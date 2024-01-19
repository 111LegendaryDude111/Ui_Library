class LayerManagerClass {
  private layers: VoidFunction[];
  constructor() {
    this.layers = [];
  }

  register(fn: VoidFunction): void {
    this.layers.push(fn);
    console.log(this.layers);
  }

  unregister(fn: VoidFunction): void {
    this.layers = this.layers.filter((el) => el !== fn);

    console.log(this.layers);
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
