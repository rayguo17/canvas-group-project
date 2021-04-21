class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.style = { color: $('#colorPicker').val() };
    }
    
    onMouseDown(coord,event){
        this.contextReal.fillStyle = this.style.color;
        this.origX = coord[0];
        this.origY = coord[1];
   
    }
    onDragging(coord,event){
        this.contextDraft.fillStyle = this.style.color;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.arc((this.origX+coord[0])/2,(this.origY+coord[1])/2,(coord[0]-this.origX)/2,0,2*Math.PI);
        this.contextDraft.fill();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.fillStyle = this.style.color;
        this.contextReal.beginPath();
        this.contextReal.arc((this.origX+coord[0])/2,(this.origY+coord[1])/2,(coord[0]-this.origX)/2,0,2*Math.PI);
        this.contextReal.fill();
        let history = { center: [(this.origX+coord[0])/2, (this.origY+coord[1])/2], radius: [(coord[0]-this.origX)/2], style:this.style, mode: 'circle' };
        if (history.radius[0] == 0 ) {
            console.log('noinput');
        } else {
            DoneStack.push(history);
            DeleteStack = [];
            this.style = { color: $('#colorPicker').val() };
        }
        console.log('Circle',DoneStack);
    }
    onMouseLeave(){
        $('#canvas-draft').css('cursor', 'auto')
    }
    onMouseEnter(){
        $('#canvas-draft').css('cursor', 'crosshair')
    }
}