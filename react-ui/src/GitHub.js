import ReactTable from "react-table";
import 'react-table/react-table.css'
import React, { Component } from 'react';
import './GitHub.css';

class GitHub extends Component {

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

        const columns = [
            {
                Header: 'Name', // header of the column
                accessor: 'full_name' // value in the column
            },
            {
                Header: 'URL',
                accessor: 'html_url'
            },
            {
                Header: 'Owner', // header of the column
                accessor: 'owner.login' // value in the column
            }
        ]

    return (
        <div className="GitHub">

         <input type="text" name="url" value={this.state.url}  size="120"/> <br />
         <input type="text" onChange={this.handleChange} />

         <button onClick={this.fetchData} value={this.state.keyword}>Fetch</button>
         <ReactTable
            data={this.state.data}
            columns={columns}
            />
        </div>
    );
  }

}

export default GitHub;
