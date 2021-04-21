class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.style = { color: $('#strokeColorDiv #colorPicker').val() };
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = this.style.color;
        this.origX = coord[0];
        this.origY = coord[1];
   
    }
    onDragging(coord,event){
        this.contextDraft.strokeStyle = this.style.color;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.arc((this.origX+coord[0])/2,(this.origY+coord[1])/2,(coord[0]-this.origX)/2,0,2*Math.PI);
        this.contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.strokeStyle = this.style.color;
        this.contextReal.beginPath();
        this.contextReal.arc((this.origX+coord[0])/2,(this.origY+coord[1])/2,(coord[0]-this.origX)/2,0,2*Math.PI);
        this.contextReal.stroke();
        let history = { center: [(this.origX+coord[0])/2, (this.origY+coord[1])/2], radius: [(coord[0]-this.origX)/2], style:this.style, mode: 'circle' };
        if (history.radius[0] == 0 ) {
            console.log('noinput');
        } else {
            DoneStack.push(history);
            DeleteStack = [];
            currentSafeState = 0;
            this.style = { color: $('#strokeColorDiv #colorPicker').val() };
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