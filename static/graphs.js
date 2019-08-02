
createGraphsforTransactionData(transactionData);
createGraphsforGirlNames(namesRank);

function createGraphsforTransactionData(dataSet) {
    var ndx = crossfilter(dataSet);
    show_total_spend_per_state(ndx);
    show_total_spend_per_person(ndx);
    show_total_earnings_per_store(ndx);

    dc.renderAll();
}

function createGraphsforGirlNames(dataSet) {
    var ndx = crossfilter(dataSet);
    showGirlNamesRanking(ndx);
    dc.renderAll();
}

function showGirlNamesRanking(ndx) {
    var nameDim = ndx.dimension(dc.pluck("name"));
    var countPerName = nameDim.group().reduceSum(dc.pluck("count"));
    dc.rowChart("#girls-name")
        .width(450)
        .height(1500)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(nameDim)
        .group(countPerName);
}

function show_total_spend_per_state(ndx) {
    var stateDim = ndx.dimension(dc.pluck("state"));
    var totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

    dc.barChart("#per-state")
        .width(350)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(stateDim)
        .group(totalSpendPerState)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("State")
        .yAxisLabel("Spent")
        .yAxis().ticks(4);
}

function show_total_spend_per_person(ndx) {
    var nameDim = ndx.dimension(dc.pluck("name"));
    var totalSpendPerPerson = nameDim.group().reduceSum(dc.pluck("spend"));
    dc.lineChart("#per-person")
        .width(350)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Name')
        .yAxisLabel('Spent')
        .dimension(nameDim)
        .group(totalSpendPerPerson);
}

function show_total_earnings_per_store(ndx) {
    var storeDim = ndx.dimension(dc.pluck("store"));
    var totalEarningsPerPerson = storeDim.group().reduceSum(dc.pluck("spend"));
    dc.rowChart("#per-store")
        .width(350)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(storeDim)
        .group(totalEarningsPerPerson);
}