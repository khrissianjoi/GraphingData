
createGraphs(transactionData);
function createGraphs(dataSet) {
    var ndx = crossfilter(dataSet);
    show_total_spend_per_state(ndx);
    show_total_spend_per_person(ndx);
    dc.renderAll();
}

function show_total_spend_per_state(ndx) {
    var state_dim = ndx.dimension(dc.pluck("state"));
    var total_spend_per_state = state_dim.group().reduceSum(dc.pluck("spend"));
    dc.barChart("#per-state")
        .width(350)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(state_dim)
        .group(total_spend_per_state)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("State")
        .yAxisLabel("Spent")
        .yAxis().ticks(4);
}

function show_total_spend_per_person(ndx) {
    var name_dim = ndx.dimension(dc.pluck("name"));
    var total_spend_per_person = name_dim.group().reduceSum(dc.pluck("spend"));
    dc.lineChart("#per-person")
        .width(350)
        .height(250)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Name')
        .yAxisLabel('Spent')
        .dimension(name_dim)
        .group(total_spend_per_person);
}