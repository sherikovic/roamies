export class Particle {
  private ctx: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement

  public pos: { x: number; y: number }
  public velocity: { x: number; y: number }

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx

    this.pos = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }

    this.velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
    }
  }

  update() {
    this.pos.x += this.velocity.x
    this.pos.y += this.velocity.y

    // Boundary checks
    if (this.pos.x < 0 || this.pos.x > this.canvas.width) this.velocity.x *= -1
    if (this.pos.y < 0 || this.pos.y > this.canvas.height) this.velocity.y *= -1
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
    this.ctx.fill()
  }
}
