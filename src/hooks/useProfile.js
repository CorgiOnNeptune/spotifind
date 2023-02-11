import { useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from 'app/(context)';
import { SPOTIFY_BASE_URL } from 'public/constants/pathNames';
import { getHeaders, getTracks } from '../helpers/profileHelpers';

export default function useProfile() {
  const { credentials, profile, setProfile } = useGlobalContext();

  useEffect(() => {
    if (credentials.accessToken) {
      axios(`${SPOTIFY_BASE_URL}/me`, getHeaders(credentials.accessToken))
        .then(res => {
          const profileData = res.data;
          setProfile({
            ...profile,
            name: profileData.display_name,
            uri: profileData.uri,
            handle: `@${profileData.id}`,
            avatar: profileData.images[0].url
          });
        })
        .catch(err => console.log(err));
    }
  }, [credentials.accessToken]);

  useEffect(() => {
    if (credentials.accessToken) {
      axios(
        `${SPOTIFY_BASE_URL}/me/tracks`,
        getHeaders(credentials.accessToken)
      )
        .then(res => {
          setProfile(prev => ({
            ...prev,
            tracks: getTracks(res.data.items)
          }));
        })
        .catch(err => console.log(err));
    }
  }, [credentials.accessToken]);
}
