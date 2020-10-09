import { init } from 'dc-extensions-sdk';

import React from 'react';
import { render } from 'react-dom';
import App from './app';

// Default Values
const defaultPrefix = 'https://c1.adis.ws/v1/content/gaptest/content-item/';
const defaultTemplate = 'acc-template-static-landing-page';
const defaultLocale = ',en-*,*';

const errorText = 'Failed to initialize the Static Landing Page Extension';

// Run
(async function buildStaticLandingPageUI() {
  // console.log(process.env.NODE_ENV);//REMOVE
  // console.log('refresh/');//REMOVE

  try {
    const sdk = await init({debug: true});
    console.log('init?');//REMOVE
    const {
      prefix = defaultPrefix,
      template = defaultTemplate,
      locale = defaultLocale
    } = sdk.params.instance;

    render(
      <App
        sdk={sdk}
      />,
      document.getElementById('staticLandingPageApp')
    );
  } catch (e) {
    console.error(e);
    render(<div>{errorText}</div>);
  }
})()