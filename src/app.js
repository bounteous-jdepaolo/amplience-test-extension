import React from 'react';

export default props => {
  const { sdk } = props;

  const setDeliveryId = async id => {
    const contentItem = await sdk.contentItem.getCurrent();
    console.log(contentItem);
  }

  const updateFieldValue = async (value) => {
    try {
      await this.sdk.field.setValue(value);
    } catch (err) {
      //The field value is not set to the new value, write a warning on the console
      console.log(err.message);
    }
  }

  const setCurrentValue = async () => {
    try {
      const savedValue = await this.sdk.field.getValue();
      if (typeof savedValue !== "undefined") {
        //do nothing but keep track of current value
        this.currentValue = savedValue;
      }
    } catch (err) {
      console.log(err);
    }
  }

  const assignCurrentDeliveryId = async () => {
    try {
      let contentItem = await this.sdk.contentItem.getCurrent();
      if (typeof contentItem !== "undefined") {
        return contentItem.deliveryId;
      }
    } catch (err) {
      console.log(err)
    }
  }

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

  return (
    <div>App loaded</div>
  );
}
