XRLoader.init({desktop: true, id: 'ha'});
/*let model = new XRModel({ obj: 'r2-d2.obj', mtl: 'r2-d2.mtl', texturePath: './r2d2/'});

model.setRotation(90, 90, 90);
model.setScale(.01, .01, .01);
model.build();
*/

setInterval(function() {
    let oldY = parseInt(document.getElementById('r2d2').getAttribute('rotation').split(',')[1]);
    document.getElementById('r2d2').setAttribute('rotation', '0,' + (oldY + 1) + ',0')
}, 20);