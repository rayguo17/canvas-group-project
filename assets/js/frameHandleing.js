function wallHandle(frameId, e) {
    console.log(frameId);
    console.log(PaintBoards);
    if (DoneStack.length > 0 && currentSafeState == 0) {
        alert('please safe your current draft first');
        return;
    }
    for (let i = 0; i < PaintBoards.length; i++){
        console.log(PaintBoards[i].paintBoardName)
        if (PaintBoards[i].paintBoardName == frameId) {
            console.log('painting');
            DoneStack = PaintBoards[i].Stack;
            currentName = frameId;
            currentSafeState = 0;
            DeleteStack = [];
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
            RedrawAll(DoneStack);
            
            
            $(`#${frameId}`).empty();
            $(`#${frameId}`).attr('id', '');
        }
    }
    let newBoards =PaintBoards.filter(i => {
        let result = i.paintBoardName.localeCompare(frameId);
        console.log('filter',result);
        if (result == 0){
            console.log('false');
            return false;
        } else {
           return true;
        }
    });
    PaintBoards = newBoards;
    console.log('click on wall', PaintBoards);
    console.log('newBoards', newBoards);
}


function newPage(e) {
    if (DoneStack.length > 0 && currentSafeState == 0) {
        alert('please safe your current draft first');
        return;
    }
    if (PaintBoards.length > 2) {
        
    }
    console.log('painting')
    DoneStack = [];
    currentName = '';
    currentSafeState = 1;
    DeleteStack = [];
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
}