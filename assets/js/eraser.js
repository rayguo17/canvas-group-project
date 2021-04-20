class Eraser extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;
        this.points=[];
    }

    onMouseDown(coord,event){
        this.style = {lineWidth:$('#lineWidth').val()};
        this.contextReal.clearRect(coord[0]-4,coord[1]-4,this.style.lineWidth*8,this.style.lineWidth*8);
        this.points.push([coord[0],coord[1]]);
    }
    onDragging(coord,event){
        this.contextReal.clearRect(coord[0]-4,coord[1]-4,this.style.lineWidth*8,this.style.lineWidth*8);
        this.points.push([coord[0],coord[1]]);
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextReal.clearRect(coord[0]-4,coord[1]-4,this.style.lineWidth*8,this.style.lineWidth*8);
        this.points.push([coord[0],coord[1]]);
        let history = { points: this.points, style: this.style, mode: 'eraser'};
        DoneStack.push(history);
        DeleteStack = [];
        currentSafeState = 0;
        this.style = {lineWidth:$('#lineWidth').val()};
        console.log("eraser",DoneStack);
    }
 
    
}