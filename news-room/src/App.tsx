import React, { Component } from 'react';
import './App.css';

import Spinner from './componets/Spinner';
import PlotWrapper from './componets/PlotWrapper';

class App extends Component {
	readonly SERVER_URI: string = 'http://127.0.0.1:5000/';
	readonly LIST_DATA_REQ: string = 'list_data';
	readonly GET_DATA_REQ: string = 'get_data';

	datasetMap_ = new Map<string, string[]>();
	datasets_: string[] = [ 'Unknown' ];
	selectedDataset_: string = '';
	selectedModel_: string = '';

	datasetSpinner_: React.RefObject<Spinner>;
	modelSpinner_: React.RefObject<Spinner>;
	plotWrapper_: React.RefObject<PlotWrapper>;

	constructor(props: any) {
		super(props);
		this.datasetSpinner_ = React.createRef();
		this.modelSpinner_ = React.createRef();
		this.plotWrapper_ = React.createRef();
	}

	handleGetListResponse(response: any) {
		this.datasetMap_.clear();
		this.datasets_ = [];

		for (let item in response) {
			let key: string = item.toString();
			let values: string[] = response[key];
			this.datasetMap_.set(key, values);

			if (!this.datasets_.includes(key)) {
				this.datasets_.push(key);
			}
		}

		if (this.selectedDataset_ === '') {
			this.selectedDataset_ = this.datasets_[0] ? this.datasets_[0] : '';
		}

		if (this.datasetSpinner_.current) this.datasetSpinner_.current.updateData(this.datasets_); // Tu był znak zapytania
		if (this.modelSpinner_.current) this.modelSpinner_.current.updateData(this.getModelData()); // Tu był też znak zapytania
	}

	async getList() {
		const REQUEST_URI = this.SERVER_URI + this.LIST_DATA_REQ;
		fetch(REQUEST_URI)
			.then((response) => response.json())
			.then((data) => this.handleGetListResponse(data))
			.catch((err) => {
				console.log(err.message);
			});
	}

	handleGetDataResponse(response: any) {
		let title = this.selectedDataset_ + ': ' + this.selectedModel_;
		let x: number[] = Object.values(response.x);
		let y: number[] = Object.values(response.y);
		let date: string[] = 'date' in response ? Object.values(response.date) : [];
		let label: string[] = 'label' in response ? Object.values(response.label) : [];
		let titles: string[] = 'title' in response ? Object.values(response.title) : [];

		if (this.plotWrapper_.current) this.plotWrapper_.current.updatePlot(title, x, y, titles, label, date); // Tu był znak zapyatnia
	}

	async getData() {
		const REQUEST_URI = this.SERVER_URI + this.GET_DATA_REQ;
		const json = JSON.stringify({ dataset: this.selectedDataset_, model: this.selectedModel_ });

		fetch(REQUEST_URI, {
			method: 'post',
			body: json,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => this.handleGetDataResponse(data))
			.catch((err) => {
				console.log(err.message);
			});
	}

	getModelData(): string[] {
		const arr: any = this.datasetMap_.get(this.selectedDataset_);
		if (arr !== undefined) {
			this.selectedModel_ = arr[0];
			return arr;
		} else return [];
	}

	handleDatasetChanged(event: React.ChangeEvent<HTMLInputElement>) {
		this.selectedDataset_ = event.target.value;
		if (this.modelSpinner_.current) this.modelSpinner_.current.updateData(this.getModelData()); // Znak zapytania
	}

	handleModelChanged(event: React.ChangeEvent<HTMLInputElement>) {
		this.selectedModel_ = event.target.value;
	}

	onRefreshData() {
		this.getList();
	}

	onGetData() {
		if (this.selectedModel_ === '') return;
		this.getData();
	}

	render(): React.ReactNode {
		this.getList();
		return (
			<div className="App">
				<div className="container">
					<h1>News Room</h1>
					<div className="filter-container">
						<Spinner
							ref={this.datasetSpinner_}
							name={'Dataset'}
							data={this.datasets_}
							onChange={this.handleDatasetChanged.bind(this)}
						/>
						<Spinner
							ref={this.modelSpinner_}
							name={'Model'}
							data={this.getModelData()}
							onChange={this.handleModelChanged.bind(this)}
						/>
						<button className="btn--primary" onClick={this.onGetData.bind(this)}>
							Display Data
						</button>
						<button className="btn--primary" onClick={this.onRefreshData.bind(this)}>
							Refresh
						</button>
					</div>

					<PlotWrapper ref={this.plotWrapper_} />
				</div>
			</div>
		);
	}
}

export default App;
