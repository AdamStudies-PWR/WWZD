import React, { Component } from 'react';
import './App.css';

import Spinner from './componets/Spinner';

class App extends Component
{
    readonly SERVER_URI: string = "http://127.0.0.1:5000/";
    readonly LIST_DATA_REQ: string = "list_data";
    readonly GET_DATA_REQ: string = "get_data";

    datasetMap_ = new Map<string, string[]>();
    datasets_: string[] = ["Unknown"];
    selectedDataset_: string = "";
    selectedModel_: string = "";

    datasetSpinner_: React.RefObject<Spinner>;
    modelSpinner_: React.RefObject<Spinner>;

    constructor(props: any)
    {
        super(props);
        this.datasetSpinner_ = React.createRef();
        this.modelSpinner_ = React.createRef();
    }

    handleGetListResponse(response:any)
    {
        this.datasetMap_.clear();
        this.datasets_ = [];

        for (let item in response)
        {
            let key: string = item.toString();
            let values: string[] = response[key];
            this.datasetMap_.set(key, values);

            if (!this.datasets_.includes(key))
            {
                this.datasets_.push(key);
            }
        }

        if (this.selectedDataset_ === "")
        {
            this.selectedDataset_ = this.datasets_[0] ? this.datasets_[0] : "";
        }

        this.datasetSpinner_.current?.updateData(this.datasets_);
        this.modelSpinner_.current?.updateData(this.getModelData())
    }

    async getList()
    {
        const REQUEST_URI = this.SERVER_URI + this.LIST_DATA_REQ;
        fetch(REQUEST_URI)
            .then(response => response.json())
            .then((data) => this.handleGetListResponse(data))
            .catch((err) => { console.log(err.message)});
    }

    handleGetDataResponse(response: any)
    {
        console.log(response)
    }

    async getData()
    {
        const REQUEST_URI = this.SERVER_URI + this.GET_DATA_REQ;
        const json = JSON.stringify({dataset: this.selectedDataset_, model: this.selectedModel_})

        fetch(REQUEST_URI, {
            method: "post",
            body: json,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then((data) => this.handleGetDataResponse(data))
            .catch((err) => { console.log(err.message)});
    }

    getModelData() : string[]
    {
        const arr: any = this.datasetMap_.get(this.selectedDataset_);
        if (arr !== undefined)
        {
            this.selectedModel_ = arr[0];
            return arr;
        }
        else return [];
    }

    handleDatasetChanged(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.selectedDataset_ = event.target.value;
        this.modelSpinner_.current?.updateData(this.getModelData())
    }

    handleModelChanged(event: React.ChangeEvent<HTMLInputElement>)
    {
        this.selectedModel_ = event.target.value;
    }

    onRefreshData()
    {
        this.getList()
    }

    onGetData()
    {
        if (this.selectedModel_ === "") return;
        this.getData();
    }

    render(): React.ReactNode
    {
        this.getList();
        return (
            <div className='App'>
                <h1>News Room</h1>
                    <Spinner
                        ref={this.datasetSpinner_}
                        name={"Dataset"}
                        data={this.datasets_}
                        onChange={this.handleDatasetChanged.bind(this)}/>
                    <Spinner
                        ref={this.modelSpinner_}
                        name={"Model"}
                        data={this.getModelData()}
                        onChange={this.handleModelChanged.bind(this)}/>
                    <button onClick={this.onGetData.bind(this)}>Get Data</button>
                    <button onClick={this.onRefreshData.bind(this)}>Refresh</button>
            </div>);
    }
}

export default App;
