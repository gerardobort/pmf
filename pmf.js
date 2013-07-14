(function (global) {

    var PMF = {};

    PMF.OneAxisGraph = function (options) {
        options = options || {};
    
        var body = global.document.getElementsByTagName('body')[0];

        if (options.title) {
            this.header = global.document.createElement('h1');
            this.header.innerHTML = options.title;
            body.appendChild(this.header);
        }

        // create the canvas element
        this.canvas = global.document.createElement('canvas');
        this.canvas.width = options.width || 800;
        this.canvas.height = options.height || 10;
        this.canvas.style.border = '1px solid #dedede';
        body.appendChild(this.canvas);

        // setup canvas context
        this.ctx = this.canvas.getContext('2d');
    };

    PMF.OneAxisGraph.prototype = {
        _drawProbabilityNumber: function (number) { // 0 < number < 1
            var x = number*this.canvas.width;
            this.ctx.fillRect(x, 0, 1, this.canvas.height);
        },
        draw: function (probabilityMassFunction, options) {
            options = options || {};
            this.ctx.fillStyle = 'rgba(' + (options.r||255) + ', ' + (options.g||0) + ', ' + (options.b||0) + ', 0.2)';
            for (var i = options.iterations||3*this.canvas.width; i > -1; i--) {
                this._drawProbabilityNumber(probabilityMassFunction());
            }
        },
        clear: function (probabilityMassFunction, options) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };

    PMF.Function = {};
    PMF.Function.uniform = Math.random;

    PMF.Function.testFunction = function () {
        var x = PMF.Function.uniform();
        var y = PMF.Function.uniform();
        return x*y;
    };

    global.PMF = PMF;

}(this));
