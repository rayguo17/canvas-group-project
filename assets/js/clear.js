function Clear(){
    contextReal.clearRect(0,0,canvasReal.width, canvasReal.height);
    let history = {mode:'clear'};
    if (DoneStack.length == 0 ) {
        console.log('noinput');
    } else {
        DoneStack.push(history);
        DeleteStack = [];
    };
    console.log("clear",DoneStack);
}