const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1.5;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'black';
let hue = 60;
let drawing = false;
// ctx.globalCompositeOperation = 'difference';


function drawShape(x,y,radius,inset,n)
{
    ctx.fillStyle = 'hsl('+hue+',100%,50%)';
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0-radius);

    for(let i = 0;i<n;i++)
    {
        ctx.rotate(Math.PI/n);
        ctx.lineTo(0, 0-(radius*inset));
        ctx.rotate(Math.PI/n);
        ctx.lineTo(0, 0-radius);
    }


    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();   //comment ctx fill for black white
}

const radius = 50;
const inset = 0.5;
const n = 4;
drawShape(120,120,radius*1.45,1,1.5);
drawShape(120,120,radius,inset,n);

let angle = 0;

window.addEventListener('mousemove',function(e){
    if(drawing)
    {
        ctx.save();
        ctx.translate(e.x,e.y);

        //for star
        ctx.rotate(angle);
        drawShape(0,0,radius*1.45,1,1.5);

        //for triangle
        ctx.rotate(angle);
        drawShape(0,0,radius,inset,n);

        //for more star on top
        ctx.rotate(angle+0.2);
        drawShape(0,0,radius*0.666,inset*0.75,8);

        angle+=0.05;
        hue+=2;
        ctx.restore();

    }
}
);

window.addEventListener('mouseup',function(){
    drawing = true;
});

window.addEventListener('mousedown',function(){
    drawing = false;
});