let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let PaintBoards = [];
let DoneStack = [];
let DeleteStack = [];
const reader = new FileReader();
const img = new Image();
const WordValidation = ['Backspace', 'Enter', 'Shift', 'Control', 'Tab', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'CapsLock'];
//TODO: CHANGE COLOR IN ON MOUSE UP;
$('#canvas-draft').mousedown(function(e){
    
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

$('#canvas-draft').mousemove(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if(dragging){
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);
});

$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX,mouseY],e);
});

$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
    
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
    
});


//change color with the string
$('#colorPicker').change(function () {
    console.log(typeof $(this).val());
    console.log($(this).val());
    let color = $(this).val();
    console.log(parseInt(color.slice(5,7),16));
    currentFunction.style.color = $(this).val();
});
//change line join
$('#lineJoin').change(function () {
    
    currentFunction.style.lineJoin = $(this).val();
    
});
//change font-size
$('#font-size').change(function () {
    currentFunction.style.font = $(this).val();
})
$('#polySides').change(function () {
    currentFunction.sides = $(this).val();
})
$('#lineWidth').change(function () {
    currentFunction.style.lineWidth = $(this).val();
    console.log('line width change' ,$(this).val())
})

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}

