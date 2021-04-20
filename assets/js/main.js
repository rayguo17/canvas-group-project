$(function () {
    
    $('#drawing-line').click(()=>{
        currentFunction = new DrawingLine(contextReal,contextDraft);
    });
    $('#draw-st-line').click(()=>{
        currentFunction = new DrawingStLine(contextReal,contextDraft);
    });
    $('#drawing-rectangle').click(()=>{
        console.log('rec');
        currentFunction = new DrawingRectangle(contextReal,contextDraft);
    });
    $('#drawing-circle').click(()=>{
        console.log("circle");
        currentFunction = new DrawingCircle(contextReal,contextDraft);
    });
    $('#polygons').click((e) => {
        currentFunction = new DrawingPolygons(contextReal, contextDraft);
    });
    $('#input-text').click(()=>{
        currentFunction = new InputText(contextReal,contextDraft);
    });

    $('#fill-bucket').click(() => {
        console.log('press');
        currentFunction = new FillBucket(contextReal,contextDraft);
    });
    $('#eraser').click(()=>{
        console.log("eraser");
        currentFunction = new Eraser(contextReal,contextDraft);
    });
    $('#clear').click(()=>{
        console.log("clear");
        Clear();
    });
    $('#undo').click(() => {
        Undo();
    });
    $('#redo').click(() => {
        Redo();
    });
    $('#download').click((e) => {
        downloadCanvas();
    });
    $('#uploader').on('change', uploadImage);

    $('#polygons').click((e) => {
        currentFunction = new DrawingPolygons(contextReal, contextDraft);
    });
    $('#save').click((e) => {
        savePaint();
    });
    $('#search').click((e) => {
        getPaint(e);
    });
    currentFunction = new DrawingRectangle(contextReal,contextDraft); 
})