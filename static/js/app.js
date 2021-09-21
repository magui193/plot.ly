// FUNCTION #1 of 5
function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(data => {
        console.log(data)

        // Filtering the samples to the patient that the user selected
        var filteredSample = data.samples.filter(patient => patient.id == selectedPatientID)[0]

        console.log(filteredSample)

        // Filtering the metadata to the patient that the user selected
        var filteredMetadata = data.metadata.filter(patient => patient.id == selectedPatientID)[0]

        console.log(filteredMetadata)

        // Create horizontal bar chart with filtered sample

        var trace1 = {
            x: filteredSample.sample_values.slice(0, 10).reverse(),
            y: filteredSample.otu_ids.slice(0, 10).map(otu_id => `OTU #${otu_id}`).reverse(),
            text: filteredSample.otu_labels.slice(0, 10).reverse(),
            marker: {
            },
            type: 'bar',
            orientation: "h",

        };

        var data = [trace1];

        var layout = {
            title: '<b>Most Common Bacteria<br>in Patient Belly Button'
        };

        Plotly.newPlot('barDiv', data, layout);

        // Create bubble chart with filtered sample
        var trace1 = {
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            text: filteredSample.otu_labels,
            mode: 'markers',
            marker: {
                size: filteredSample.sample_values,
                color: filteredSample.otu_ids,
                colorscale: "Electric"
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Types & Quantity of Bacteria on Patient Belly Button',
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubbleDiv', data, layout);

        // Create gauge chart
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: filteredMetadata.wfreq,
                title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 10] } }
            }
        ];

        var layout = { width: 600, height: 400 };
        Plotly.newPlot('gaugeDiv', data, layout);
    })
};

// FUNCTION #2 of 5
function populateDemographicInfo(selectedPatientID) {
    var demographicInfoBox = d3.select("#sample-metadata");
    d3.json("samples.json").then(data => {
        console.log(data)
    })
}

// FUNCTION #3 of 5
function optionChanged(selectedPatientID) {
    console.log(selectedPatientID);
    buildCharts(selectedPatientID);
    populateDemographicInfo(selectedPatientID);
}

// FUNCTION #4 of 5
function populateDropdown() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
    })
}

// FUNCTION #5 of 5
function buildWebsiteOnStartup() {
    populateDropdown();
    d3.json("samples.json").then(data => {
        buildCharts(data.names[0]);
        populateDemographicInfo(data.names[0]);
    })
};

buildWebsiteOnStartup();