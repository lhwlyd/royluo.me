import Ball from './Ball'
export default class BallWorld {
    constructor(items) {
        this.friction = 0.9

        this.oldTimeStamp = 0
    }

    detectCollisions() {
        let obj1
        let obj2

        // Reset collision state of all objects
        for (let i = 0; i < this.ballArray.length; i++) {
            this.ballArray[i].isColliding = false
        }

        // Start checking for collisions
        for (let i = 0; i < this.ballArray.length; i++) {
            obj1 = this.ballArray[i]
            for (let j = i + 1; j < this.ballArray.length; j++) {
                obj2 = this.ballArray[j]

                // Compare object1 with object2
                if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true
                    obj2.isColliding = true

                    var vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y }
                    var distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y))
                    var vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance }
                    var vRelativeVelocity = { x: obj1.dx - obj2.dx, y: obj1.dy - obj2.dy }
                    var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y

                    if (speed < 0) {
                        break
                    }

                    var impulse = 2 * speed / (obj1.mass + obj2.mass)
                    obj1.dx -= (impulse * obj2.mass * vCollisionNorm.x)
                    obj1.dy -= (impulse * obj2.mass * vCollisionNorm.y)
                    obj2.dx += (impulse * obj1.mass * vCollisionNorm.x)
                    obj2.dy += (impulse * obj1.mass * vCollisionNorm.y)
                }
            }
        }
    }

    detectEdgeCollisions() {
        let obj
        for (let i = 0; i < this.ballArray.length; i++) {
            obj = this.ballArray[i]

            // Check for left and right
            if (obj.x < obj.radius) {
                obj.dx = Math.abs(obj.dx) * this.friction
                obj.x = obj.radius
            } else if (obj.x > this.innerWidth - obj.radius) {
                obj.dx = -Math.abs(obj.dx) * this.friction
                obj.x = this.innerWidth - obj.radius
            }

            // Check for bottom and top
            if (obj.y < obj.radius) {
                obj.dy = Math.abs(obj.dy) * this.friction
                obj.y = obj.radius
            } else if (obj.y > this.innerHeight - obj.radius) {
                obj.dy = -Math.abs(obj.dy) * this.friction
                obj.y = this.innerHeight - obj.radius
            }
        }
    }

    circleIntersect(x1, y1, r1, x2, y2, r2) {
        let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
        return squareDistance <= ((r1 + r2) * (r1 + r2))

    }

    init() {
        this.canvas = document.querySelector('canvas')
        this.innerWidth = window.innerWidth * 0.95
        this.innerHeight = window.innerHeight * 0.95


        this.canvas.width = this.innerWidth
        this.canvas.height = this.innerHeight
        this.canvas.style.background = '#EEE6ED'
        this.c = this.canvas.getContext('2d')


        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight

        })

        this.ballArray = [new Ball(this.c, 200, 200, 0, 0, 80, 100), new Ball(this.c, 100, 100, 0, 0, 80, 100),
        new Ball(this.c, 300, 300, 1, 2, 80, 100), new Ball(this.c, 400, 400, -1, 1, 80, 100)]


        window.onfocus = () => {
            this.oldTimeStamp = window.performance.now()
        }

        requestAnimationFrame((timeStamp) => this.animate(timeStamp))
    }

    // Animation loop
    animate(timeStamp) {

        var secondsPassed = (timeStamp - this.oldTimeStamp) / 1000
        if (secondsPassed > 0.05) {
            secondsPassed = 0.05
        }
        this.oldTimeStamp = timeStamp

        this.ballArray.forEach(ball => {
            ball.update(secondsPassed)
        })

        this.detectCollisions()
        this.detectEdgeCollisions()
        this.c.clearRect(0, 0, this.innerWidth, this.innerHeight)

        this.ballArray.forEach(ball => {
            ball.draw()
        })

        requestAnimationFrame((timeStamp) => this.animate(timeStamp))

    }

}