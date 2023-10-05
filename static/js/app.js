// grabbing JSON data url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    console.log(data);
    // Direct location for addition of dropdown menu items  
    let dropDownOptions = d3.select("#selDataset");

    // defining names variable
    let names = data.names

    //Loop through the names and append each item
    for (i = 0; i < names.length; i++) {
        //append options to select statement
        dropDownOptions
            .append("option")
            .property("value", names[i])
            .text(names[i]);
    };


    optionChanged(names[0])

});

function buildMetaData(id) {
    d3.json(url).then(function (data) {
        let panel = d3.select("#sample-metadata");

        metadata = data.metadata
        let resultArray = metadata.filter(sampleObj => sampleObj.id == id);
        let result = resultArray[0];

        panel.html("")

        for (key in result) {
            panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };

        // (Another way to write the above code for reference
        //  Object.entries(result).forEach(([key, value]) => {
        //  box.append("h6").text(`${key.toUpperCase()}: ${value}`);
        //  });

    });
}

// defining function we want to activate when user changes drop down menu
function optionChanged(id) {
    buildMetaData(id)
    updatePlotly(id)
    updateBubble(id)
}



// Function to update bar chart once user has select id from drop down menu
function updatePlotly(id) {
    d3.json(url).then(function (data) {
        let barChart = d3.select("#bar");

        let samples = data.samples
        let sampleArray = samples.filter(Obj => Obj.id == id);
        let sampleResult = sampleArray[0] 
        barChart.html("");

        //samples.sample_values (slice for first 10 items)
        let sample_values = sampleResult.sample_values.slice(0, 10);
        //samples.otu_ids (slice for first 10 items) put all in trace
        let otu_ids = sampleResult.otu_ids.slice(0, 10);
        //samples.otu_lables (slice for first 10 items)
        let otu_labels = sampleResult.otu_labels.slice(0, 10);

        traceData = [{
            orientation : 'h',
            x: sample_values,
            //y: `OTU ${otu_ids}`, currently this line does not do anything even when not commented out
            text: otu_labels,
            type: "bar"
        }]

        Plotly.newPlot("bar", traceData);
    });    

}

 // creating bubble chart function to activate when user changed input for drop down menu
 function updateBubble(id) {
    d3.json(url).then(function (data) {
        let bubbleChart = d3.select("#bubble");

        let samples = data.samples
        let sampleArray = samples.filter(Obj => Obj.id == id);
        let sampleResult = sampleArray[0] 
        bubbleChart.html("");


        let bubSample_values = sampleResult.sample_values;
        let bubOtu_ids = sampleResult.otu_ids;
        let bubOtu_labels = sampleResult.otu_labels;

        let bubTraceData = [{
            x: bubOtu_ids,
            y: bubSample_values,
            text: bubOtu_labels,
            mode: "markers",
            marker : {
                size: bubSample_values,
                color: bubOtu_ids
            }
        }]

        let layout = {
            title: "OTU ID"
        
        }

        Plotly.newPlot("bubble", bubTraceData, layout);
    });   


}


