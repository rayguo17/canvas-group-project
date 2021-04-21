class DrawingStLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.style = { color: $('#colorPicker').val(), lineWidth:$('#lineWidth').val()};
    }
    
    onMouseDown(coord, event) {
        this.contextReal.strokeStyle = this.style.color;
        this.contextReal.lineJoin = "round";
        this.contextReal.lineWidth = this.style.lineWidth;
        
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.strokeStyle = this.style.color;
        this.contextDraft.lineJoin = "round";
        this.contextDraft.lineWidth = this.style.lineWidth;
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX,this.origY);
        this.contextDraft.lineTo(coord[0],coord[1]);
        this.contextDraft.stroke();   
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX,this.origY);
        this.contextReal.lineTo(coord[0],coord[1]);
        this.contextReal.stroke();
        let history = { mode: 'StLine', start: [this.origX, this.origY], end: [coord[0], coord[1]], style: this.style }
        if (history.start[0] - history.end[0] == 0 || history.start[1] - history.end[1]==0) {
            console.log('noinput')
        } else {
            currentSafeState = 0;
            DoneStack.push(history);
            DeleteStack = [];
            this.style = { color: $('#colorPicker').val(),lineWidth:$('#lineWidth').val() };
        }
        console.log('Stline',DoneStack);
    }
    onMouseLeave(){}
    onMouseEnter(){}
}