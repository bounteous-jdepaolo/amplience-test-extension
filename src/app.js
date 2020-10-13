import React, { useState } from 'react';

export default props => {
  const { sdk } = props;
  const [fieldValue, setFieldValue] = useState('');
  const [isSynced, setIsSynced] = useState(false);

  /**
   * Update Field Value
   * @param {string} value 
   */
  const updateFieldValue = async (value) => {
    try {
      await sdk.field.setValue(value);
    } catch (err) {
      // The field value is not set to the new value, write a warning on the console
      console.log(err.message);
    }
  }

  /**
   * Set Current Value
   */
  const setCurrentValue = async () => {
    try {
      const savedValue = await sdk.field.getValue();
      if (typeof savedValue !== "undefined") {
        // do nothing but keep track of current value
        setFieldValue(savedValue);
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Assign Delivery ID
   */
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

  /**
   * Get Raw HTML
   * @param {string} prefix 
   * @param {string} deliveryId 
   * @param {string} template 
   * @param {string} locale 
   */
  const getRawHtmlFromDeliveryAPI = async (prefix, deliveryId, template, locale) => {
    console.log("fetch URL", `${prefix}${deliveryId}?template=${template}&locale=${locale}`);

    // @TODO: consolidate fetching errors with better Promise handling
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

  /**
   * Initialize Extension
   */
  const initializeExtension = async () =>  {
    try {
      const {
        contentDeliveryPrefix,
        template,
        locale
      } = sdk.params.instance;

      await setCurrentValue();
      const deliveryId = await assignCurrentDeliveryId();
      const htmlData = await getRawHtmlFromDeliveryAPI(contentDeliveryPrefix, deliveryId, template, locale);
      await updateFieldValue(htmlData);
      setIsSynced(true);

      // @TODO: Hiding the frame for now. 
      // This will basically always force updating the rendered HTML field
      // It will also force the "save" button to be active all the time as a side effect
      // Another side effect for now is that it will not display generic errors (i.e Extension init )
      sdk.frame.stopAutoResizer();
      sdk.frame.setHeight(30);
    } catch(err) {
      console.log(err);
    }
  }

  // Run
  initializeExtension();

  // @TODO: Placeholder for now
  return (
    <div>HTML Static Landing Page Extension Status: {isSynced ? 'synced' : 'not synced'}</div>
  );
}
