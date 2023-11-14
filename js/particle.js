export class Particle {
    constructor(x, y, color, size, weight){
        this.posX = x;
        this.posY = y;
        this.orginalX = x;
        this.orginalY = y;
        this.color = color;
        this.size = size;
        this.weight = weight;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(mouse) {
        let dX = mouse.x - this.posX;
        let dY = mouse.y - this.posY;
        let distance = Math.sqrt(dX*dX + dY * dY);
        let velocityX = dX / distance;
        let velocityY = dY / distance;
        let maxDistance = mouse.radius;
        let velocity = (maxDistance - distance) / maxDistance;
        if (distance < mouse.radius) {
            this.posX -= velocityX * velocity * this.weight;
            this.posY -= velocityY * velocity * this.weight;
        } else {
            if (this.posX!=this.orginalX) {
                this.posX -= (this.posX - this.orginalX) / 10;
            } 
            if (this.posY!=this.orginalY){
                this.posY -= (this.posY - this.orginalY) /10;
            }
        }
    }
}