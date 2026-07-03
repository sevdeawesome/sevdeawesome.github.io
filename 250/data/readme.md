# Countries that are democracies and autocracies - Data package

This data package contains the data that powers the chart ["Countries that are democracies and autocracies"](https://ourworldindata.org/grapher/countries-democracies-autocracies-row?v=1&csvType=filtered&useColumnShortNames=false) on the Our World in Data website.

## CSV Structure

The high level structure of the CSV file is that each row is an observation for an entity (usually a country or region) and a timepoint (usually a year).

The first two columns in the CSV file are "Entity" and "Code". "Entity" is the name of the entity (e.g. "United States"). "Code" is the OWID internal entity code that we use if the entity is a country or region. For most countries, this is the same as the [iso alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code of the entity (e.g. "USA") - for non-standard countries like historical countries these are custom codes.

The third column is either "Year" or "Day". If the data is annual, this is "Year" and contains only the year as an integer. If the column is "Day", the column contains a date string in the form "YYYY-MM-DD".

The remaining columns are the data columns, each of which is a time series. If the CSV data is downloaded using the "full data" option, then each column corresponds to one time series below. If the CSV data is downloaded using the "only selected data visible in the chart" option then the data columns are transformed depending on the chart type and thus the association with the time series might not be as straightforward.


## Metadata.json structure

The .metadata.json file contains metadata about the data package. The "charts" key contains information to recreate the chart, like the title, subtitle etc.. The "columns" key contains information about each of the columns in the csv, like the unit, timespan covered, citation for the data etc..

## About the data

Our World in Data is almost never the original producer of the data - almost all of the data we use has been compiled by others. If you want to re-use data, it is your responsibility to ensure that you adhere to the sources' license and to credit them correctly. Please note that a single time series may have more than one source - e.g. when we stich together data from different time periods by different producers or when we calculate per capita metrics using population data from a second source.

### How we process data at Our World In Data
All data and visualizations on Our World in Data rely on data sourced from one or several original data providers. Preparing this original data involves several processing steps. Depending on the data, this can include standardizing country names and world region definitions, converting units, calculating derived indicators such as per capita measures, as well as adding or adapting metadata such as the name or the description given to an indicator.
[Read about our data pipeline](https://docs.owid.io/projects/etl/)

## Detailed information about each time series


## Closed autocracies
Last updated: March 17, 2026  
Next update: March 2027  
Date range: 1789–2025  
Unit: countries  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
V-Dem (2026) – processed by Our World in Data

#### Full citation
V-Dem (2026) – processed by Our World in Data. “Closed autocracies” [dataset]. V-Dem, “Democracy report v16” [original data].
Source: V-Dem (2026) – processed by Our World In Data

### Source

#### V-Dem – Democracy report
Retrieved on: 2026-03-17  
Retrieved from: https://v-dem.net/data/the-v-dem-dataset/  

#### Notes on our processing step for this indicator
### Data imputation
We expand the years covered by V-Dem further: To expand the time coverage of today's countries and include more of the period when they were still non-sovereign territories, we identified the historical entity they were a part of and used that regime's data whenever available

For example, V-Dem only provides regime data since Bangladesh's independence in 1971. There is, however, regime data for Pakistan and the colony of India, both of which the current territory of Bangladesh was a part. We, therefore, use the regime data of Pakistan for Bangladesh from 1947 to 1970, and the regime data of India from 1789 to 1946. We did so for all countries with a past or current population of more than one million.

For more details on the imputation methodology and which countries are affected, refer to [this file](https://github.com/owid/etl/blob/master/etl/steps/data/garden/democracy/2025-03-17/vdem/vdem.countries_impute.yml).


## Electoral autocracies
Last updated: March 17, 2026  
Next update: March 2027  
Date range: 1789–2025  
Unit: countries  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
V-Dem (2026) – processed by Our World in Data

#### Full citation
V-Dem (2026) – processed by Our World in Data. “Electoral autocracies” [dataset]. V-Dem, “Democracy report v16” [original data].
Source: V-Dem (2026) – processed by Our World In Data

### Source

#### V-Dem – Democracy report
Retrieved on: 2026-03-17  
Retrieved from: https://v-dem.net/data/the-v-dem-dataset/  

#### Notes on our processing step for this indicator
### Data imputation
We expand the years covered by V-Dem further: To expand the time coverage of today's countries and include more of the period when they were still non-sovereign territories, we identified the historical entity they were a part of and used that regime's data whenever available

For example, V-Dem only provides regime data since Bangladesh's independence in 1971. There is, however, regime data for Pakistan and the colony of India, both of which the current territory of Bangladesh was a part. We, therefore, use the regime data of Pakistan for Bangladesh from 1947 to 1970, and the regime data of India from 1789 to 1946. We did so for all countries with a past or current population of more than one million.

For more details on the imputation methodology and which countries are affected, refer to [this file](https://github.com/owid/etl/blob/master/etl/steps/data/garden/democracy/2025-03-17/vdem/vdem.countries_impute.yml).


## Electoral democracies
Last updated: March 17, 2026  
Next update: March 2027  
Date range: 1789–2025  
Unit: countries  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
V-Dem (2026) – processed by Our World in Data

#### Full citation
V-Dem (2026) – processed by Our World in Data. “Electoral democracies” [dataset]. V-Dem, “Democracy report v16” [original data].
Source: V-Dem (2026) – processed by Our World In Data

### Source

#### V-Dem – Democracy report
Retrieved on: 2026-03-17  
Retrieved from: https://v-dem.net/data/the-v-dem-dataset/  

#### Notes on our processing step for this indicator
### Data imputation
We expand the years covered by V-Dem further: To expand the time coverage of today's countries and include more of the period when they were still non-sovereign territories, we identified the historical entity they were a part of and used that regime's data whenever available

For example, V-Dem only provides regime data since Bangladesh's independence in 1971. There is, however, regime data for Pakistan and the colony of India, both of which the current territory of Bangladesh was a part. We, therefore, use the regime data of Pakistan for Bangladesh from 1947 to 1970, and the regime data of India from 1789 to 1946. We did so for all countries with a past or current population of more than one million.

For more details on the imputation methodology and which countries are affected, refer to [this file](https://github.com/owid/etl/blob/master/etl/steps/data/garden/democracy/2025-03-17/vdem/vdem.countries_impute.yml).


## Liberal democracies
Last updated: March 17, 2026  
Next update: March 2027  
Date range: 1789–2025  
Unit: countries  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
V-Dem (2026) – processed by Our World in Data

#### Full citation
V-Dem (2026) – processed by Our World in Data. “Liberal democracies” [dataset]. V-Dem, “Democracy report v16” [original data].
Source: V-Dem (2026) – processed by Our World In Data

### Source

#### V-Dem – Democracy report
Retrieved on: 2026-03-17  
Retrieved from: https://v-dem.net/data/the-v-dem-dataset/  

#### Notes on our processing step for this indicator
### Data imputation
We expand the years covered by V-Dem further: To expand the time coverage of today's countries and include more of the period when they were still non-sovereign territories, we identified the historical entity they were a part of and used that regime's data whenever available

For example, V-Dem only provides regime data since Bangladesh's independence in 1971. There is, however, regime data for Pakistan and the colony of India, both of which the current territory of Bangladesh was a part. We, therefore, use the regime data of Pakistan for Bangladesh from 1947 to 1970, and the regime data of India from 1789 to 1946. We did so for all countries with a past or current population of more than one million.

For more details on the imputation methodology and which countries are affected, refer to [this file](https://github.com/owid/etl/blob/master/etl/steps/data/garden/democracy/2025-03-17/vdem/vdem.countries_impute.yml).


    