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

  try {
    console.log('initializing SDK...');//REMOVE

    const sdk = await init({debug: true});
    const {
      prefix = defaultPrefix,
      template = defaultTemplate,
      locale = defaultLocale
    } = sdk.params.instance;

    console.log('SDK initialized (index.js)');//REMOVE

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