let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let DoneStack = [];
let DeleteStack = [];
const WordValidation = ['Backspace', 'Enter', 'Shift', 'Control', 'Tab', 'Alt', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'CapsLock'];

$('#canvas-draft').mousedown(function(e){
    console.log('click')
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
    console.log($(this));
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

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}

