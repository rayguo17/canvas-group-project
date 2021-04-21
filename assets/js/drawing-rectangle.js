class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.style = { 
            color: $('#strokeColorDiv #colorPicker').val(),
            lineWidth:$('#lineWidth').val()
        };
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = this.style.color;
        this.contextReal.lineWidth = this.style.lineWidth;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.strokeStyle = this.style.color;
        this.contextDraft.lineWidth = this.style.lineWidth;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.strokeRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.strokeRect(this.origX, this.origY, coord[0] - this.origX, coord[1] - this.origY)
        let history = { start: [this.origX, this.origY], dim: [coord[0] - this.origX, coord[1] - this.origY], style: this.style, mode: 'rec' };
        if (history.dim[0] == 0 || history.dim[1] == 0) {
            
        } else {
            currentSafeState = 0;
            DoneStack.push(history);
            DeleteStack = [];
            this.style = { 
                color: $('#strokeColorDiv #colorPicker').val(),
                lineWidth:$('#lineWidth').val() 
            };
        }
        
        console.log('Rec',DoneStack);
    }
    onMouseLeave(){
        $('#canvas-draft').css('cursor', 'auto')
    }
    onMouseEnter(){
        $('#canvas-draft').css('cursor', 'crosshair')
    }
}