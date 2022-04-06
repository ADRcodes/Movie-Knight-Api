const genreKey = {
    "1": "Biography",
    "2": "Film Noir",
    "3": "Game Show",
    "4": "Musical",
    "5": "Sport",
    "6": "Short",
    "7": "Adult",
    "12": "Adventure",
    "14": "Fantasy",
    "16": "Animation",
    "18": "Drama",
    "27": "Horror",
    "28": "Action",
    "35": "Comedy",
    "36": "History",
    "37": "Western",
    "53": "Thriller",
    "80": "Crime",
    "99": "Documentary",
    "878": "Science Fiction",
    "9648": "Mystery",
    "10402": "Music",
    "10749": "Romance",
    "10751": "Family",
    "10752": "War",
    "10763": "News",
    "10764": "Reality",
    "10767": "Talk Show"
}

const genreConvert = (genre) => {
    let realGenre = genreKey[genre]
    return realGenre
}

// function decodeMorse(string) {
//     let words = string.split('   ');
//     let final = [];

//     for (let i = 0; i < words.length; i++) {
//         let characters = words[i].split(' ');
//         for (let j = 0; j < characters.length; j++) {
//             characters[j] = MORSE_CODE[characters[j]]
//         }
//         let word = characters.join('')
//         final.push(word);
//     }
//     return final.join(' ')
// }

// console.log(decodeMorse('.... . -.--   .--- ..- -.. .'))

module.exports = genreConvert