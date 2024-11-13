Assessment
========================================

## Overview

The goal of this assessment is to evaluate not only your React and Typescript experience, but also your fronted design UI/UX abilities and the quality of code that you write. There are detailed instructions included on what's required for the assessment (e.g. specific NPM packages to use, etc.) but you have creative freedom in all other areas as long as the requirements are met.

The assessment involves creating a data analytics dashboard which is used to display data from an API using charts as well as a table of data. The dashboard must also support adding new data to the table. The complete instructions for the assessment are provided below.

All requirements and instructions for the assessment should be self-explanatory, if there is anything that you're uncertain of then attempt to complete it using your best judgement and ensuring that the requirements are being met.


## Requirements

1. Your solution must be implemented using Typescript and React. You may use whatever tools you prefer (e.g. yarn) for installing packages and running your application.

2. Your project must use the react-bootstrap NPM package, you may install any other supporting packages you like such as for additional styling, but your React components must all be implemented using react-bootstrap.

3. You must use the echarts NPM package for any charts or other analytics displayed.

4. You must use the ag-grid-react (as well ag-grid-community) NPM packages for displaying the tables for data.

5. For displaying localized times in the dashboard you may use an NPM package such as luxon or moment.

6. The assessment is purely a React/Typescript frontend application, your project should not have a backend, database (even external such as Firebase) in order to function, it should be completely functional just running in the browser.

7. After you've completed the assessment include a brief README.md that explains how to install the dependencies and run your application. You may assume that applications such as npm, yarn, etc. are already installed, simply provide the instructions specific to running your application.

8. As you are working on the project ensure that you are using git. You do not need to create branches, but need to demonstrate that you have experience with git.

9. Finally, create a brief video using Loom (or an equivalent tool) sharing a screen recording demonstrating your application and showing all of the functionality that you've implemented in the dashboard.


## Submission Instructions

1. Clone this private repository locally.

2. You may either create your git repo and push your changes to your own repo or keep all your git commits local.

3. Once you've completed the assessment either push your changes to your own git repo or create a zip file of your assessment.

4. Share with us a link to your git repo or a zip file of your assessment, if submitting a zip file make sure to archive the whole folder, which includes your git history.

5. Share with us a link to a short screen recording (Loom, etc.) demonstrating your completed assessment.


## Assessment Instructions

1. You will be creating a simple dashboard for data analytics and analysis. The dashboard will fetch data from external APIs which will have instructions provided below. Your dashboard must have components implemented using the react-bootstrap NPM package as outlined in the requirements.

2. Your dashboard needs to contain a time-series chart, this must be implemented using the echarts NPM package. The following API endpoint must be used to fetch the historical Bitcoin price at 1d intervals for the past 30 days: https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=30
    - The data is returned in an array format to reduce the payload size of having key/values
    - The first array entry is the time (epoch)
    - The fifth entry is the close price
    - You need to plot time as the x-axis and the close price on the y-axis
    - See the following for more details: https://developers.binance.com/docs/binance-spot-api-docs/rest-api/public-api-endpoints#klinecandlestick-data

3. Your dashboard needs to contain a second chart using echarts. This time the chart is a scatterplot to analyze the trend between daily Bitcoin volume and the percent difference between the high and low price.
    - See the following echarts examples for scatterplot ideas to visualize your data: https://echarts.apache.org/examples/en/index.html
    - The following API request will fetch the daily Bitcoin data for the past six months: https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=180
    - Use a scatterplot and plot on the x-axis the volume and on the y-axis the percentage difference between the high and low price

4. Your dashboard needs to have a table to display data that is fetched from an API. However, we want to only fetch this data once (on initial page load) and then store the results in our browser's storage and manipulate it there without making further requests to the API.
    - Use the following API to return fake data, you must use this exact API request so that you have the expected data names and types returned: https://fakerapi.it/api/v2/custom?_quantity=10&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text
    - This data should only be fetched once on page load or if you trigger a data reset manually
    - You must use the ag-grid-react NPM package to display this data

5. Now that you have data being displayed in your ag-grid table the next step is to add support for adding new data directly to this existing data in the browser's storage. Add a button for adding new data "Add Entry" and add support for a form where a new entry can be added. Your form must have all of the following supported:
    - Each of the fields for the table with the correct types for each field
    - All form fields are required except notes (which can be at the end of the form)
    - You must have thorough validation for all applicable form fields. For example employees must be a number, last contacted should have an easy to use datepicker, zipcode must have validation to ensure it's a valid USA zip code format only (both short and long zipcode formats), website should be a valid url, etc.
    - You may use NPM packages to assist with the form validation

6. There's one twist, when adding a new entry we want to instead have it update an existing entry instead if any 5 of the form fields except for last contacted and notes (they can be exluded) are the same. You must implement your own algorithm that after adding a new entry will first check if any 5 of the form fields (exlcuding last contacted and notes) match an existing entry, if so then the existing entry is updated and overwritten with all of the data entered in the form.

For added clarity, suppose the following is the JSON representation of a new entry that is to be added:

```json
{
    "city": "Port Porter",
    "company": "Schmidt-Shanahan",
    "country": "Tanzania",
    "employees": 1,
    "existing_customer": false,
    "last_contacted": "1996-03-27",
    "notes": "Long Tale They were just beginning to feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be of very little use without my shoulders. Oh, how I wish you could draw.",
    "revenue": 584261889,
    "sales_rep": "Icie",
    "state": "Virginia",
    "website": "beer.com",
    "zipcode": "29114"
}
```

If at least 5 of these fields such as city, sales_rep, state, website, zipcode match an existing entry then the entire contents of this new entry should instead update the existing entry.


7. After submitting the form and either adding a new entry or updating an existing entry when returning to the main dashboard page the changes should automatically be updated in the ag-grid table.

8. For convenience when implementing your solution you can add support (e.g. a button) to reset the browser storage and reload the table data from the API. The data is expected to persist across a hard page reload.


## Tips

1. Demonstrating excellent frontend design and UI/UX. Using different libraries for charts, tables, etc. it can be difficult to have a cohesive UI. Ensuring that everything appears cohesive and taking time to do additional syling to ensure that the frontend looks polished will make your assessment stand out.

2. Quality of code, we will be evaluating the quality of your code, not just in terms of the organization of code but also the creativeness and elegance of your solutions.

3. Keep it simple, this task is meant to be straightforward, you should be able to complete it with the required NPM packages and any other supporting packages you choose to use without having to use advanced package features.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
