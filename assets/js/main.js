var objectMap={};
var selectedObj;
var selectedT;
var zoomCount=0;
$(document).ready(function() {
    canvas = new fabric.Canvas('artcanvas');

    $("ul.ap_product_labels li").click(function() {
        addImageToCanvas($(this).find("img").attr("src"));
    })



    $("#ap_templates_list li,.ap_bg_shapes_listing li").click(function(e) {
        e.preventDefault(); 
        addLayerToCanvas($(this).find("img"));
    })

    $(document).on("click",".delete",function(){
        var clickedId = $(this).parent().attr("id");
        var clickedPug = objectMap[clickedId];
        console.log(clickedPug);
        canvas.bringToFront(clickedPug);
        canvas.setActiveObject(clickedPug);
        var self = $(this);
        setTimeout(function(){
            canvas.getActiveObject().remove();
            canvas.renderAll();
             self.parent().remove();
        },500)
        
    })


    

    $(".ap_barcode_data_rectangle").blur(function() {
        addTextToCanvas($(this).val());
    })

    $(".ap_savedesign,.preview").click(function() {
        downloadCanvas();
        console.log(canvas.toJSON());
    })

    $(".zoom").click(function(){
        
            if(zoomCount <2){

            zoomCount++;
            selectedT.scaleX = selectedT.scaleX *(selectedT.scaleX +0.2);
            selectedT.scaleY = selectedT.scaleY *(selectedT.scaleY +0.2 );
           
            
            clipRectangle.scaleX = clipRectangle.scaleX *(selectedT.scaleX +0.2);
            clipRectangle.scaleY = clipRectangle.scaleY *(selectedT.scaleY +0.2 );

            }else if(zoomCount ==2){

            zoomCount=0;
            selectedT.scaleX = 1;   
            selectedT.scaleY = 1;
           
            
            clipRectangle.scaleX = 1;
            clipRectangle.scaleY = 1;  
            }
            selectedT.setCoords();
            clipRectangle.setCoords();

            canvas.renderAll();
      
         
    })


    
    $(".arrangeHorizntal").click(function(){
        if(checkSelection()){
             var l = selectedObj.originX ;
             var t = selectedObj.originY ;
             selectedObj.originX ="left";
             selectedObj.originY ="top";
             selectedObj.left = clipRectangle.left;
             selectedObj.top = clipRectangle.top+(clipRectangle.height/2) - (selectedObj.height/2);
             selectedObj.setCoords();
             canvas.renderAll();
        }
         
    })



    $(".arrangeVertical").click(function(){
        if(checkSelection()){
             var l = selectedObj.originX ;
             var t = selectedObj.originY ;
             selectedObj.originX ="left";
             selectedObj.originY ="top";
             selectedObj.left = clipRectangle.left+(clipRectangle.width/2) - (selectedObj.width/2);
              selectedObj.top = clipRectangle.top;
             selectedObj.setCoords();
             canvas.renderAll();
        }

  })

    $(".flip180").click(function(){
        if(checkSelection()){
             var l = selectedObj.originX ;
             var t = selectedObj.originY ;
             selectedObj.set("angle", selectedObj.getAngle()-180);
            // selectedObj.originX ="left";
            // selectedObj.originY ="top";
             selectedObj.setCoords();
             canvas.renderAll();
        }
         
    })

     $(".flip90").click(function(){
         if(checkSelection()){
             var l = selectedObj.originX ;
             var t = selectedObj.originY ;
             selectedObj.set("angle", selectedObj.getAngle()-90);
             // selectedObj.originX ="left";
           //  selectedObj.originY ="top"; 
             selectedObj.setCoords();
             canvas.renderAll();
        }
         
         
    })

    

    function checkSelection(){
        if(selectedObj){    
            return true;
        }else{
            alert("Please select some object to proceed the action.");
        }
    }

    function onObjectSelected(e) {
        selectedObj = e.target;
    }
    canvas.on('object:selected', onObjectSelected);

    $(document).on("click",".ap_layers_rectangle", function(){
        var clickedId = $(this).attr("id");
        var clickedPug = objectMap[clickedId];
        console.log(clickedPug);
        canvas.bringToFront(clickedPug);
        canvas.setActiveObject(clickedPug);
    })

    $(".ap_pattern_images_listing li").click(function(e){
        e.preventDefault();
        $(".ap_cover_image").find("img").attr("src", $(this).find("img").attr("src"));
    })



})

function clipByName(ctx) {
    this.setCoords();
    var clipRect = findByClipName(this.clipName);
    var scaleXTo1 = (1 / this.scaleX);
    var scaleYTo1 = (1 / this.scaleY);
    ctx.save();

    var ctxLeft = -(this.width / 2) + clipRect.strokeWidth;
    var ctxTop = -(this.height / 2) + clipRect.strokeWidth;
    var ctxWidth = clipRect.width - clipRect.strokeWidth;
    var ctxHeight = clipRect.height - clipRect.strokeWidth;

    ctx.translate(ctxLeft, ctxTop);
    ctx.scale(scaleXTo1, scaleYTo1);
    ctx.rotate(degToRad(this.angle * -1));

    ctx.beginPath();
    ctx.rect(
        clipRect.left - this.oCoords.tl.x,
        clipRect.top - this.oCoords.tl.y,
        clipRect.width,
        clipRect.height
        );
    ctx.closePath();
    ctx.restore();
}

function addTextToCanvas(text) {
    if(!selectedT){
        alert("Please select a T-shape to customize.");
        return;
    }
    var txt = new fabric.Text(text, {
        fontFamily: 'Roboto',
        left: 150,
        top: 150,
        clipName: 'layer',
        clipTo: function(ctx) {
            return _.bind(clipByName, txt)(ctx)
        }
    });
    canvas.add(txt);
    var randId = Math.floor(100000000 + Math.random() * 900000000);
    objectMap[randId] =  txt;
    $(".ap_layers_rectangles").append('<div id="'+randId+'" class="ap_layers_rectangle"><span class="textlayer">'+text+'</span><img src="images/del.png" class="delete"></img></div>')

}

function addImageToCanvas(imgSrc) {

    fabric.Object.prototype.transparentCorners = false;

    fabric.Image.fromURL(imgSrc, function(myImg) {
        canvas.clear();

        var img1 = myImg.set({
            left: 20,
            top: 20,
            width: 360,
            height: 360
        });
        img1.selectable = false;
        selectedT = img1;
        canvas.add(img1);


        // Note the use of the `originX` and `originY` properties, which we set
        // to 'left' and 'top', respectively. This makes the math in the `clipTo`
        // functions a little bit more straight-forward.
            clipRectangle = new fabric.Rect({
            originX: 'left',
            originY: 'top',
            left: 120,
            top: 150,
            width: 150,
            height: 200,
            fill: 'transparent',
            /* use transparent for no fill */
            strokeDashArray: [10, 10],
            stroke: 'white',
            selectable: false
        });
        // We give these `Rect` objects a name property so the `clipTo` functions can
        // find the one by which they want to be clipped.
        clipRectangle.set({
            clipFor: 'layer'
        });
        canvas.add(clipRectangle);


    });
}

function addLayerToCanvas(laImg) {
    if(!selectedT){
        alert("Please select a T-shape to customize.");
        return;
    }
    var height = $(laImg).height();
    var width = $(laImg).width();
    var clickedImage = new Image();
    clickedImage.onload = function(img) {

        var pug = new fabric.Image(clickedImage, {

            width: width,
            height: height,
            left: 150,
            top: 150,
            clipName: 'layer',
            clipTo: function(ctx) {
                return _.bind(clipByName, pug)(ctx)
            }
        });
        canvas.add(pug);
        var randId = Math.floor(100000000 + Math.random() * 900000000);
        objectMap[randId] =  pug;
        $(".ap_layers_rectangles").append('<div id="'+randId+'" class="ap_layers_rectangle">'+$(laImg).parent().html()+'<img src="images/del.png" class="delete"></img></div>')


    };
    clickedImage.src = $(laImg).attr("src");

}

function findByClipName(name) {
    return _(canvas.getObjects()).where({
        clipFor: name
    }).first()
}

function downloadCanvas() {
    var link = document.createElement("a");
    var imgData = canvas.toDataURL({
        format: 'png',
        multiplier: 1
    });
    link.href = imgData;
    link.click();
    window.open(link, "_blank")
}
// Since the `angle` property of the Image object is stored 
// in degrees, we'll use this to convert it to radians.
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}