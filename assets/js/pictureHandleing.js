async function downloadCanvas() {
    
    const imageURI = canvasReal.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = imageURI;
    link.download = "canvas.png";
    link.click();
    
}

function uploadImage(e) {
    reader.onload = () => {
        img.onload = () => {
            console.log(img);
            contextReal.drawImage(img, 0, 0);
        };
        console.log('indicator', reader.result);
        img.src = reader.result;
    }
    console.log('readerURL', e.target.files);
    //only work with this;
    reader.readAsDataURL(e.target.files[0]);
}
function getPaint(e) {
    let name = prompt("What is the name of the masterpiece?");
    
    let storageRef = firebase.storage().ref();
    
    storageRef.child(`test/${name}.json`).getDownloadURL().then((url) => {
        console.log('url:', url);
        $.ajax({
            url: url,
            type: "GET",
        }).done(function (data) {
            console.log(data);
            if (currentSafeState || DoneStack.length == 0) {
                console.log('drawingFetched data')
                contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
                RedrawAll(data.Stack);
                DeleteStack = [];
                currentSafeState = 0;
                DoneStack = data.Stack;
                currentName = data.paintBoardName;
                console.log('fetch', currentName);

            } else {
                alert('please safe the current picture first!')
            }
            //RedrawAll(data.Stack);
        }).fail(function (data) {
            console.log('error', data);
        }).always(function (data) {
            console.log('fetching data');
        })
    })
}

function savePaint(e) {
    
    let name;
    let existFlag = 0;
    //console.log(currentName);
    if (currentName.length!=0) {
        name = currentName;
        if (confirm("This will override the load file, Are you sure you want to save?")) {
            
        } else {
            return;
        }
    } else {
        name = prompt("What is the name of your MasterPiece?");
        if (name == null) {
            console.log('cancel saving');
            return;
        }
        if (name.length == 0) {
            alert('name cannot be empty!');
            return;
        }
    //check the name exist locally?
    for (let i = 0; i < PaintBoards.length; i++){
        if (name == PaintBoards[i].paintBoardName) {
            alert('name exist locally! please use another name!');
            return;
        }
    }
    //check if it exist in firebase?
    
    let listRef = firebase.storage().ref().child('test');
    listRef.listAll().then(function (res) {
        
        res.items.forEach(function (itemRef) {
            console.log('itemRef', itemRef._delegate._location.path);
            let listName = itemRef._delegate._location.path.slice(5);
            if (`${name}.json` == listName) {
                existFlag = 1;
                alert('name exist remotely! please use another name!');
                return;
            }
            
        })
    }).then(function () {
        if (existFlag == 1) {
            alert('name Exist')
            return;
        }
        currentSafeState = 1;
    let paintBoard = {
        paintBoardName: name,
        Stack: DoneStack
    }
    PaintBoards.push(paintBoard);
    //save object to firebase
    let jsonString = JSON.stringify(paintBoard);
    let blob = new Blob([jsonString], { type: "application/json" });
    let fireRef = firebase.storage().ref('test/' + `${name}.json`);
    let taskJson = fireRef.put(blob);
    taskJson.on('state_changed',
        function progress(snapshot) {
            console.log('saving Json');
        },
        function error(err) {
            console.group('error', err);
        },
        function complete() {
            console.log('json file upload done!');
        }
    )

        //save image to frame
    let frames = document.querySelectorAll('.wallPlace');
    console.log(frames);
    let printFlag = 0;
    for (let i = 0; i < frames.length; i++){
        
        let frame = frames[i];
        if (frame.id == '') {
            //printFlag = 1;
            frame.id = `${currentName}`;
            canvasReal.toBlob(function (blob) {
                let url = URL.createObjectURL(blob);
                let newImg = document.createElement('img');
                newImg.onload = function () {
                    URL.revokeObjectURL(url);                  
                }
                 newImg.width = 443;
                newImg.height = 270;
                newImg.src = url;
                frame.appendChild(newImg);                
            });
            break;
        }
    }
    })
        return;
    }
    //console.log('existFlag', existFlag);
    
    currentSafeState = 1;
    //deal with paintBoards
    let boardExistFlag = 0;
    for (let i = 0; i < PaintBoards.length; i++){
        if (PaintBoards[i].paintBoardName == name) {
            PaintBoards[i].Stack = DoneStack;
            boardExistFlag = 1;
        }
    }
    
    let paintBoard = {
        paintBoardName: name,
        Stack:DoneStack
    }
    if (boardExistFlag) {
        
    } else {
        PaintBoards.push(paintBoard);
    }
    console.log(PaintBoards);
    //save object to firebase
    let jsonString = JSON.stringify(paintBoard);
    let blob = new Blob([jsonString], { type: "application/json" });
    let fireRef = firebase.storage().ref('test/' + `${name}.json`);
    let taskJson = fireRef.put(blob);
    taskJson.on('state_changed',
        function progress(snapshot) {
            console.log('saving Json');
        },
        function error(err) {
            console.group('error', err);
        },
        function complete() {
            console.log('json file upload done!');
        }
    )

        //save image to frame
    let frames = document.querySelectorAll('.wallPlace');
    console.log(frames);
    let printFlag = 0;
    for (let i = 0; i < frames.length; i++){
        
        let frame = frames[i];
        console.log('frameid',frame.id,currentName)
        if (frame.id == currentName) {
            oldImg = frame.children[0];
            console.log('oldImg', oldImg);
            frame.removeChild(oldImg);
            console.log(frame.children);
            canvasReal.toBlob(function (blob) {
                let url = URL.createObjectURL(blob);
                let newImg = document.createElement('img');
                newImg.onload = function () {
                    URL.revokeObjectURL(url);                  
                }
                 newImg.width = 443;
                newImg.height = 270;
                newImg.src = url;
                frame.appendChild(newImg);                
            });
            break;
        }
        
        if (frame.id == '') {
            //printFlag = 1;
            frame.id = `${currentName}`;
            canvasReal.toBlob(function (blob) {
                let url = URL.createObjectURL(blob);
                let newImg = document.createElement('img');
                newImg.onload = function () {
                    URL.revokeObjectURL(url);                  
                }
                 newImg.width = 443;
                newImg.height = 270;
                newImg.src = url;
                frame.appendChild(newImg);                
            });
            break;
        }
    }
}
