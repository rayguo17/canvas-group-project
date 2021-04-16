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
            contextReal.drawImage(img, 0, 0);
        };
        img.src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}
