$(document).ready(function() {
    canvas = new fabric.Canvas('artcanvas');

    $("ul.ap_product_labels li").click(function() {
        addImageToCanvas($(this).find("img").attr("src"));
    })

    $(".ap_layers_rectangles div").click(function() {
        addLayerToCanvas($(this).find("img"));
    })

    $(".ap_barcode_data_rectangle").blur(function() {
        addTextToCanvas($(this).val());
    })

    $(".ap_savedesign").click(function() {
        downloadCanvas();
        console.log(canvas.toJSON());
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
}

function addImageToCanvas(imgSrc) {

    fabric.Object.prototype.transparentCorners = false;

    fabric.Image.fromURL(imgSrc, function(myImg) {
        canvas.clear();

        var img1 = myImg.set({
            left: 20,
            top: 20,
            width: 460,
            height: 460
        });
        img1.selectable = false;
        canvas.add(img1);


        // Note the use of the `originX` and `originY` properties, which we set
        // to 'left' and 'top', respectively. This makes the math in the `clipTo`
        // functions a little bit more straight-forward.
        var clipRectangle = new fabric.Rect({
            originX: 'left',
            originY: 'top',
            left: 150,
            top: 150,
            width: 200,
            height: 200,
            fill: 'transparent',
            /* use transparent for no fill */
            strokeDashArray: [10, 10],
            stroke: 'black',
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