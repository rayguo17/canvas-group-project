function drawRectangle_stroke(ctx, start, dim, style) {
    

    ctx.setLineDash(style.dash);
    ctx.strokeStyle = style.color;
    ctx.strokeRect(start[0], start[1], dim[0], dim[1]);
    
}
function drawRectangle_fill(ctx, start, dim, style) {
    ctx.fillStyle = style.color;
    ctx.fillRect(start[0], start[1], dim[0], dim[1]);
}
function drawStline(ctx, start, end, style) {
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
}
function drawText(ctx, start, string, style) {
    ctx.textBaseline = 'top';
    ctx.font = `${style.font}px sans-serif`;
    ctx.fillStyle = style.color;
    ctx.fillText(string, start[0], start[1]);
}
function drawLine(ctx, points, style) {
    ctx.strokeStyle = style.color;
    ctx.lineJoin = style.lineJoin;
    ctx.lineWidth = style.lineWidth;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 0; i < points.length; i++){
        let x = points[i][0];
        let y = points[i][1];
        
        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
}
function drawPoly(ctx, points, style) {
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 0; i < points.length; i++){
        ctx.lineTo(points[i][0], points[i][1]);
        
    }
    ctx.closePath();
    
    ctx.stroke();
}
//TODO:SEPERATE STROKE STYLE AND FILL STYLE
function RedrawAll(stack) {
    //console.log('RedrawAll',stack);
    for (let i = 0; i < stack.length; i++){
        //console.log(stack[i]);
        let action = stack[i];
        switch (action.mode) {
            case 'rec':
                console.log('rec');
                drawRectangle_fill(contextReal, action.start, action.dim, action.style);
                break;
            case 'StLine':
                drawStline(contextReal, action.start, action.end, action.style);
                break;
            case 'text':
                drawText(contextReal, action.start, action.string, action.style);
                break;
            case 'draw':
                drawLine(contextReal, action.points, action.style);
                break;
            case 'poly':
                drawPoly(contextReal, action.points, action.style);
                break;
            default:
                console.log('wrong name');
                break;
            
        }
    }
}
//TODO:INPUT PICTURE SHOULD ADD TO DoneStack
function Undo() {
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
    if (DoneStack.length == 0) {
        alert('no more action can be undo!');
    } else {
        DeleteStack.push(DoneStack.pop());
        RedrawAll(DoneStack);
    }
    
}
function Redo() {
    //TODO:once undo then add more things must clear deletestack
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
    if (DeleteStack.length == 0) {
        alert('no more action can be redo!')
    } else {
        DoneStack.push(DeleteStack.pop());
        
    }
    console.log(DoneStack);
    RedrawAll(DoneStack);
}