{
    class ARDisplay {
        constructor(window, canvas) {
            this.window = window;
            this.canvas = canvas;
        }
    }

    var _compositor = null;
    var pix;

    pix = document.createElement('div');
    pix.setAttribute('style', 'width: 1px; height: 1px; position: fixed; top: 0px; left: 0px; z-index: 99999');
    document.body.appendChild(pix);

    function random_bg_color() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";
        pix.style.background = bgColor;

        window.requestAnimationFrame(random_bg_color);
    }

    random_bg_color();

    navigator.getARDisplay = () => {
        return new Promise((res, rej) => {
            if(_compositor == null) {
                var compositorWindow = window.open('about:blank', '_blank', 'width=500,height=500');
                {
                    let document = compositorWindow.document;
                    let canvas = document.createElement('canvas');
                    canvas.width = 500;
                    canvas.height = 500;

                    let styleNode = document.createElement('style');
                    styleNode.innerHTML = "* { padding: 0; margin: 0; border: none; width: 100%; height: 100% }";

                    document.body.appendChild(styleNode);
                    document.body.appendChild(canvas);

                    _compositor = new ARDisplay(compositorWindow, canvas);
                }
            }

            res(_compositor);
        });
    };
}