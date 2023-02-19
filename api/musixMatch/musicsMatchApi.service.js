const axios = require('axios');
const apiKey = process.env.MUSIC_MATCH_KEY
console.log(apiKey);
module.exports = {
    getSongLyrics
}

async function getSongLyrics(songName, songArtist) {
    try {
      const response = await axios.get(`https://api.musixmatch.com/ws/1.1/track.search?q_track=${songName}&q_artist=${songArtist}&apikey=${apiKey}`);
      const songId =  response.data.message.body.track_list[0].track.track_id;
      console.log("songId", songId);
    const response2 = await axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${songId}&apikey=${apiKey}`)
    const lyrics =  response2.data.message.body.lyrics.lyrics_body;
    return lyrics

    } catch (err) {
      console.log(err, "failed to fetch songId from musicsMatch servers");
    }
  }