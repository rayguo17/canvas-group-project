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
