export default class Ball {
    constructor(context, x, y, dx, dy, radius, mass) {
        this.context = context
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius

        let colorArray = ['#F6C5C0', '#B1A692', '#B4BABA', '#F2F2F2', '#C1A29B']
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
        this.mass = mass


        this.isColliding = false

    }
    draw() {
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)

        this.context.fillStyle = this.color
        this.context.fill()
    }

    update(secondsPassed) {
        const g = 980

        this.dy += g * secondsPassed
        //Move with set velocity
        this.x += this.dx * secondsPassed
        this.y += this.dy * secondsPassed

    }

}