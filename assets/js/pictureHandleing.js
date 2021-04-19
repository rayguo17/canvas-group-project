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

function savePaint(e) {
    console.log('running')
    if (typeof this.id == 'undefined') {
        this.id = 0;
    }
    this.id++;
    let paintBoard = {
        paintBoardId: this.id,
        Stack: DoneStack
    }
    let frames = document.querySelectorAll('.wallPlace');
    console.log(frames);
    let printFlag = 0;
    for (let i = 0; i < frames.length; i++){
        
        let frame = frames[i];
        
        if (frame.id == '') {
            printFlag = 1;
            frame.id = `paintBoard${this.id}`;
            canvasReal.toBlob(function (blob) {
                let url = URL.createObjectURL(blob);
                frame.style.background = `url(${url}) `;
                frame.style.backgroundSize = "443px 270px";
                frame.onload = function () {
                    URL.revokeObjectURL(url);
                }
                
            });
            break;
        }
    }
}
