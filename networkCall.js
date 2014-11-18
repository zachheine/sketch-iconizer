// var defaults = [NSUserDefaults standardUserDefaults]
// var key = [defaults objectForKey:"NOUNPROJECT_API_KEY"];

var key = 'f81db995a0f44061a2a80cd71aef29d8';
var secret = 'fa6d22741dcd48998126b033f7eeef6d';

function getIcon() {

  log('Tight');

  var oauth = OAuth({
      consumerKey: key,
      consumerSecret: secret
  });

  var response = oauth.get("http://api.thenounproject.com/icon/6324/", success, failure);

  log(response);

  var encodedText = encodeURIComponent(iconData.text);

  var base = 'http://api.thenounproject.com/icons/';

  var urlString = base + encodedText;

  var theUrl = [NSURL URLWithString:urlString];

  var theRequest = NSMutableURLRequest.requestWithURL_cachePolicy_timeoutInterval(theUrl, NSURLRequestReloadIgnoringLocalCacheData, 60);
  theRequest.setHTTPMethod_("GET");

  var theResponse = null, theResponseData = [NSURLConnection sendSynchronousRequest:theRequest returningResponse:nil error:nil];

  if (theResponseData!=nil) {

    theText = [[NSString alloc] initWithData:theResponseData encoding:NSUTF8StringEncoding];

    log(theText);

    var parsed = JSON.parse(theText);
    if (parsed.error) {
      var app = [NSApplication sharedApplication];
      [app displayDialog:"Please try re-entering it using the dropdown menu" withTitle:"Invalid key"];
      return;
    } else {
      translation = parsed.data.translations[0].translatedText;
    }
  }

  return translation;
}