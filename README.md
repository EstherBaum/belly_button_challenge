# belly_button_challenge

## Acknowledgements:

I received significant help on this homework from a tutoring session with David Chao. He guided me through building the buildMetaData function in lines 27-47 and adding it to "function optionChanged(id)" in line 50. He also helped me with lines 60-66 of the "function updatePlotly"

## JavaScript Code.

*  First this code first fetches the data from the url and loops through data.names to add a list of options to the drop down menu. 

* Next in the code is the optionChanged(id) function to generate a bar graph, bubble chart, and metadata based on the option the user selected.

* Lastly in the code are the updatePlotly and updateBubble functions that are embedded in the "optionChanged(id)" function. These codes look for the sample_values, otu_ids, and otu_labels data within the url, creates arrays from the data, which is then turned into a bar graph and a bubble chart. 