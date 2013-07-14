var uniformGraph = new PMF.OneAxisGraph({ title: 'Uniform' });
var custom1Graph = new PMF.OneAxisGraph({ title: 'Custom Function 1: Quadratic' });
var custom2Graph = new PMF.OneAxisGraph({ title: 'Custom Function 2' });

setInterval(function () {

    uniformGraph.clear();
    uniformGraph.draw(PMF.Function.uniform, { r: 255, g: 0, b: 0 });

    custom1Graph.clear();
    custom1Graph.draw(PMF.Function.custom1Graph, { r: 0, g: 255, b: 0 });

    custom2Graph.clear();
    custom2Graph.draw(PMF.Function.custom2Graph, { r: 0, g: 0, b: 255 });

}, 100);
