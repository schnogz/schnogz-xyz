# schnogz-dot-com
Andrew Schneider's personal [website](https://schnogz.com) built with Gatsby. See it live at [schnogz.com](https://schnogz.com)

### Setup
- Install dependencies via `yarn`

If you would like to use LastFM section, get an API key and then create `src/config/lastFM.js` that exports the following:

```
const LastFm = {
  apiKey: 'yourApiKey',
  name: 'yourUserName',
}

export default LastFm
```

### Developing
- `yarn develop`
- Open `http://localhost:8000` in browser

### Pushing to AWS
- Push commit to `origin master` and AWS Amplify will do the rest
