const songService = require('./song.service') 
const mongoose = require('mongoose');


async function getSong(req,res){
    try{
        const songId = req.query.songId
        const song = await songService.getSongById(songId)
        res.json(song)
    }catch(err){
        res.status(500).send({ err: 'Failed to get song' })
    }
}
async function getSongs(req,res){
    try{
        let searchTerm = req.query.searchTerm
        let collectionName = req.query.collectionName
        if(!collectionName) collectionName = 'DISCOVER'
        const songs = await songService.getSongs(collectionName, searchTerm)
        res.json(songs)
    }catch(err){
        console.log(err)
        res.status(500).send({ err: 'Failed to add songs' })
    }
}
async function fetchLyrics(req,res){
    try{
        const songName = req.query.songName;
        const songArtist = req.query.songArtist.replace(/-/g, ' ')
        console.log(songArtist);
        const lyrics = await songService.fetchLyrics(songName, songArtist)
        res.json(lyrics)
    }catch(err){
        console.log(err)
        res.status(500).send({ err: 'Failed to fetch lyrics' })
    }
}
async function fetchRelatedSongs(req,res){
    try{
        let artist = req.query.query.replace(/-/g, ' ')
        const commaIndex = artist.indexOf(',');
        if(commaIndex !== -1 ) artist = artist.slice(0, commaIndex);
        const relatedSongs = await songService.getRelatedSongs(artist)
        res.json(relatedSongs)
    }catch(err){
        console.log(err)
        res.status(500).send({ err: 'Failed to fetch Related Songs' })
    }
}
// async function getSongs(req,res){
//     try{
//         const collectionName = req.query.collectionName
//         const songs = JSON.parse(req.query.songs)
//         console.log(songs)
//         const newSongs = songs.map(song => {
//             return{
//                 artists: JSON.stringify(song.artists) ,
//                 hub: JSON.stringify(song.hub),
//                 images: JSON.stringify(song.images) ,
//                 key: song.key ,
//                 subtitle: song.subtitle ,
//                 title: song.title ,
//                 url: song.url 
//             }
//         })
//         console.log("newSongs", newSongs)
//         const songsArr = await songService.getDiscoverSongs(collectionName,newSongs)
//         res.json(songsArr)
//     }catch(err){
//         console.log(err)
//         res.status(500).send({ err: 'Failed to add songs' })
//     }
// }



module.exports = {
    getSong,
    getSongs,
    fetchLyrics,
    fetchRelatedSongs
  }

