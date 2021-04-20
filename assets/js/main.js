$(function () {
    $('#drawing-rectangle').click(()=>{
        console.log('rec')
        currentFunction = new DrawingRectangle(contextReal,contextDraft);
    });
    $('#drawing-line').click(()=>{
        currentFunction = new DrawingLine(contextReal,contextDraft);
    });
    $('#draw-st-line').click(()=>{
        currentFunction = new DrawingStLine(contextReal,contextDraft);
    });
    $('#input-text').click(()=>{
        currentFunction = new InputText(contextReal,contextDraft);
    });
    $('#fill-bucket').click(() => {
        console.log('press');
        currentFunction = new FillBucket(contextReal,contextDraft);
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
    })

    currentFunction = new DrawingRectangle(contextReal,contextDraft); 
})