var uniformGraph = new PMF.OneAxisGraph({ title: 'Uniform PMF' });
var lnGraph = new PMF.OneAxisGraph({ title: 'Test Funciton PMF' });

setInterval(function () {

    uniformGraph.clear();
    uniformGraph.draw(PMF.Function.uniform, { r: 255, g: 0, b: 0 });

    lnGraph.clear();
    lnGraph.draw(PMF.Function.testFunction, { r: 1, g: 255, b: 0 });

}, 100);
