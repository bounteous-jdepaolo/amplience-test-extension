import React from 'react';

export default props => {
  const { sdk } = props;
  let currentValue = '';

  // Set Delivery ID
  const setDeliveryId = async id => {
    const contentItem = await sdk.contentItem.getCurrent();
    console.log(contentItem);
  }

  // Update Field Value
  const updateFieldValue = async (value) => {
    try {
      await sdk.field.setValue(value);
    } catch (err) {
      //The field value is not set to the new value, write a warning on the console
      console.log(err.message);
    }
  }

  // Set Current Value
  const setCurrentValue = async () => {
    try {
      const savedValue = await sdk.field.getValue();
      if (typeof savedValue !== "undefined") {
        //do nothing but keep track of current value
        currentValue = savedValue;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Assign Delivery ID
  const assignCurrentDeliveryId = async () => {
    try {
      let contentItem = await sdk.contentItem.getCurrent();
      if (typeof contentItem !== "undefined") {
        return contentItem.deliveryId;
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Get Raw HTML
  const getRawHtmlFromDeliveryAPI = async (prefix, deliveryId, template, locale) => {
    console.log("fetch URL", `${prefix}${deliveryId}?template=${template}&locale=${locale}`);
    //TODO: consolidate fetching errors with better Promise handling
    let response = await (await (fetch(`${prefix}${deliveryId}?template=${template}&locale=${locale}`)
      .then(data => {
        return data.text()
      })
      .catch(err => {
        console.log('Error: ', err)
      })
    ))
    return response
  }

  // Run
  const init = async () => {
    try {
      const {
        prefix = defaultPrefix,
        template = defaultTemplate,
        locale = defaultLocale
      } = sdk.params.instance;

      await setCurrentValue();
      const deliveryId = await assignCurrentDeliveryId();
      const htmlData = await getRawHtmlFromDeliveryAPI(prefix, deliveryId, template, locale);
      await updateFieldValue(htmlData);
    } catch(err) {
      console.log(err)
    }


    this.setCurrentValue()
    .then(() => { 
      //Get the deliveryId of teh current page contentType
      this.assignCurrentDeliveryId()
      .then(deliveryId => {
        //Call teh Delivery API to get the rendered HTML content
        this.getRawHtmlFromDeliveryAPI(prefix, deliveryId, template, locale)
        .then(data => {
            //Assign HTML generated value
            this.updateFieldValue(data);
        });
      })
    })
    .finally(() => {
      //Hiding the frame for now. 
      //This will basically always force updating the rendered hHTML field
      //It will also force the "save" button to be active all the time as a side effect
      // Another side effect for now is that it will not display generic errors (i.e Extension init )
      sdk.frame.stopAutoResizer();
      sdk.frame.setHeight(0);
    })
  }

  init();
  return (
    <div>App loaded</div>
  );
}
