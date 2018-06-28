$(window).on("load", function () {

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    // ctx.fillStyle = 'red';
    // ctx.fillRect(50, 50, 100, 200);

    // ctx.beginPath();
    // ctx.fillStyle = 'blue';
    // ctx.ellipse(100, 100, 50, 50, 0, 0, Math.PI * 2);
    // ctx.fill();


    // ctx.strokeStyle = 'red';
    // ctx.lineJoin = 'round';
    // ctx.lineWidth = 5;
    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(200, 200);
    // ctx.closePath();
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(200, 200);
    // ctx.lineTo(100, 200);
    // ctx.closePath();
    // ctx.stroke();

    var mouse_down = false;
    // canvas.addEventListener('mousedown', function (event) {
    //     mouse_down = true;
    //     console.log('down', event.offsetX, event.offsetY);
    // });
    // canvas.addEventListener('mouseup', function (event) {
    //     mouse_down = false;
    //     console.log('up', event.offsetX, event.offsetY);
    // });
    // canvas.addEventListener('mousemove', function (event) {
    //     if (mouse_down) {

    //         console.log('move', event.offsetX, event.offsetY);
    //     }
    // });


    function draw(past, current) {
        ctx.moveTo(past[0], past[1]);
        ctx.quadraticCurveTo(
            past[0], past[1],
            current[0], current[1]
        );
        ctx.stroke();
        ctx.closePath();
    }

        var current;
        var past;
        canvas.addEventListener('mousedown', function (event) {
            mouse_down = true;
        });
        canvas.addEventListener('mouseup', function (event) {
            mouse_down = false;
            past = null;
        });
        canvas.addEventListener('mousemove', function (event) {
            if (mouse_down) {
                current = [event.offsetX, event.offsetY];
                if (past) {
                    draw(past, current);
                }
                past = [event.offsetX, event.offsetY];
            }
        });
    

});