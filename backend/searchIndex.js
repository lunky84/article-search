var express = require('express');
const fs = require('fs');
const index = require('./data/index.json')

const searchIndex = (searchTerm) => {

  const articles = getArticles(searchTerm);
  const frequency = calculateFrequencies(articles);
  const uniqueArticles = removeDuplicates(articles);
  const orderedArticles = orderByFrequency(uniqueArticles, frequency);
  return orderedArticles.slice(0,10);
  
}

const getArticles = (searchTerm) => {
  const articles = [];
  searchTerm.replaceAll(",", "").split(" ").forEach(keyword => {

    if (index.hasOwnProperty(keyword)) {
      index[keyword].forEach(file => {
        const data = fs.readFileSync(
          'data/articles/' + file,
          {encoding:'utf8', flag:'r'}
        );
        articles.push({
            id: file,
            content: data
        });
      })
    }
    
  });
  return articles;
}

const calculateFrequencies = (articles) => {
  const frequency = {}
  articles.forEach(x => {
    frequency.hasOwnProperty(x.id) ? frequency[x.id] += 1 : frequency[x.id] = 1;
  });
  return frequency;
}

const removeDuplicates = (articles) => {
  const uniqueIds = [];
  return unique = articles.filter(element => {
    if (!uniqueIds.includes(element.id)) {
      uniqueIds.push(element.id);
      return true;
    }
  });
}

const orderByFrequency = (uniqueArticles, frequency) => {
  function compareFrequency(a, b) {
    return frequency[b.id] - frequency[a.id];
  }
  return uniqueArticles.sort(compareFrequency);
}


module.exports = {
    searchIndex,
    removeDuplicates
}