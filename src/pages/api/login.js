const querystring = require('querystring');

// redirect to /api/token to exchange authentication key for access token
const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;

export default function handler(req, res) {
  const scope =
    'user-read-private user-read-email user-library-read user-read-playback-state user-read-currently-playing user-top-read user-read-recently-played playlist-read-private';

  const queryString = querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    show_dialog: true
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
}
