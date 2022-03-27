const fs = require('fs')
const stopList = require('./data/stopwords_en.json')

const index = {};
const recipeDir = 'data/articles/'


const filenames = fs.readdirSync(recipeDir);

const isValidKeyword = (x) => {
    return x.length > 2 && /^[a-zA-Z]+$/.test(x) && !stopList.includes(x)
}

filenames.forEach(file => {
    const data = fs.readFileSync(recipeDir + file,
        {encoding:'utf8', flag:'r'});
    
    // Extract words to index from recipe content
    let words = data.split(" ")
                    .filter(x => isValidKeyword(x))
                    .map(x => x.toLowerCase());

    // Include words from file name and remove duplicates               
    words = [...new Set([...words, ...file.toLowerCase().slice(0, -4).split("-").filter(x => isValidKeyword(x))])];

    // Add words to index and add/append file names to ids array
    for (let i = 0; i < words.length; i++) {

        if (index.hasOwnProperty(words[i])) {
            if(!index[words[i]].includes(file)) {
                index[words[i]].push(file);
            }
        } else {
            index[words[i]] = [file];
        }
        
    }

})

fs.writeFile('data/index.json', JSON.stringify(index), err => {
  if (err) {
    console.error(err)
    return
  }
})

console.log("Index generated");
