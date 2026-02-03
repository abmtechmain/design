export function enableDrag(canvas, blocks, redraw) {
  let active = null;

  const pos = e => {
    const r = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  };

  canvas.onmousedown = canvas.ontouchstart = e => {
    const { x, y } = pos(e);
    active = blocks.find(b =>
      x > b.x && x < b.x + b.width &&
      y > b.y - b.size && y < b.y
    );
  };

  canvas.onmousemove = canvas.ontouchmove = e => {
    if (!active) return;
    const { x, y } = pos(e);
    active.x = x;
    active.y = y;
    redraw();
  };

  window.onmouseup = window.ontouchend = () => active = null;
}
