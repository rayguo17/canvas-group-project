class DrawingRectangle extends PaintFunction{
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
        this.contextDraft.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.fillRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
        let history = { start: [this.origX, this.origY], dim: [coord[0] - this.origX, coord[1] - this.origY], style: this.style, mode: 'rec' };
        if (history.dim[0] == 0 || history.dim[1] == 0) {
            
        } else {
            currentSafeState = 0;
            DoneStack.push(history);
            DeleteStack = [];
            this.style = { color: $('#colorPicker').val() };
        }
        
        console.log('Rec',DoneStack);
    }
    onMouseLeave(){}
    onMouseEnter(){}
}