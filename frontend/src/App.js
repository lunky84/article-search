import React, { Component } from 'react';
import './App.css';

class App extends Component{

  state = { articles: [], searchTerm: '' }

  getSearchResults = () => {
    fetch(`/articles?q=${this.state.searchTerm}`)
      .then(res => res.json())
      .then(articles => this.setState({ articles }));
  }

  updateSearchTerm(evt) {
    this.setState({
      searchTerm: evt.target.value}, this.getSearchResults
    );
  }

  resetSearch = () =>  {
    this.setState({
      searchTerm: ''}, this.getSearchResults
    );
  }

  displayTitle(articleTitle) {
    return articleTitle[0].toUpperCase() + articleTitle.replaceAll('-', ' ').toLowerCase().slice(1, -4);
  }

  render(){
    return (
      <div className="App">

        <header>
          <div className="container">
            <h1>Article search</h1>
            <div className="search-form">
              <div className="search-icon"></div>
              <label className="visually-hidden" htmlFor="searchTerm">Article search term</label>
              <input type="text" placeholder="e.g. keyword, search term" id="searchTerm" value={this.state.searchTerm} onChange={evt => this.updateSearchTerm(evt)} />
              
              {this.state.searchTerm.length !== 0 &&
                <button className="reset-button" onClick={this.resetSearch}>
                  <span className="visually-hidden">Reset search</span>
                </button>
              }
            </div>            

            
          </div>
        </header>
        <main>

          <div className="container">

            {this.state.articles.length === 0 &&
                <div>Sorry, no suitable articles coud be found</div>
            }

            <ul className="articles">
              {this.state.articles.map(article =>
                <li key={article.id}>
                  <h2>{this.displayTitle(article.id)}</h2>
                  {article.content}
                </li>
                )}
            </ul>

          </div>

        </main>

      </div>
    );
  }
}

export default App;
