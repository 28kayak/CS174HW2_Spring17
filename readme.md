# CS174 HW2
## Objectives
-  Become familiar with the DOM paradigm;
- Use an existing XML parser;
- Transform the content of an XML document into an HTMLpage.
## Description
- You are required to write a HTML/JavaScript program, which takes the URL of an XML document containing US Airlines information, parses the XML file, and extracts the list of airlines, displaying them in a table.
The JavaScript program will be embedded in an HTML file so that it can be executed within a browser.
-  Your program should display a text box to enter the XML file name as shown below on Figure 1. On clicking the “Submit Query” button, your program should display the table as shown below, Figure 2. If the text box is left empty and Submit Query is clicked, an appropriate error message must be shown.
-  Once the XML file downloads, a JavaScript function within the HTML file parses the XML document that was passed as an inputto the popped up window.
-  After parsing the XML document, a table should be displayed consisting of the data for all Airline companies that are contained in the XML file. An example XMLdocument, “airlinelist.xml” is available on Canvas under HW2 directory.
-  Here is a version of the airlinelist.xml file containing the data that is displayed above:
```xml
<?xml version="1.0"?>
<Mainline>
<Table>
<Header>
<Data>Airline</Data>
<Data>IATA</Data>
<Data>Hubs</Data>
<Data>Notes</Data>
<Data>HomePage</Data>
<Data>Plane</Data>
</Header>
<Row>
<Airline>Alaska Airlines</Airline>
<IATA>AS</IATA>
<Hubs>
<Hub>Seattle/Tacoma</Hub>
<Hub>Anchorage</Hub>
<Hub>Portland (OR)</Hub>
<Hub>San Diego</Hub>
<Hub>San Jose</Hub>
</Hubs>
<Notes>Founded as McGee Airways, and commenced operations in 1944 as Alaska Airlines. Plans have been made for Alaska Airlines to acquire Virgin America.</Notes>
<HomePage>https://www.alaskaair.com/</HomePage>
<Plane>./images/ Alaska_Airlines,_Boeing_737.jpg</Plane>
</Row>
<Row>
<Airline>American Airlines</Airline>
<IATA>AA</IATA>
<Hubs>
<Hub>Dallas/Fort Worth</Hub>
<Hub>Charlotte</Hub>
<Hub>Chicago-O'Hare</Hub>
<Hub>Los Angeles</Hub>
<Hub>Miami</Hub>
<Hub>New York-JFK</Hub>
<Hub>New York-LaGuardia</Hub>
<Hub>Philadelphia</Hub>
<Hub>Phoenix</Hub>
<Hub>Washington-National</Hub>
</Hubs>
<Notes>Founded as American Airways; largest airline in the world based on airline company revenue, scheduled passenger miles flown (per year), and fleet size.</Notes>
<HomePage>http://www.aa.com</HomePage>
<Plane>./images/ American_Airlines_Boeing_777.png</Plane>
</Row>
<Row>. . .</Row>
<Row>. . .</Row>
<Row>. . .</Row>
<Row>. . .</Row>
</Table>
</Mainline>
```
## Error Handling
In case of a `parsing error`, your program should show an alert box indicating an error was detected.

Another error condition that should be `checked for is an XML file
containing NO airline companies`. An example of an XML files which does
not contain airline company entries:
```xml
<?xml version="1.0"?>
<Mainline>
<Table>
<Header>
<Data>Airline</Data>
<Data>IATA</Data>
<Data>Hubs</Data>
<Data>Notes</Data>
<Data>HomePage</Data>
<Data>Plane</Data>
</Header>
</Table>
</Mainline>
```
In addition, you program should `handle the case when the XML file does not exist`.
A proper message should be displayed.
The schema of the input XML files won’t change. We won’t test the case where the order of tags is changed or one of the tags is missed.
In other words, every Row always contains the sub-tags: Airline, IATA, Hubs, Notes, HomePage, and Plane in the “same” given order.
Note that inside the Hubs tag, there may be ZERO or more Hub tags.
If the value of a tag is empty, you should display a blank cell.
```xml
<?xml version="1.0"?>
<Mainline>
<Table>
<Header>
<Data>Airline</Data>
<Data>IATA</Data>
<Data>Hubs</Data>
<Data>Notes</Data>
<Data>HomePage</Data>
<Data>Plane</Data>
</Header>
</Table>
</Mainline>
```
You are required to `handle the case where the Header data values are different`. Please note that the Data tag values might differ but the XML structure remains the same. For example, the Header can be,
```xml
<Header>
<Data>US Airline</Data>
<Data>IATA</Data>
<Data>main Hubs</Data>
<Data>Notes</Data>
<Data>Home Page</Data>
<Data>Plane with Logo</Data>
</Header>
```
inseted of
```xml
<Header>
<Data>Airline</Data>
<Data>IATA</Data>
<Data>Hubs</Data>
<Data>Notes</Data>
<Data>HomePage</Data>
<Data>Plane</Data>
</Header>
```
No other error conditions need be checked. In all cases if an error is found your program should show an alert box indicating the error was detected.
## Hint
##### step 1 -- Writing Your HTML/JavaScript program - Using the DOM Parser
Here's how you could use the Microsoft DOM API and the Mozilla DOM API (used in Firefox) to load and parse an XML document into a DOM tree, and then use the DOM API to extract information from that document.
```html
<script type="text/javascript"> var xmlDoc;
function loadXML(url) {
    if (window.XMLHttpRequest){
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else{
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET",url,false); //open,  responseXML are           xmlhttp.send(); //send properties of XMLHTTPRequest
    xmlDoc=xmlhttp.responseXML;
    return xmlDoc;
}
// ....... processing the document goes here
</script>
```
Now you can generate the HTML table from the DOM tree. You can assume that every xml file will have identical tag names. However, the company entries may occur in any order.
Your task is to write a program that transforms this type of XML file into the table as shown above.
For example, you can access the child nodes of the documents as follows:
```js
footb = xmlDoc.documentElement.childNodes;
```
Note that unlike the Java-based DOM, which provides methods such as getChildNodes( ) and getNodeType( ) that return respectively a node list of children of a current node and the type of a node, with the DOM you have to access the element properties directly, as in:
```js
footbNodeList = footb.item(i).childNodes;
if (footbNodeList.item(j).nodeType == ELEMENT_NODE)
```
Below is the link to the web page that demonstrates how to handle white spaces in Mozilla:
```
http://developer.mozilla.org/en/docs/Whitespace_in_the_DOM
```
#### Step 2: Display the Resulting HTML Document
You should use the DOM document.write method to output the required HTML.
#### Step 3: Use JavaScript control syntax
The only program control statements that you will need to use for this exercise are the “if” and the “for” statements. The syntax of both statements is practically identical to the syntax of the corresponding statement in the C, C++ and Java languages, as in:
```js
if (footbNodeList.item(j).nodeName=="Logo") {
    // do stuff
}
for (j=0;j<footbNodeList.length;j++) {
    // do more stuff
}
```
#### step4 Make note on the following issue
##### Cross-Site-Scripting(XSS)
JavaScript cannot call the resources from another domain.
This is called cross side scripting which is not allowed in browsers.
Therefore, you `must put your XML files and your script in the same domain`. Please make sure, when you are testing your implementation, to `place both the HTML file and the XML file on your local machine IN THE SAME FOLDER`.
The files can be copied from here:
```
Canvas->Files->HW2->xml->invalid.xml
Canvas->Files->HW2->xml->airlinelist.xml
```
Window.open() method must be used to pop up a new window which would display the final widget.
Image files can be either local or remote, as these files do not exhibit the cross-site scripting issue.
##### Scrollable Window:
The popup window should be scrollable so the user can read all records listed in the window.

###  Materials You Need to Submit
For this homework you should a page that looks like the one displayed in the Figure on page 1.
This page should `include your entire JavaScript/HTML/CSS program in a single file`. You should submit your source code electronically to Canvas.
If your submission is composed of multiple files, 3 points will be deducted.
## Run on my computer
```sh
#start python3 server
python -m http.server
#access to:
http://localhost:8000
```
### Tech

Dillinger uses a number of open source projects to work properly:

* [python3] - to set up server
* [javascript] - javascript tutorials
* [DOM] - Document Object Model
* [atom editor] - great UI boilerplate for modern web apps

### Installation

### Todos

 - Write MOAR Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [python3]: <https://www.python.org>
   [javascript]: <https://www.w3schools.com/js/>
   [DOM]: <https://www.w3schools.com/js/js_htmldom.asp>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Atom Editor]: <https://atom.io/>
