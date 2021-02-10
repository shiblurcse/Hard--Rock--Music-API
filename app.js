const searchSongs = () =>{
    const searchText = document.getElementById('search-field').value 
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySong(data.data))
    // for catch error 
    .catch(error => findError('Something went wrong. Please try again later!!!'))
}

// using of async and await function 

// const searchSongs = async() =>{
//     const searchText = document.getElementById('search-field').value 
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     const res = await fetch(url)
//     const data = await res.json()
//     displaySong(data.data)
// }

const displaySong = songs => {
    const songsContainer = document.getElementById('search-song')
    songsContainer.innerHTML = ''
    songs.forEach(song => {
        console.log(song)
        const songsDiv = document.createElement('div')
        songsDiv.className = 'single-result row align-items-center my-3 p-3'
        songsDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
         <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
         </div>
         <audio controls src="${song.preview}">
         </audio>
        `
        songsContainer.appendChild(songsDiv)
    });
}

// normally using fetch .then 

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
// }

// using of async and await function 

// const getLyric = async(artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     const res = await fetch(url)
//     const data = await res.json()
//     displayLyrics(data.lyrics)
// }

const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    // catch error for async await function 
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics)
    }
    catch (error){
        findError('Something went wrong. Please try again later!!!')
    }
}

const displayLyrics = lyrics => {
    const songLyrics = document.getElementById('song-lyrics')
    songLyrics.innerText = lyrics
}

const findError = error => {
    const songError = document.getElementById('song-error')
    songError.innerText = error
}