import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = { url: '', keyword: '', data: [] };
    }

    fetchData = () => {
        // fetch the rest data
        const url =`https://api.github.com/search/repositories?q=${this.state.keyword}`;
        this.setState({url : url})
        fetch(url)
        .then(response => response.json())
        .then(responseData => {
            this.setState({data : responseData.items });
        });
    }

    handleChange = (event) => {
        console.error(event);
        this.setState( {keyword: event.target.value} );
    }

  render() {

        const tableRows = this.state.data.map((item, index) =>
                <tr key={index}><td>{item.full_name}</td>
                <td><a href={item.html_url}>{item.html_url}</a></td></tr>
            );

    return (
        <div className="App">
         <input type="text" name="url" value={this.state.url}  size="120"/> <br />
         <input type="text" onChange={this.handleChange} />

         <button onClick={this.fetchData} value={this.state.keyword}>Fetch</button>
         <table><tbody>{tableRows}</tbody></table>
        </div>
    );
  }

}

export default App;
