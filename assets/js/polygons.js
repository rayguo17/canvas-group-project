//TODO: STYLE IS An OBJECT Which means it will share the space when assigned. Refactor the style code , so that we don't have to initialize;
class DrawingPolygons extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.sides = $("#polySides").val() || 4;
    this.points = [];
    this.style = {
      color: $("#colorPicker").val(),
      lineWidth: $("#lineWidth").val(),
    };
  }
  //TODO: SEPERATE FILL COLOR AND STROKE COLOR
  onMouseDown(coord, event) {
    this.origX = coord[0];
    this.origY = coord[1];
    console.log("down");
  }
  //TODO:figure out how it work
  calculateCoord(coord) {
    //take in sides number/ original coordinates
    //original coordinates is the center of the poly gram;
    let points = [];
    //get the recent corner between the mouse-center line and  baseline x

    let radius = Math.sqrt(
      (coord[0] - this.origX) * (coord[0] - this.origX) +
        (coord[1] - this.origY) * (coord[1] - this.origY)
    );
    let cornerAngle = this.calculateAngle(coord, radius);

    for (let i = 0; i < this.sides; i++) {
      let x = 0;
      let y = 0;
      x =
        this.origX +
        radius * Math.cos((2 * Math.PI * i) / this.sides + cornerAngle);
      y =
        this.origY -
        radius * Math.sin((2 * Math.PI * i) / this.sides + cornerAngle);
      points.push([x, y]);
    }

    return points;
  }
  calculateAngle(coord, radius) {
    let relativeCoordX = coord[0] - this.origX;
    let relativeCoordY = this.origY - coord[1];
    // console.log('MouseX', coord[0]);
    // console.log('MouseY', coord[1]);
    // console.log('center', this.origX, this.origY);
    // console.log('X', relativeCoordX > 0);
    // console.log('Y', relativeCoordY > 0);
    if (relativeCoordX > 0 && relativeCoordY > 0) {
      //first
      console.log("first");
      return Math.asin(relativeCoordY / radius);
    }
    if (relativeCoordX < 0 && relativeCoordY > 0) {
      //second
      // console.log('second', Math.asin((relativeCoordY) / radius) + Math.PI)
      return -(Math.asin(relativeCoordY / radius) + Math.PI);
    }
    if (relativeCoordX < 0 && relativeCoordY < 0) {
      //third

      console.log("third");
      return Math.PI - Math.asin(relativeCoordY / radius);
    }
    if (relativeCoordX > 0 && relativeCoordY < 0) {
      //fourth
      console.log("four");
      return Math.asin(relativeCoordY / radius) + Math.PI * 2;
    }
  }
  onDragging(coord) {
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.points = this.calculateCoord(coord);
    this.contextDraft.beginPath();
    this.contextDraft.lineWidth = this.style.lineWidth;
    this.contextDraft.strokeStyle = this.style.color;
    //console.log(this.points);
    this.contextDraft.moveTo(this.points[0][0], this.points[0][1]);
    for (let i = 0; i < this.points.length; i++) {
      this.contextDraft.lineTo(this.points[i][0], this.points[i][1]);
    }
    this.contextDraft.closePath();
    this.contextDraft.stroke();
  }
  onMouseUp() {
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextReal.beginPath();
    this.contextReal.lineWidth = this.style.lineWidth;
    this.contextReal.strokeStyle = this.style.color;
    this.contextReal.moveTo(this.points[0][0], this.points[0][1]);
    for (let i = 0; i < this.points.length; i++) {
      this.contextReal.lineTo(this.points[i][0], this.points[i][1]);
    }
    this.contextReal.closePath();
    this.contextReal.stroke();
    let history = { mode: "poly", points: this.points, style: this.style };
      DoneStack.push(history);
      DeleteStack = [];
    currentSafeState = 0;
    this.style = {
      color: $("#colorPicker").val(),
      lineWidth: $("#lineWidth").val(),
    };
    console.log("POLY", DoneStack);
  }
}
