import {Particle} from './particle.js';

export class Particles {
    constructor(settings) {
        this.settings = settings;
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.settings.container.appendChild(this.canvas);
        if (this.settings.isText) {
            let canvasSize = this.getTextSize(this.settings.text, this.settings.font);
            this.canvas.width = canvasSize.width * this.settings.scale;
            this.canvas.height = canvasSize.height * this.settings.scale;
            this.imageDataTextToParticles(this.getImageData(), this.settings.scale);
        } else {
            this.canvas.width = this.settings.imageWidth * this.settings.scale;
            this.canvas.height = this.settings.imageHeight * this.settings.scale;
            this.getImageData();
        }
        this.mouse = {
            x: null,
            y: null,
            radius: settings.mouseRadius
        }

        window.addEventListener('mousemove',(event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = event.x - rect.left;
            this.mouse.y = event.y - rect.top;
        });

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
        if (this.settings.isText) {
            const offScreenCanvas = document.createElement('canvas');
            let canvasSize = this.getTextSize(this.settings.text, this.settings.font);
            offScreenCanvas.width = canvasSize.width;
            offScreenCanvas.height = canvasSize.height;
            const offScreenCtx = offScreenCanvas.getContext('2d');

            offScreenCtx.fillStyle = 'white';
            offScreenCtx.font = this.settings.font;
            offScreenCtx.textAlign = 'left';
            offScreenCtx.textBaseline = 'top';
            offScreenCtx.fillText(this.settings.text, 0, 0);

            return offScreenCtx.getImageData(0, 0, offScreenCanvas.width, offScreenCanvas.height);
        } else {
            const offScreenCanvas = document.createElement('canvas');
            offScreenCanvas.width = this.settings.imageWidth;
            offScreenCanvas.height = this.settings.imageHeight;            const offScreenCtx = offScreenCanvas.getContext('2d');
            const image = new Image();
            image.src = this.settings.imagePath;
            image.onload =  () => {
                offScreenCtx.drawImage(image, 0, 0, offScreenCanvas.width, offScreenCanvas.height);
                let data = offScreenCtx.getImageData(0, 0, offScreenCanvas.width, offScreenCanvas.height);
                this.imageDataTextToParticles(data, this.settings.scale)
            } 
        }
    }
    
    imageDataTextToParticles(imageData, scale) {
        console.log(imageData);
        let arr = [];
        //for every row of pixels
        for (let row = 0; row < imageData.height; row++) {
            //for every pixel in row
            for (let pixel = 0; pixel < imageData.width; pixel++) {
                const alpha = imageData.data[(row * imageData.width * 4) + (pixel * 4) + 3];
                if(alpha  > 0) {
                    if (this.settings.isText){
                        arr.push(new Particle(pixel * scale, row * scale, this.settings.color, this.settings.particleRadius, this.settings.weight));  
                    } else {
                        let iRed = (row * imageData.width * 4) + (pixel * 4);
                        let color = `rgba(${imageData.data[iRed]},${imageData.data[iRed+ 1]},${imageData.data[iRed+2]},${(alpha/255).toFixed(2)})`;
                        arr.push(new Particle(pixel * scale, row * scale, color, this.settings.particleRadius, this.settings.weight));
                    }
                }
            }
        }console.log(arr);
        this.particles = arr;
    }
}

