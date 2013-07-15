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
        _drawProbabilityNumber: function (pmf) {
            var t = pmf.random(),
                // range can be defined from a to b, otherwise from 0 to 1
                x = (pmf.a && pmf.b) ? (t - pmf.a)/(pmf.b - pmf.a) * this.canvas.width : t * this.canvas.width;
            this.ctx.fillRect(x, 0, 1, this.canvas.height);
        },
        draw: function (pmf, options) {
            options = options || {};
            this.ctx.fillStyle = 'rgba(' + (options.r||0) + ', ' + (options.g||0) + ', ' + (options.b||0) + ', 0.2)';
            for (var i = options.iterations||3*this.canvas.width; i > -1; i--) {
                this._drawProbabilityNumber(pmf);
            }
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };

    PMF.Function = {};

    PMF.Function.uniform = {
        random: Math.random,
        pmf: function (x) { return 1; }
    }

    // Rejection Sampling Method | http://en.wikipedia.org/wiki/Rejection_sampling
    // pmf = [4 - (x-4)^2]/k
    PMF.Function.custom1Graph = {
        k: 32/2, // calculated manually dong integration of pmf from a to b and equation it to 1 (accumulated function)
        a: 2,
        b: 6,
        M: 3/8, // calculated given the actual k value
        random: function () { // TODO this method can be extracted and reused
            var r1, r2, x, y, f;
            do {
                r1 = PMF.Function.uniform.random(),
                r2 = PMF.Function.uniform.random(),
                x = this.a + (this.b - this.a) * r1,
                y = this.M * r2,
                f = this.pmf(x);
            } while (y > f);
            return x;
        },
        pmf: function (x) {
            return (4 - Math.pow(x - 4, 2))/this.k;
        }
    };

    PMF.Function.custom2Graph = {
        random: function () {
            var x = PMF.Function.uniform.random();
            var y = PMF.Function.uniform.random();
            return x*-y+1;
        },
        pmf: function (x) { return 0; }
    };

    global.PMF = PMF;

}(this));
