import React from 'react'

const SITE_URL = 'https://schnogz.xyz'
const OG_IMAGE_URL = 'https://www.schnogz.xyz/static/profile.jpeg'
const DEFAULT_TITLE = 'schnogz.xyz'
const DEFAULT_DESCRIPTION = 'schnogz.xyz portfolio site'

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  image: OG_IMAGE_URL,
  jobTitle: 'Web(3) Developer',
  name: 'Andrew Schneider',
  sameAs: [
    'https://github.com/schnogz',
    'https://www.linkedin.com/in/andrewmarkschneider/',
    'https://blog.schnogz.xyz',
  ],
  url: SITE_URL,
}

type HeadProps = {
  description?: string
  includePersonSchema?: boolean
  title?: string
}

const Head = ({
  description = DEFAULT_DESCRIPTION,
  includePersonSchema = false,
  title = DEFAULT_TITLE,
}: HeadProps) => (
  <>
    <html lang='en' />
    <title>{title}</title>
    <meta name='description' content={description} />
    <meta
      name='keywords'
      content='code, coding, javascript, ux, ui, react, node, app, photography, blog'
    />

    {/* OpenGraph */}
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />
    <meta property='og:type' content='website' />
    <meta property='og:url' content={SITE_URL} />
    <meta property='og:image' content={OG_IMAGE_URL} />
    <meta property='og:image:width' content='280' />
    <meta property='og:image:height' content='278' />

    {/* Twitter (using `summary` since the og:image is square-ish, not 1200x630) */}
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:title' content={title} />
    <meta name='twitter:description' content={description} />
    <meta name='twitter:image' content={OG_IMAGE_URL} />

    {/* favicons */}
    <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
    <link rel='manifest' href='/site.webmanifest' />
    <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
    <meta name='msapplication-TileColor' content='#da532c' />
    <meta name='theme-color' content='#ffffff' />

    {includePersonSchema && (
      <script type='application/ld+json'>{JSON.stringify(PERSON_SCHEMA)}</script>
    )}
  </>
)

export default Head
