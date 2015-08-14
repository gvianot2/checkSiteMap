var request = require('request');
var XmlDocument = require('xmldoc').XmlDocument;

var website = 'YOUR WEBSITE ADDRESS';

function checkUrl(urlToCheck) {

	request(urlToCheck,function(err,response,body) {
    	if (err) {
    		return console.log(err);
  		}
  		//console.log('statuscode for URL \'%s\' is \'%s\'', urlToCheck,response.statusCode);
  		if(response.statusCode !== 200) {
  			console.log('url to check error' + response.statusCode);
  		}

    });
}

request(website + 'sitemap.xml', function(err, response, body) {
	if (err) {
    	return console.log(err);
  	}
	// Parse the XML
  var results = new XmlDocument(body);
  // Look for all children with a certain node name
  var allURLS = results.childrenNamed('url');

  // The result is an array of <url> XmlElement instances
  console.log('Found %s urls objects.', allURLS.length);


  // Check url in sitemap
  allURLS.forEach(function(urlInSitemap) {
  	var urlToCheck = urlInSitemap.firstChild.val;
    //console.log('Found url with loc \'%s\'', urlToCheck);

    checkUrl(urlToCheck);


  });

});