class InputText extends PaintFunction{
    constructor(contextReal, contextDraft) {
        super();
        this.contextDraft = contextDraft;
        this.contextReal = contextReal;
        this.style = {
            color: $('#colorPicker').val(),
            font:$('#font-size').val()?$('#font-size').val():16
        }
        this.string = [];
        this.event = 0;
    }
    onMouseEnter() {
        $('#canvas-draft').css('cursor', 'text')
        if (this.event == 1) {
            $('body').on('keydown', function (e) {
                console.log(e.key);
                currentFunction.onKeyDown(e.key);
                
            });
        }
    }
    onMouseLeave() {
        $('#canvas-draft').css('cursor', 'auto');
        if (this.event = 1) {
            $('body').off('keydown');
        }
        if (this.string.length == 0) {
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        }
    }
    onMouseDown(coord, event) {
        if (this.string.length == 0) {
           
            if (this.event == 0) {
                
                currentFunction.event = 1;
                $('body').on('keydown', function (e) {
                    console.log(e.key);
                    currentFunction.onKeyDown(e.key);
                    
                });
            }
            
            
            
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.origX = coord[0];
        this.origY = coord[1];
        drawRectangle_stroke(this.contextDraft,[this.origX,this.origY],[parseInt(this.style.font)*10,parseInt(this.style.font)],{dash:[5,10],color:'#4B94FA'})
        } else {
            
            this.event += 1;
        }
        
    }
    onKeyDown(key) {
        //TODO: ADD MORE WORD VALIDATION (ENTER :LINE HEIGHT?)
        if (WordValidation.includes(key) ) {
            if (key == 'Backspace') {
                this.string.pop();
            }

        } else {
            this.string.push(key);
        }
        
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        //TODO: should able to extend the width of textbox as user is typing, and set limit 
        drawRectangle_stroke(this.contextDraft, [this.origX, this.origY], [parseInt(this.style.font) * 10, parseInt(this.style.font)], { dash: [5, 10], color: '#4B94FA' });
        this.contextDraft.setLineDash([]);
        this.contextDraft.fillStyle = this.style.color;
        this.contextDraft.textBaseline = 'top';
        this.contextDraft.font = `${this.style.font}px sans-serif`
        this.contextDraft.fillText(this.string.join(''), this.origX+1, this.origY+1);
    }

    
    onDragging(coord, event) {
        //inside the current  textbox
        if (coord[0] <= this.origX + parseInt(this.style.font) * 10 && coord[0] >= this.origX-20 && coord[1] <= this.origY + parseInt(this.style.font)+20 && coord[1] >= this.origY-20) {
            this.event = 1;
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            //TODO: should able to extend the width of textbox as user is typing, and set limit 
            drawRectangle_stroke(this.contextDraft, [coord[0], coord[1]], [parseInt(this.style.font) * 10, parseInt(this.style.font)], { dash: [5, 10], color: '#4B94FA' });
            this.contextDraft.setLineDash([]);
            this.contextDraft.fillStyle = this.style.color;
            this.contextDraft.textBaseline = 'top';
            this.contextDraft.font = `${this.style.font}px sans-serif`
            this.contextDraft.fillText(this.string.join(''), coord[0] + 1, coord[1] + 1);
            this.origX = coord[0];
            this.origY = coord[1];
        }
       
    }
    onMouseUp(coord, event) {
        if (this.event == 2) {
            $('body').off('keydown');
            this.event = 0;
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.setLineDash([]);
            this.contextReal.fillStyle = this.style.color;
            this.contextReal.textBaseline = 'top';
            this.contextReal.font = `${this.style.font}px sans-serif`
            this.contextReal.fillText(this.string.join(''), this.origX, this.origY);
            let history = { mode: 'text', start: [this.origX, this.origY], string: this.string.join(''), style: this.style }
            DoneStack.push(history);
            DeleteStack = [];
            currentSafeState = 0;
            console.log('text',DoneStack)
            this.string = [];
            this.style = {
                color: $('#colorPicker').val(),
                font:$('#font-size').val()?$('#font-size').val():16
            }
        }
    }
}