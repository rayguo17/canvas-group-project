class DrawingLine extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.style = {
            color: $('#colorPicker').val(),
            lineJoin: $('#lineJoin').val(),
            lineWidth:$('#lineWidth').val()
        };
        this.points = [];
    }
    
    onMouseDown(coord,event){
        this.context.strokeStyle = this.style.color;
        this.context.lineJoin = this.style.lineJoin;
        
        this.context.lineWidth = this.style.lineWidth;
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
        this.draw(coord[0],coord[1]);
    }
    onDragging(coord,event){
        this.draw(coord[0], coord[1]);
        this.points.push([coord[0], coord[1]]);
        console.log(this.points);
    }

    onMouseMove(){}
    onMouseUp() {
        if (this.points.length <= 1) {
            
        } else {
            let history = { mode: 'draw', points: this.points, style: this.style };
            DoneStack.push(history);
            console.log(DoneStack);
            DeleteStack = [];
            currentSafeState = 0;
        }
        this.style = {
            color: $('#colorPicker').val(),
            lineJoin: $('#lineJoin').val(),
            lineWidth:$('#lineWidth').val()
        };
        this.points = [];
    }
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();
        
    }
}