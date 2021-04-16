class DrawingPolygons extends PaintFunction{
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.sides = 4;
        this.points = [];
    }
    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
        console.log('down')
    }
    //TODO:figure out how it work
    calculateCoord(coord) {
        //take in sides number/ original coordinates
        //original coordinates is the center of the poly gram;
        let points = [];
        //get the recent corner between the mouse-center line and  baseline x
           
        let radius = Math.sqrt((coord[0] - this.origX) * (coord[0] - this.origX) + (coord[1] - this.origY) * (coord[1] - this.origY));
        let cornerAngle = this.calculateAngle(coord, radius);
        
        for (let i = 0; i < this.sides; i++){
            let x = 0;
            let y = 0;
            x = this.origX + radius * Math.cos(2 * Math.PI * i / this.sides + cornerAngle);
            y = this.origY - radius * Math.sin(2 * Math.PI * i / this.sides + cornerAngle);
            points.push([x, y]);
            // console.log(points);
        }
        return points;

    }
    calculateAngle(coord,radius) {
        
        let relativeCoordX =  coord[0]- this.origX;
        let relativeCoordY =  this.origY- coord[1];
        console.log('MouseX', coord[0]);
        console.log('MouseY', coord[1]);
        console.log('center', this.origX, this.origY);
        console.log('X', relativeCoordX > 0);
        console.log('Y', relativeCoordY > 0);
        if (relativeCoordX > 0 && relativeCoordY > 0) {
            //first 
            console.log('first');
            return Math.asin((relativeCoordY) / radius);
        }
        if (relativeCoordX < 0 && relativeCoordY > 0) {
            //second
            console.log('second',Math.asin((relativeCoordY) / radius)+Math.PI)
            return -(Math.asin((relativeCoordY) / radius)+Math.PI);
        }
        if (relativeCoordX < 0 && relativeCoordY < 0) {
            //third
            
            console.log('third');
            return Math.PI-Math.asin((relativeCoordY) / radius) ;
        }
        if (relativeCoordX > 0 && relativeCoordY < 0) {
            //fourth
            console.log('four')
            return Math.asin((relativeCoordY) / radius) + Math.PI * 2;
        }
    }
    onDragging(coord) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        let points = this.calculateCoord(coord);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(points[0][0], points[0][1]);
        for (let i = 0; i < points.length; i++){
            this.contextDraft.lineTo(points[i][0], points[i][1]);
            this.contextDraft.moveTo(points[i][0], points[i][1]);
            this.contextDraft.stroke();
        }
        this.contextDraft.lineTo(points[0][0], points[0][1]);
        this.contextDraft.stroke();
    }
}