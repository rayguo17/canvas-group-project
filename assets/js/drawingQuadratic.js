class DrawingStLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.count = 0;
        this.newCanvas = document.createElement('canvas')
        
    }
    
    onMouseDown(coord, event) {
        if (this.count == 0) {
            this.contextReal.strokeStyle = "#df4b26";
        this.contextReal.lineJoin = "round";
        this.contextReal.lineWidth = 5;
        
        this.origX = coord[0];
        this.origY = coord[1];
        }
        
    }
    onDragging(coord, event) {
        if (this.count == 0) {
            this.contextDraft.strokeStyle = "#df4b26";
        this.contextDraft.lineJoin = "round";
        this.contextDraft.lineWidth = 5;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX,this.origY);
        this.contextDraft.lineTo(coord[0],coord[1]);
        this.contextDraft.stroke();   
        }
        
    }

    onMouseMove(){}
    onMouseUp(coord) {
        if (this.count == 0) {
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX,this.origY);
        this.contextReal.lineTo(coord[0],coord[1]);
            this.contextReal.stroke();
            this.count = 1;
        }
        
    }
    onMouseLeave(){}
    onMouseEnter(){}
}