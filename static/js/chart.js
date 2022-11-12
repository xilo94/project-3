// function get data 
function getData() {
  var dropdown = d3.select("#selectData");
  var dataset = dropdown.property("value");
  buildcharts(dataset)

}

d3.selectAll("#selectData").on("change", getData);

// initial page (Home page)
// FUNCTION 1, set init() for dashboard and do dropdown button
function buildcharts(dataset) {

  // function tracie(BankValue) {

  console.log(dataset)


  d3.json(dataset).then((data) => {
     console.log(data)
     let result = data.reduce(function(acc, obj) {
      if(acc.map.hasOwnProperty(obj.Year)) {
          acc.map[obj.Year].Total_Deaths += +obj.Total_Deaths;
      } else {
          var newObj = Object.assign({}, obj);
          acc.map[obj.Year] = newObj;
          acc.data.push(newObj);
      }
      return acc;
      }, {data: [], map: {}}).data;
  
  console.log(result);


    // let state = data.map(x => x.State)

    let year = result.map(y => y.Year)

    let death = result.map(z => z.Total_Deaths)

    let type = result.map(b => b.Injury_Intent)
    
    var trace1 = {
      x: year,
      y: death,
      text: type,
      type: "scatter",
      marker: { color: "red" }
    }

    var data = [trace1]

    var layout = {
      title: `${type[0]} Time Series Plot`,
      yaxis: { title: "Total Deaths" },
      xaxis: { title: "Year" }
    }

    Plotly.newPlot("line", data, layout)

  });
}

function init() {
  buildcharts("{{firearm_suicides.json}}");

}
init();