const { google } = require('googleapis')

exports.sourceNodes = async (
  { actions, createContentDigest },
  pluginOptions
) => {
  const { createNode } = actions
  const { email, keyFile, viewId, startDate } = pluginOptions

  const scopes = [`https://www.googleapis.com/auth/analytics.readonly`]
  const jwt = new google.auth.JWT(email, keyFile, null, scopes)
  await jwt.authorize()

  const views = await google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    'start-date': startDate || '2019-01-01',
    'end-date': 'today',
    dimensions: 'ga:pagePath',
    metrics: 'ga:pageViews',
    sort: '-ga:pageViews',
  })

  for (let [path, count] of views.data.rows) {
    createNode({
      id: path,
      slug: path,
      count: Number(count),
      internal: {
        type: `SheetViews`,
        mediaType: `text/plain`,
        contentDigest: createContentDigest(JSON.stringify({ path, count })),
      },
    })
  }
}
