class LayerManagerClass {
  private layers: VoidFunction[];
  constructor() {
    this.layers = [];
    this.addListener();
  }

  register(fn: VoidFunction): VoidFunction {
    this.layers.push(fn);

    return () => {
      this.unregister(fn);
    };
  }

  unregister(fn: VoidFunction): void {
    this.layers = this.layers.filter((el) => el !== fn);
  }

  closeTopLayer() {
    const close = this.layers.pop();
    close?.();
  }

  private addListener() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        LayerManager.closeTopLayer();
      }
    });
  }
}

export const LayerManager = new LayerManagerClass();
