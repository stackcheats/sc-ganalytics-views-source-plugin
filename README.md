# Google Analytics Page Views

A Gatsby source plugin to retrieve page views from Google Analytics for StackCheats. Please find the plugin configurations and docs below

[:construction: Development in progress]

## Configure

Add the following plugin configuration in `gatsby-config.js` to activate the plugin

```js
{
    resolve: `sc-ga-views`,
    options: {
        email: process.env.GA_SERVICE_ACCOUNT_MAIL,
        viewId: process.env.GA_VIEW_ID,
        keyFile: `<path to secrets (JSON | P12)>`,
    }
}
```

To communicate with Google Analytics, a service account is required. Once the Service Account is successfully created and the Google Analytics API is enabled, fill the plugin configurations with the following

```sh
email       Service Account email
viewId      Google Analytics View ID
keyFile     Secrets Key file generated for Service Account (JSON | P12)
```

## Usage

Following GraphQL can be used to retrieve the page views

```graphql
allSheetViews(filter: {slug: {eq: $slug } }) {
    edges {
        node {
            slug
            count
        }
    }
}
```

```graphql
sheetViews(slug: {eq: $slug }) {
    count
}
```

## License

[MIT](LICENSE)
