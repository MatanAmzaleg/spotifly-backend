const axios = require("axios");
const DBService = require("../../db.service");
const shazamCoreService = require("../shazamCore/shazamCoreApi.service");
const musicMatchService = require("../musixMatch/musicsMatchApi.service");

// async function getSongById(songId) {
//   try {
//     var query = `SELECT * FROM bug  WHERE bug.name LIKE '%${namePart}%' OR bug.description LIKE '%${namePart}%'`;
//     const song = await DBService.runSQL(query);
//     return song;
//   } catch (err) {
//     console.log(err);
//   }
// }

async function getSongs(collectionName, searchTerm) {
  try {
    console.log(collectionName, searchTerm);
    let collection
    if(collectionName === 'SEARCH') {
      collection = await DBService.createCollection(`${searchTerm}`)}
    else{
      collection = await DBService.createCollection(`${collectionName}`);
    }
    let songs = await collection.find({}).toArray();
    if (songs.length > 0) {
      console.log("bringing from database");
      return songs;
    } else {
      switch (collectionName) {
        case "DISCOVER":
          songs = await shazamCoreService.fetchDiscover();
          if (!songs) return;
          await collection.insertMany(songs);
          break;
        case "AROUND_YOU":
          songs = await shazamCoreService.fetchLocalSongs();
          if (!songs) return;
          await collection.insertMany(songs);
          break;
        case "TOP_CHARTS":
          songs = await shazamCoreService.fetchTopCharts();
          if (!songs) return;
          await collection.insertMany(songs);
          break;
        case "SEARCH":
          console.log('hereeeeeeee');
          songs = await shazamCoreService.fetchSongsBySearchTerm(searchTerm);
          if (!songs) return;
          console.log(songs);
          await collection.insertMany(songs);
          break;
        default:
          songs = await shazamCoreService.fetchSongsByGenre(collectionName);
          if (!songs) return;
          await collection.insertMany(songs);
      }
      return songs;
    }
  } catch (err) {
    console.log("Failed to fetch discover songs", err);
  }
}
async function fetchLyrics(songName, songArtist) {
  try {
    const songLyrics = await musicMatchService.getSongLyrics(
      songName,
      songArtist
    );
    return songLyrics;
  } catch (err) {
    console.log("Failed to fetch song lyrics", err);
  }
}
async function getRelatedSongs(artist) {
  try {
    const collection = await DBService.createCollection(
      `${artist.toUpperCase()}`
    );
    let relatedSongs = await collection.find({}).toArray();
    if (relatedSongs.length > 0) {
      console.log("bringing from database");
      return relatedSongs;
    } else {
      relatedSongs = await shazamCoreService.getRelatedSongs(artist);
      await collection.insertMany(relatedSongs);
    }
    return relatedSongs;
  } catch (err) {
    console.log("Failed to fetch song lyrics", err);
  }
}

module.exports = {
  // getSongById,
  getSongs,
  fetchLyrics,
  getRelatedSongs,
};
