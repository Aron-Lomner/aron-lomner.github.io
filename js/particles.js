class Particle {
    constructor(x, y, color){
        this.posX = x,
        this.posY = y;
        this.orginalX = x;
        this.orginalY = y;
        this.color = color;
        this.size = 1;
        this.weight = 15;
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

export class Particles {
    constructor(container, data, scale, mouseRadius) {
        this.data = data;
        this.particles = [];
        this.canvas = document.createElement('canvas');
        let canvasSize;
        if (data.isText) {
            canvasSize = this.getTextSize(data.text, data.font);
        }
        this.canvas.width = canvasSize.width * scale;
        this.canvas.height = canvasSize.height * scale;
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.mouse = {
            x: null,
            y: null,
            radius: mouseRadius
        }
        window.addEventListener('mousemove',(event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = event.x - rect.left;
            this.mouse.y = event.y - rect.top;
        });

        
        this.particles = this.imageDataToParticles(this.getImageData(), scale);
        

        this.animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i=0; i < this.particles.length; i++) {
                this.particles[i].draw(this.ctx);
                this.particles[i].update(this.mouse);
            }
            requestAnimationFrame(this.animate);
        }
        this.animate();
    }

    getTextSize(text, font) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = font;
        const textMetrics = ctx.measureText(text);
    
        const width = textMetrics.width;
        const height = textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;    
        return {width, height};
    }
    getImageData() {
        if (this.data.isText) {
            const offScreenCanvas = document.createElement('canvas');
            let canvasSize = this.getTextSize(this.data.text, this.data.font);
            offScreenCanvas.width = canvasSize.width; // Width of your text canvas
            offScreenCanvas.height = canvasSize.height; // Height of your text canvas
            const offScreenCtx = offScreenCanvas.getContext('2d');

            offScreenCtx.fillStyle = 'white';
            offScreenCtx.font = this.data.font;
            offScreenCtx.textAlign = 'left';
            offScreenCtx.textBaseline = 'top';
            offScreenCtx.fillText(this.data.text, 0, 0);

            return offScreenCtx.getImageData(0, 0, offScreenCanvas.width, offScreenCanvas.height);
        }
    }
    /**
     * Converts an image data object into an array of particles.
     * @param {ImageData} imageData - The image data object containing pixel information.
     * @param {number} percentage between 50 & 100, the percentage of pixels to keep. 100 -> all pixels; 50 -> half of pixels;
     *  @param {Boolean} random if true each pixel has the  chance of being kept based on the percentage you passed, otherwise it is: the first percentage out of 100 is kept then the rest ignored, percentage kept rest ignored...
     */
    imageDataToParticles(imageData, scale) {
        let arr = [];
        //for every row of pixels
        for (let row = 0; row < imageData.height; row++) {
            //for every pixel in row
            for (let pixel = 0; pixel < imageData.width; pixel++) {
                const alpha = imageData.data[(row * imageData.width * 4) + (pixel * 4) + 3];
                if(alpha  > 0) {
                    arr.push(new Particle(pixel * scale, row * scale, this.data.color));    
                }
            }
        }console.log(arr);
        return arr;
    }
}

