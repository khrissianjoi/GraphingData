createGraphs(transactionData);
function createGraphs(dataSet) {
    var ndx = crossfilter(dataSet);
    show_total_spend_per_state(ndx);
    dc.renderAll();
}

function show_total_spend_per_state(ndx) {
    var name_dim = ndx.dimension(dc.pluck("state"));
    var total_spend_per_state = name_dim.group().reduceSum(dc.pluck("spend"));
    dc.barChart("#senti")
        .width(350)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(name_dim)
        .group(total_spend_per_state)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("State")
        .yAxisLabel("Spent")
        .yAxis().ticks(4);
}