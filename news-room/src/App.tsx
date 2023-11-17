import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component
{
    readonly SERVER_URI: string = "http://127.0.0.1:5000/";
    readonly LIST_DATA_REQ: string = "list_data";
    readonly GET_DATA_REQ: string = "get_data";

    DATASET_MAP = new Map<string, string[]>();
    DATASETS: string[] = ["test", "test2", "test3"]

    handleGetListResponse(response:any)
    {
        this.DATASET_MAP.clear();

        for (let item in response.some)
        {
            let key: string = item.toString();
            let values: string[] = response.some[key];
            this.DATASET_MAP.set(key, values);

            if (!this.DATASETS.includes(key))
            {
                this.DATASETS.push(key)
            }
        }

        console.log(this.DATASETS)
    }

    async getList()
    {
        const REQUEST_URI = this.SERVER_URI + this.LIST_DATA_REQ;
        fetch(REQUEST_URI)
            .then(response => response.json())
            .then((data) => this.handleGetListResponse(data))
            .catch((err) => { console.log(err.message)});
    }

    render(): React.ReactNode
    {
        this.getList();
        return (
            <div className='App'>
                <h1>News Room</h1>
                <div>
                    <label>
                        Dataset: &nbsp;
                        <select>
                            {this.DATASETS.map((element) => (
                                <option value={element}> {element} </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>);
    }
}

export default App;
