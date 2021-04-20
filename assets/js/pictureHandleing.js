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
            RedrawAll(data.Stack);
        }).fail(function (data) {
            console.log('error', data);
        }).always(function (data) {
            console.log('fetching data');
        })
    })
}

function savePaint(e) {
    console.log('running');
    let name = prompt("What is the name of your MasterPiece?");
    //check the name exist locally?
    for (let i = 0; i < PaintBoards.length; i++){
        if (name == PaintBoards[i].paintBoardName) {
            alert('name exist! please use another name!');
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
                alert('name exist! please use another name!');
                return;
            }
            
        })
    })
    let paintBoard = {
        paintBoardName: name,
        Stack: DoneStack
    }
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
            printFlag = 1;
            frame.id = `${this.id}`;
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
