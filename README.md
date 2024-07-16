# schnogz-xyz
Andrew Schneider's personal [website](https://schnogz.xyz) built with Gatsby. See it live at [schnogz.xyz](https://schnogz.xyz)

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
- `yarn dev`
- Open `http://localhost:8000` in browser

### Pushing to AWS
This will only work for my setup. But feel free to set up the same way :)
- Push commit to `origin master` and AWS Amplify will do the rest
