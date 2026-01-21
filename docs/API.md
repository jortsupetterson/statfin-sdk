Languages: English

English
PxWeb API

---

It is possible to retrive tables with the PxWeb API (Application Programming Interface) in xlsx, csv,
json, json-stat, json-stat2 and PC-Axis (.px) fileformats depending on the PxWeb version.
The API is also in use at Statistics Sweden, SCB:
https://www.statistikdatabasen.scb.se/pxweb/en/ssd//.

How does the PxWeb API work?
FIRST READ THESE DOCUMENTS!
https://pxdata.stat.fi/API-description_SCB.pdf
NB: The SCB description is based on the use of a relational database, where the extension ".px" for the table name is omitted.
For statistics Finland databases allways remember to use the extension ".px" after the table name.
Example:https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/statfin_kuol_pxt_12af.px Retrieve metadadata for a table

And a step by step explanation with pictures on how to use our API:
https://www.stat.fi/static/media/uploads/org_en/avoindata/px-web_api-help.pdf

After reading the API documents, you can study the API here:
https://pxdata.stat.fi/PXWeb/pxweb/en/StatFin

1. Select a small table and retrieve it from the PxWeb database service.
2. In the end of the table page select "Make this table available in your application", where you get
   information on how to retrieve the table using the API.

Statistics Finland is offering these PxWeb databases
English: https://www.stat.fi/org/avoindata/pxweb_en.html
Finnish: https://www.stat.fi/org/avoindata/pxweb.html
Swedish: https://www.stat.fi/org/avoindata/pxweb_sv.html

API limitations:
Query the API for its configuration: https://pxdata.stat.fi/PXWeb/api/v1/fi/?config

Usage examples:
You can do a free text search with the API. For example: search for "population" (URL-encoded):
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin?query=population
Or, seach for "091" (Helsinki) from the regional codes (old code):
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin?query=091&filter=codes
Or, seach for "KU091" (Helsinki) from the regional codes (new code):
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin?query=KU091&filter=codes

Now with the latest version of PxWeb you can get the database structure:
https://pxdata.stat.fi/pxweb/api/v1/en/StatFin/?query=*&filter=*

Study the database user interface: https://pxdata.stat.fi/PXWeb/pxweb/en/StatFin
PXWEB/API-NAME/API-VERSION/LANGUAGE/DATABASE-ID/LEVELS/TABLE-ID
https://pxdata.stat.fi/PXWeb/api/v1/en/ Databases available on this server
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin Subject realms in StatFin database (levels)
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/kuol Tablelist (levels)
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/kuol/statfin_kuol_pxt_12af.px Metadata of table

With the latest version of PxWeb it is possible to omit the levels both in GET and POST (levels will still work more reliably):
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/statfin_kuol_pxt_12af.px

Get basic table - A POST example (only for small under 100 000 cell tables):

To test with cURL (API limited to 110 000 figures):
curl -X POST -k -i 'https://pxdata.stat.fi:443/PXWeb/api/v1/en/StatFin/kbar/statfin_kbar_pxt_11cc.px' --data '{"query": [ ],"response":{"format":"json-stat"}}'
This retrieves the basic table without the categorical (nominal) variables (sex, age ... ).

or shorter:
curl -X POST -k -i 'https://pxdata.stat.fi:443/PXWeb/api/v1/en/StatFin/statfin_kbar_pxt_11cc.px' --data '{"query": [ ],"response":{"format":"json-stat"}}'
This retrieves the basic table without the categorical (nominal) variables (sex, age ... ).

curl -X POST -k -i 'query URL here' --data 'query here'

Query and URLs from here (PxWeb API helper):
https://pxdata.stat.fi/PXWeb/pxweb/en/StatFin

1. Select a small table and retrieve it from the PxWeb database service.
2. In the end of the table page select "Make this table available in your application", where you get
   information on how to retrieve the table using the API.

Status codes (error messages):
200 - OK
404 - errors in syntax of the query or POST URL not found.
403 - blocking when querying for large data sets. The API limit is now 100,000 cells.
429 - Too many queries within a minute. The API limit is now 30 queries within 10 seconds.
503 - Time-out after 60 seconds. It may turn on, when extracting large XLSX datasets.
(We do not recommend that).

Chargeable Statistics Finland PxWeb (PX-Web) databases can now also be accessed via the API and
the saved query. Only the authentication part differs from normal PxWeb API and saved query usage.
https://pxhopea2.stat.fi/PXWeb/pxweb/en/

API URL metadata (GET) example:
https://server/PXWeb/api/v1/lang/%7CUSERNAME%7CPASSWORD

        Saved query URL example:
        https://server/PXWeb/sq/saved_query_name%7CUSERNAME%7CPASSWORD

    	%7C is used as the separator
    	Username and password in every URL

        In the API POST you must add username and password in the header:
        Header name = un  Header value = user name
    	Header name = pw  Header value = password



How to modify the json query to retrieve the latest data?
Part of the json query (Json does not support comments)

       ...

"code": "Vuosi", <-- time variable
"selection": {
"filter":"top", <-- select the two (2) latest years "Vuosi" (timeseries)
"values":["2"] <-- select the two (2) latest years "Vuosi" (timeseries)  
 ...
"format": "px" <-- can be xlsx, csv, json, json-stat, json-stat2 or px, soon also csv2 and csv3 (lists with texts or code)
...

## More later in this document ...

New users, software, features and bugs:

10.02.2020 Geofi- R-paketti geofi suomalaisen paikkatiedon hyödyntämiseen R:ssä.
https://ropengov.github.io/geofi/

04.11.2019 How to use PxAPI with R video on Youtube:
https://www.youtube.com/watch?v=lWMS22XCwrE
More can be found here:
https://github.com/rOpenGov/pxweb

02.10.2019 Chargeable Statistics Finland PxWeb (PX-Web) databases can now also be accessed via the API and the saved query.
Only the authentication part differs from normal PxWeb API and saved query usage.
API URL metadata (GET) example:
https://server/PXWeb/api/v1/lang/%7CUSERNAME%7CPASSWORD

           Saved query URL example:
           https://server/PXWeb/sq/saved_query_name%7CUSERNAME%7CPASSWORD

       %7C is used as the separator
           Username and password in every URL

           In the API POST you must add username and password in the header:
           Header name = un  Header value = user name
           Header name = pw  Header value = password   /Hb

10.06.2019 Statistics Finland is offering these PxWeb databases
English: https://www.stat.fi/org/avoindata/pxweb_en.html
Finnish: https://www.stat.fi/org/avoindata/pxweb.html
Swedish: https://www.stat.fi/org/avoindata/pxweb_sv.html

09.05.2019 The Finnish Centre for Pensions now also uses PxWeb table dissemination:
https://tilastot.etk.fi/pxweb/en/ETK/
The API is still to be opened. /Hb

09.05.2019 With the soon updated PxWeb 2019 v1 (the work has been completed) you can will be able to place
our graphs on your webpages. This is a simple saved query demonstration:
A simple webpage showing the use of PxWeb saved query URLs /Hb

09.05.2019 PxWeb API Interface for R
This R package provides tools to access PxWeb API. The pxweb R package connects any PXWEB
API to R and hence facilitate the access, use and referencing of data from PXWEB APIs.
https://cran.rproject.org/web/packages/pxweb/vignettes/pxweb.html /Hb

28.01.2019 Post query error codes

           The API uses https POST to retrive table data, and does not support https GET in API version 1.

           Status codes and error messages:
            200 - OK
            404 - errors in syntax of the query or POST URL not found.
            403 - blocking when querying for large data sets. The API limit is now 100,000 cells.
            429 - Too many queries within a minute. The API limit is now 30 queries within 10 seconds.
            503 - Time-out after 60 seconds. It may turn on, when extracting large XLSX datasets.
                  (We do not recommend that).

           Query the API for its configuration: https://pxdata.stat.fi/PXWeb/api/v1/fi/?config   /Hb

25.01.2019 New updated information on the extended PxWeb API usage (feature in beta testing)

           API usage with filter
           Search for date,  use:  filter=published

           Search tables published a specific date 10.10.2018:
           https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/?query=2022101*&filter=published
           So you can with this for example list all your tables "published today"

           Tables published in October:
           https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/?query=202211*&filter=published
           So with this you can get for example the tables published this month

           The date is OK but the time listed in the json reply is not accurate at the moment.
           Tables with published later than 8.00 have been updated for one reason or another.    /Hb

21.11.2017 Tools for utilizing PX-API
PX-JSON
-Excel / MS Power BI / Powerquery

            -JSON-Stat https://json-stat.org/
               Developed by Xavier Badosa
               Supported by PX-API and Eurostat
               Format made for multidimensional datacubes / tables
               Many tools and libraries

            -JSON-Stat - Javascript https://json-stat.org/
              JSON-stat Javascript Toolkit (JJT)
              JSON-stat Javascript Utilities Suite (JJUS)
              Json-stat explorer
              Examples:
              Highcharts: https://github.com/hagstovan/json-stat.chart.examples
              Google charts: https://github.com/StatisticsGreenland/statbank2charts

            -JSON-Stat - R
               R - Command line statstistical and programming tool
               rjstat https://cran.r-project.org/web/packages/rjstat
               Examples: https://github.com/hmalmedal/


            -JSON-Stat - Python
               pyjstat
                 https://github.com/predicador37/pyjstat

                 Stats-to-pandas
                     Search, select and downoad to Pandas dataframe.Based on pyjstat.
                     https://github.com/hmelberg/stats-to-pandas
                     Demo: https://www.youtube.com/watch?v=hhj7ITIU3F8

                jsonstat.py
                  https://jsonstatpy.readthedocs.io/en/latest
                  Made for INE (Italy)

            -JSON-Stat - Java
                  Java library to read and write json-stat
                  https://github.com/statisticsnorway/json-stat.java

            -JSON-Stat - Julia
                  https://github.com/klpn/JSONStat.jl
                  Julia is Python-like language for mathematical, numerical and economic analysis

            -JSON-Stat - Conversion tools
                  Json-stat Command line conversion tools
                       To arrays or objects
                       To CSV in the way you want, or from CSV
                       Requires node.js (developer tool)
                       https://github.com/badosa/JSON-stat-conv/
                  Json-Stat Javascript utilities suite (JJUS)
                  JSON-Stat to linked data
                       json-ld
                           Opencube – continues as Open Govt intelligence
                           https://github.com/opencube-toolkit/json-stat2qb-component
                       jsonstat 2 rdfxml
                           https://github.com/arekstasiewicz/json-stat2qb

            -PX
                  Px.js
                     Javascript library for maipulating px-files
                     https://www.npmjs.com/package/px
                  Ruby.px
                     Work with PC-Axis files using Ruby
                     https://github.com/PopulateTools/ruby_px

            -CSV
                  R
                   Command line statstistical and programming tool
                  R px-gov
                   https://github.com/rOpenGov/pxweb

            -Services
                  PX-Win
                     Access all PX-APIs https://www.scb.se/pxwin-en
                  Stat2go
                     Based on Badosa’s table browser
                     http://stat2go.com         /Compiled by Jan Bruusgard Statistics Norway

31.08.2017 Specifying JSON Query in Power Query – Example Statistics Sweden
https://eriksvensen.wordpress.com/2014/09/15/specifying-json-query-in-power-query-example-statistics-sweden/

16.02.2017 The PC-Axis/PxWeb px-fileformat: https://pxdata.stat.fi/px-tiedoston_kuvaus_v2_en.txt
Laajempi suomenkielinen tiedostomuodon kuvaus: https://pxdata.stat.fi/px-tiedoston_kuvaus_v2.txt /Hb

01.02.2017 PxWin and PxEdit are now portable /Hb

27.01.2017 A maintained list of PxWeb APIs in XML format:
https://pxdata.stat.fi/databases.xml /Hb

18.01.2017 Direct links to all StatFin PxWeb tables: https://pxdata.stat.fi/database/StatFin/StatFin_rap.csv - Only links to files in in PC-Axis fileformat (all suported languages)

           You can use PX-Edit or PX-Job (comman line version) to convert the files to other fileformats. Only for Windows!
           https://www.stat.fi/tup/tilastotietokannat/px-tuoteperhe_en.html ENG
           https://www.stat.fi/tup/tilastotietokannat/px-tuoteperhe.html FIN   /Hb

14.12.2016 When our CORS issues are solved this will also work for you:
A simple webpage showing the use of PxWeb saved query URLs
It now works works in PxWeb 2019 v1 and forward ... /Hb

06.09.2016 This will hopefully work properly in future versions of the PxWeb API:
https://pxdata.stat.fi/pxweb/api/v1/fi/StatFin/?query=*&filter=*
bugs to fix: - Works only with small PxWeb databases (fixed) - Dates are still weird /Hb

04.11.2015 "pxweb R" is an R package to interface with the PxWeb API, and it offers methods to utilize information
about the data hierarchy stored behind the PxWeb API used by Statistics authorities in Finland,
Sweden and many other countries. Many API services are still in their early stages, and data quality
is sometimes compromised. https://github.com/rOpenGov/pxweb

01.10.2015 JSON-stat is a simple lightweight JSON dissemination format best suited for data visualization,
mobile apps or open data initiatives, that has been designed for all kinds of disseminators.
JSON-stat also proposes an HTML microdata schema to enrich HTML tables and put the JSON-stat vocabulary
in the browser.
Fortunately, there are already tools that ease the use of JSON-stat, like the JSON-stat Javascript Toolkit,
a library to process JSON-stat responses. https://json-stat.org/

01.10.2015 LUKE the Natural Resources Institute of Finland is now also using the PxWeb service:
https://statdb.luke.fi/PXWeb/pxweb/en/LUKE/

           Graphs for publications are generated using API-calls from the PxWeb database and an open source
           graph component: https://stat.luke.fi/en/milk-and-milk-product-statistics-82015-provisional_en  /Hb

28.09.2015 The Finnish Tax Administration is now also using the PxWeb service:
https://vero2.stat.fi/PXWeb/pxweb/en/Vero/ (first 4 tables published) /Hb

25.09.2015 TRAFI The Finnish Transport Safety Agency is now also using the new PxWeb service:
https://trafi2.stat.fi/PXWeb/pxweb/en/TraFi/ /Hb

07.08.2015 - A nice API demo: http://stat2go.com. - Added SAS template to documentation - Added R template to documentation
Thanks's Lars /Hb

07.05.2015 - A nice API graph example: https://bl.ocks.org/badosa/81ab0e82138199d7e166.
Thanks's Xavier /Hb

27.02.2015 - TimeZone bug in JsonStatSerializer. Will be fixed in the next version! /Hb

29.01.2015 PxWeb updated to version 2014 dec R1 and known API bugs where fixed. - Added a possibility to query the API for its configuration.
https://pxdata.stat.fi/PXWeb/api/v1/fi/?config /Hb

14.01.2015 - Problems with the json-stat fileformat. Will be fixed in next the version! - The CSV format has language dependent thousand and decimal separator. Will be fixed in next the version! - Bug in API-helper when variable aggregations are selected. Will be fixed in next the version! /Hb
All above listed bugs fixed!

---

The API

It is possible to retrive tables with the PxWeb API (Application Programming Interface) in xlsx, csv,
json, json-stat, sdmx and PC-Axis (.px) fileformats depending on the PxWeb version.
The API is also in use at Statistics Sweden, SCB:
https://www.statistikdatabasen.scb.se/pxweb/en/ssd//.

How does the new PxWeb API work?

FIRST READ THIS DOCUMENT!
https://www.scb.se/Grupp/OmSCB/API/API-description.pdf
NB: The SCB description is based on the use of a relational database, where the extension ".px" for the table name is omitted.
For statistics Finland databases allways remember to use the extension ".px" for the table name.
Example: https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/vrm/kuol/statfin_kuol_pxt_12af.px

After reading the API description document, you can study the API here:
https://pxdata.stat.fi/PXWeb/pxweb/en/StatFin

1. Select a small table and retrieve it from the PxWeb database service.
2. In the table window select the second tab, "About table". In the end of the
   tab page, click "Make this table available in your application", where you get
   information on how to retrieve the table using the API.

Available databases on a PxWeb server:
https://pxdata.stat.fi/PXWeb/api/v1/en/
https://pxdata.stat.fi/PXWeb/api/v1/fi/
https://pxdata.stat.fi/PXWeb/api/v1/sv/

API free text search:

You can do a free text search with the API. For example: search for "population" (URL-encoded):
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin?query=population

Or, seach for "091" (Helsinki) from the regional codes:
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin?query=091&filter=codes

Classifications and codes used in the tables: https://www.stat.fi/en/luokitukset/
Names of statistics and their codes: https://www.stat.fi/org/avoindata/json/tilastot.html

Basic use of the API:

How to query the API for its configuration.
https://pxdata.stat.fi/PXWeb/api/v1/fi/?config
Response:  
 {"maxValues":10000,"maxCalls":30,"timeWindow":1,"CORS":true}

The URL is generated as follows:
API-NAME/API-VERSION/LANGUAGE/DATABASE-ID/LEVELS/TABLE-ID
https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/vaerak/statfin_vaerak_pxt_11rb.px

Examples:
List all databases available through the API (click the URL):
https://pxdata.stat.fi/PXWeb/api/v1/en/
Response example:
[{"dbid":"StatFin","text":"StatFin"}]

List the subject realms (click the URL):
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/
Response example:
[{"id":"maa","type":"l","text":"Agriculture, Forestry and Fishery"},{"id":"rak","type":"l","text":"Construction"}, ...

List the tables of a sub realm (click the URL):
https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/vaerak/
Response example:
[{"id":"010_kuol_tau_101.px","type":"t","text":"Deaths by age, sex and area 1987 - 2013","updated":"2014-05-13T17:30:35"},
{"id":"020_kuol_tau_102.px","type":"t","text":"Deaths by age and sex 1980 - 2013","updated":"2014-05-13T17:30:36"},...

Get table metadata (click the URL):
https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/vaerak/statfin_vaerak_pxt_11rb.px
Response example:
{"title":"Deaths by Area, Age, Year and Sex","variables":[{"code":"Alue","text":"Area","values":["SSS","020","005" ....

Use for example RESTClient or POSTER extension for the Firefox browser.
POST the JSON request to the address and get the table as its response:
https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/vrm/kuol/statfin_kuol_pxt_010.px
NB: The extension is ".px". (This is not mentioned in the SCB documentation.)

NB: POST! Clicking on the URL does not work!

---

POST example:
POST /PXWeb/api/v1/fi/StatFin/eli/akay/statfin_akay_pxt_010.px https/1.1<crlf>Host:pxdata.stat.fi<crlf>Content-Length:39<crlf><crlf>{"query":[],"response":{"format":"px"}}

Where:
<crlf> CR = Carriage Return and LF = Line Feed (U+0013,U+0010)
statfin_akay_pxt_010.px Table to retriev
/PXWeb/api/v1/fi/StatFin/eli/akay/ Path to table
pxdata.stat.fi Server name
39 Character count of the JSON-part
{"query":[],"response":{"format":"px"}} A JSON-query for retrieving the whole table in PC-Axis fileformat
Change the "px" to xlsx, csv, json or json-stat for other fileformats

---

## POST the JSON request (use for example RESTClient or POSTER extension for the FIREFOX browser to test):

           {

"query": [
{
"code": "Alue",
"selection": {
"filter": "item",
"values": [
"SSS",
"020",
"005"
]
}
},
{
"code": "Ikä",
"selection": {
"filter": "item",
"values": [
"SSS",
"0 - 4",
"5 - 9"
]
}
},
{
"code": "Vuosi",
"selection": {
"filter":"top",
"values":["2"]
}
},
{
"code": "Sukupuoli",
"selection": {
"filter": "item",
"values": [
"S",
"1",
"2"
]
}
}
],
"response": {
"format": "px"
}
}

---

Removed comments from the listing above, so cut and paste would work.
Json doesn't by design support comments.

       ...

COMMENT "code": "Vuosi",
COMMENT "selection": {
COMMENT "filter":"top", <-- select the two (2) latest years "Vuosi" (timeseries)
COMMENT "values":["2"] <-- select the two (2) latest years "Vuosi" (timeseries)  
 ...
COMMENT "format": "px" <-- can be xlsx, csv, json, json-stat, px (and sdmx in theory)
...

Px-file (PC-Axis) response (metadata in multiple languages):

---

CHARSET="ANSI";
AXIS-VERSION="2010";
CODEPAGE="iso-8859-1";
LANGUAGE="fi";
LANGUAGES="fi","sv","en"; <-- ritch metadata in 3 languages
CREATION-DATE="20070416 14:40";
DECIMALS=0;
SHOWDECIMALS=0;
MATRIX="010kuol101";
COPYRIGHT=YES;
SUBJECT-CODE="VRM";
SUBJECT-AREA="Väestö";
DESCRIPTION="Kuolleet iän ja sukupuolen mukaan alueittain 1987 - 2013";
TITLE="Kuolleet muuttujina Alue, Ikä, Vuosi ja Sukupuoli";
CONTENTS="Kuolleet";
STUB="Alue","Ikä";
...

---

Json-Stat response (please use the new Json-stat2 instead):

---

{
"dataset": {
"dimension": {
"Alue": {
"label": "Area",
"category": {
"index": {
"SSS": 0,
"020": 1,
"005": 2
},
"label": {
"SSS": "WHOLE COUNTRY",
"020": "Akaa",
"005": "Alajärvi"
}
}
},
"Ikä": {
"label": "Age",
"category": {
"index": {
"SSS": 0,
"0 - 4": 1,
"5 - 9": 2
},
"label": {
"SSS": "Age groups, total",
"0 - 4": "0 - 4",
"5 - 9": "5 - 9"
}
}
},
"Vuosi": {
"label": "Year",
"category": {
"index": {
"2012": 0,
"2013": 1
},
"label": {
"2012": "2012",
"2013": "2013"
}
}
},
"Sukupuoli": {
"label": "Sex",
"category": {
"index": {
"S": 0,
"1": 1,
"2": 2
},
"label": {
"S": "Both sexes",
"1": "Males",
"2": "Females"
}
}
},
"id": ["Alue", "Ikä", "Vuosi", "Sukupuoli"],
"size": [3, 3, 2, 3],
"role": {
"time": ["Vuosi"]
}
},
"label": "Deaths by Area, Age, Year and Sex",
"source": "Statistics Finland",
"updated": "2007-04-16T14:40:00Z",
"value": [51707, 25623, 26084, 51472, 25631, 25841, 181, 93, 88, 137, 74, 63, 30, .....
}
}

---
