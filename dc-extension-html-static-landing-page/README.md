# Gap Static HTML landing page UI Extension
## Overview
This extension is made for Pilot 1. 

It is using the Amplience HTML delivery (Handlebars templates stored in Content Hub) to render the content of the page in HTML and use the rendered HTML to put it back in a string field of the current content type.

## Usage
To use this extension, you can either register it in Amplience by pointing to the `index.html` file and then use the `name` attribute in the content type schema you are creating or use the `url` attribute directly.

You may pass the following parameters: 

1. `contentDeliveryPrrefix`: 	the prefix for the content delivery URL. Make sure you are using the **proper Hub name** in the prefix.  Defaults to `https://c1.adis.ws/v1/content/gaptest/content-item/`
2. `template`: The HTML template name to use (i.e handlebars). Defaults to `acc-template-static-landing-page`
3. `locale`: the locale for the content to render. Defaults to `,en-*,*`

Example:

```
"htmlEditor": {
	"title": "Static HTML output",
	"description": "",
	"type": "string",
	"ui:extension": {
		"url": "https://bounteous-inc.github.io/amplience-dc-static-lp-poc/",
		"params":{
			"contentDeliveryPrefix": "https://c1.adis.ws/v1/content/gaptest/content-item/",
			"template": "acc-template-static-landing-page",
			"locale": ",en-*,*"
		}
	}
}
```
		

*Note: This extension does not render anything for now. It is simply getting the current content ID being edited, then grabbing the rendered HTML from ythe delivery service, through the template chain, and then updating the `htmlEditor` field to the returned valuue.*