const axios = require("axios");

const apiKey = process.env.X_RAPID_API_KEY
console.log(apiKey);


module.exports = {
  fetchDiscover,
  getRelatedSongs,
  fetchLocalSongs,
  fetchSongsByGenre,
  fetchTopCharts,
  fetchSongsBySearchTerm
  // fetchSongs
};

async function fetchDiscover() {
  try {
    const options = {
      method: "GET",
      url: "https://shazam-core.p.rapidapi.com/v1/charts/world",
      headers: {
        "X-RapidAPI-Key": `${apiKey}`,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);

    const newSongs = response.data.map((song) => {
      return {
        artists: song.artists,
        hub: song.hub,
        images: song.images,
        key: song.key,
        subtitle: song.subtitle,
        title: song.title,
        url: song.url,
      };
    });

    const filteredSongs = newSongs.filter((song) => {
        return (song.hub.actions)
    });
    return filteredSongs;
  } catch (err) {
    console.log("failed to fetch discover songs", err);
  }
}


async function getRelatedSongs(artist){
  try{
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v1/search/multi',
      params: {query: `${artist}`, search_type: 'SONGS_ARTISTS'},
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);

    const relatedSongs = response.data.tracks.hits.map(song => {
      return{
        artists: song.track.artists,
        hub: song.track.hub,
        images: song.track.images,
        key: song.track.key,
        subtitle: song.track.subtitle,
        title: song.track.title,
        url: song.track.url,
      }
    })
    return relatedSongs
  }catch(err){
    console.log(err, "failed to fetch related songs");
  }
}
async function fetchLocalSongs(){
  try{
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v1/charts/country',
      params: {country_code: 'IL'},
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);

    const relatedSongs = response.data.map(song => {
      return{
        artists: song.artists,
        hub: song.hub,
        images: song.images,
        key: song.key,
        subtitle: song.subtitle,
        title: song.title,
        url: song.url,
      }
    })
    return relatedSongs
  }catch(err){
    console.log(err, "failed to fetch local songs");
  }
}



async function fetchSongsByGenre(collectionName){
  try{
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v1/charts/genre-world',
      params: {genre_code: `${collectionName}`},
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);

    console.log(response.data);

    const relatedSongs = response.data.map(song => {
      return{
        artists: song.artists,
        hub: song.hub,
        images: song.images,
        key: song.key,
        subtitle: song.subtitle,
        title: song.title,
        url: song.url,
      }
    })
    return relatedSongs
  }catch(err){
    console.log(err, "failed to fetch songs by genre");
  }
}
async function fetchTopCharts(){
  try{
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);

    console.log(response.data);

    const relatedSongs = response.data.map(song => {
      return{
        artists: song.artists,
        hub: song.hub,
        images: song.images,
        key: song.key,
        subtitle: song.subtitle,
        title: song.title,
        url: song.url,
      }
    })
    return response.data
  }catch(err){
    console.log(err, "failed to fetch top songs");
  }
}
async function fetchSongsBySearchTerm(searchTerm){
  try{
    const options = {
      method: 'GET',
      url: 'https://shazam-core.p.rapidapi.com/v1/search/multi',
      params: {query: `${searchTerm}`, search_type: 'SONGS'},
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);

    console.log(response.data.tracks.hits);

    const relatedSongs = response.data.tracks.hits.map(song => {
      return{
        artists: song.track.artists,
        hub: song.track.hub,
        images: song.track.images,
        key: song.track.key,
        subtitle: song.track.subtitle,
        title: song.track.title,
        url: song.track.url,
      }
    })
    return relatedSongs.slice(0,10)
  }catch(err){
    console.log(err, "failed to fetch songs by term search");
  }
}

