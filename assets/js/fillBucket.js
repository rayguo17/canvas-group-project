class FillBucket extends PaintFunction{
    constructor(context) {
        super();
        this.context = context;
        this.style = {
            color:$('#colorPicker').val()
        }
        this.pixelStack = [];//initailize on mouse up
        this.imgData = this.context.getImageData(0, 0, canvasDraft.width, canvasDraft.height);//initialize on mouse up
        
    }
    //BUG: click twice on the some field will cause loop forever;
    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
        this.startR = this.context.getImageData(this.origX, this.origY, 1, 1).data[0];
        this.startG = this.context.getImageData(this.origX, this.origY, 1, 1).data[1];
        this.startB = this.context.getImageData(this.origX, this.origY, 1, 1).data[2];
        this.pixelStack.push([this.origX, this.origY]);
        console.log('start', this.startR, this.startG, this.startB);
        while (this.pixelStack.length > 0) {
            
            let curPos = this.pixelStack.pop();
            let x = curPos[0];
            let y = curPos[1]
            let pixelPosition = (y * canvasDraft.width + x) * 4;
            while (y-- && this.matchStartColor(pixelPosition)) {
                pixelPosition -= canvasDraft.width * 4;
            }
            y++;
            pixelPosition += canvasDraft.width * 4;
            let reachLeft = false;
            let reachRight = false;
            while (y++ < canvasReal.height - 1 && this.matchStartColor(pixelPosition)) {
                this.paintColor(pixelPosition);
                if (x>0) {
                    if (this.matchStartColor(pixelPosition - 4)) {
                        if (!reachLeft) {
                            this.pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    }
                    else if (reachLeft) {
                        reachLeft = false;
                    }
                }
                if (x < canvasReal.width - 1) {
                    if (this.matchStartColor(pixelPosition + 4)) {
                        if (!reachRight) {
                            this.pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    }
                    else if (reachRight) {
                        reachRight = false;
                    }
                }
                pixelPosition += canvasReal.width * 4;

            }

            
        }
        this.context.clearRect(0, 0, canvasReal.width, canvasDraft.height);
        this.context.putImageData(this.imgData, 0, 0);
        let history = { mode: 'fill', imgData: this.imgData };
        DoneStack.push(history);
    }

    matchStartColor(pixelPos) {
        let colorR = this.imgData.data[pixelPos];
        let colorG = this.imgData.data[pixelPos + 1];
        let colorB = this.imgData.data[pixelPos + 2];
        return (colorR == this.startR && colorG == this.startG && colorB == this.startB);
    }
    paintColor(pixelPos) {
        let colorR = parseInt(this.style.color.slice(1, 3),16);
        let colorG = parseInt(this.style.color.slice(3, 5), 16);
        let colorB = parseInt(this.style.color.slice(5, 7), 16);
        this.imgData.data[pixelPos+0] = colorR;
        this.imgData.data[pixelPos+1] = colorG;
        this.imgData.data[pixelPos+2] = colorB;
        this.imgData.data[pixelPos+3] = 255;
    }
}