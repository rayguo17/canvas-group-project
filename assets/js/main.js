$(function () {

    $('.buttons').on('click',function(e){
        $('.buttons').css('background', 'rgb(155, 117, 46)');
        $(this).css('background', 'rgb(207, 158, 66)');
        $('.stylingOptions').hide();
        $('.uploader').hide();
        $('#stylingBackground').animate({right:'-30%'});
    })
    
    $('#drawing-line').click(()=>{
        $('#stylingBackground').animate({right:'-8%'});
        $('#lineWidthDiv').show();
        $('#strokeColorDiv').show();
        // $('#lineJoinDiv').show();
        currentFunction = new DrawingLine(contextReal,contextDraft);
    });
    $('#draw-st-line').click(()=>{
        $('#stylingBackground').animate({right:'-8%'});
        $('#lineWidthDiv').show();
        $('#strokeColorDiv').show();
        // $('#lineJoinDiv').show();
        currentFunction = new DrawingStLine(contextReal,contextDraft);
    });
    $('#drawing-rectangle').click(()=>{
        $('#stylingBackground').animate({right:'-8%'});
        $('#colorDiv').show();
        $('#fillColorDiv').show();
        console.log('rec');
        currentFunction = new DrawingRectangle(contextReal,contextDraft);
    });
    $('#drawing-circle').click(()=>{
        $('#stylingBackground').animate({right:'-8%'});
        $('#fillColorDiv').show();
        console.log("circle");
        currentFunction = new DrawingCircle(contextReal,contextDraft);
    });
    $('#polygons').click((e) => {
        $('#stylingBackground').animate({right:'-8%'});
        $('#strokeColorDiv').show();
        $('#polygonSidesDiv').show();
        currentFunction = new DrawingPolygons(contextReal, contextDraft);
    });
    $('#input-text').click(()=>{
        $('#stylingBackground').animate({right:'-8%'});
        $('#fontSizeDiv').show();
        $('#strokeColorDiv').show();
        currentFunction = new InputText(contextReal,contextDraft);
    });

    $('#fill-bucket').click(() => {
        console.log('press');
        $('#stylingBackground').animate({right:'-8%'});
        $('#fillColorDiv').show();
        currentFunction = new FillBucket(contextReal,contextDraft);
    });
    $('#eraser').click(()=>{
        $('#stylingBackground').animate({right:'-8%'});
        $('#lineWidthDiv').show();
        currentFunction = new Eraser(contextReal,contextDraft);
    });
    $('#clear').click(()=>{
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

    $('#upload').click((e) => {
        $('.uploader').show();
    });
   
    $('#polygons').click((e) => {
        currentFunction = new DrawingPolygons(contextReal, contextDraft);
    });
    $('#save').click((e) => {
        savePaint();
    });
    $('#search').click((e) => {
        getPaint(e);
    });
    $('.wallPlace').click((e) => {
        //console.log(e.target.parentElement.nodeName);
        if (e.target.nodeName == 'IMG') {
            //console.log(e.target.parentElement);
            wallHandle(e.target.parentElement.id, e);
        } else {
            console.log(e.target.parentElement);
        }
    });
    $('#newPage').click((e) => {
        newPage(e);
    })
    currentFunction = new DrawingRectangle(contextReal,contextDraft); 
})