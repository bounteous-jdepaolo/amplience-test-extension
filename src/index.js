//import { init } from 'dc-extensions-sdk';

// (async function buildStaticLandingPageUI() {
//     try {
//       const sdk = await init()
//       sdk.frame.setHeight(300);
//       const { brand = 'gap', market = 'us', country = 'us'} = sdk.params.instance;
//     } catch (e) {
//       console.error(e)
//     }
// })()

class Extension {
  constructor(sdk) {
    this.sdk = sdk;

    this.currentValue = 0;

    this.slider = document.querySelector(".slider_input");
    this.inputValue = document.querySelector(".input_value");

    this.setCurrentValue()
        .finally(() => {
          this.initializeInput();
          this.sdk.frame.startAutoResizer();
        })
  }

  async updateFieldValue(value) {
    try {
      await this.sdk.field.setValue(parseInt(value, 10));
    } catch (err) {
      // the field value is not set to the new value, write a warning on the console
      console.log(err.message);
    }
  }

  async setCurrentValue() {
    try {
      const savedValue = await this.sdk.field.getValue();

      if (typeof savedValue !== "undefined") {
        this.currentValue = parseInt(savedValue, 10);
      }
    } catch (err) {
      console.log(err);
    }
  }

  initializeInput() {
    const { min = 0, max = 10, value = 0 } = this.sdk.params.instance;

    Object.assign(this.slider, {
      min,
      max,
      value
    });

   // set the slider value to the saved value if the content item has been previously saved 
   if (this.currentValue != 0) 
       this.slider.value = this.currentValue;

    // get the label to show the current slider value
    this.inputValue.innerHTML = this.slider.value;
    this.slider.onchange = event => this.onInputChange(event);

   }


  onInputChange({ target: { value } }) {
    this.inputValue.innerHTML = value;
    this.updateFieldValue(value);
  }

}


(async function  () {
try {
  console.log('test extension');//REMOVE
  new Extension(await dcExtensionsSdk.init())
} catch (e) {
  document.body.innerHTML = 'Failed to connect'
}
})()