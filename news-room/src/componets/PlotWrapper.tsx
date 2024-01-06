import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import SelectedItems from './SelectedItems';

class PlotWrapper extends Component<
	any,
	{
		title: string;
		x: number[];
		y: number[];
		labels: string[];
		sources: string[];
		hoverData: string[];
		width: number;
		height: number;
		getSnipet: any;
		selectedItems: any[];
	}
> {
	constructor(props: any) {
		super(props);
		this.state = {
			title: 'No data',
			hoverData: [],
			labels: [],
			sources: [],
			x: [],
			y: [],
			width: props.width ? props.width : 1600,
			height: props.height ? props.height : 1200,
			getSnipet: props.getSnipet,
			selectedItems: []
		};
	}

	getHoverData(
		titles: string[],
		dates: string[],
		labels: string[],
		links: string[],
		filenames: string[],
		tags: string[]
	): string[] {
		if (titles.length !== dates.length) return [];

		let temp: string[] = [];
		titles.forEach((title, index) => {
			const date = dates[index];
			const label = labels[index];
			const link = links[index];
			const filename = filenames[index];
			const tag = tags[index];
			temp.push(
				'Title: ' +
					title +
					'<br>Date: ' +
					date +
					'<br>Label: ' +
					label +
					'<br>Tags: ' +
					tag +
					'<br>Link: ' +
					link +
					'<br>Filename: ' +
					filename
			);
		});

		return temp;
	}

	updatePlot(
		title: string,
		x: number[],
		y: number[],
		titles: string[],
		labels: string[],
		dates: string[],
		links: string[],
		filenames: string[],
		tags: string[]
	) {
		this.setState({
			title: title,
			hoverData: this.getHoverData(titles, dates, labels, links, filenames, tags),
			labels: labels,
			sources: labels,
			x: x,
			y: y
		});
	}

	selectLabel = (e: any) => {
		let fileName = e.points[0].text.split('Filename: ')[1];
		let id = this.state.hoverData.findIndex((d) => d.includes(fileName));
		this.setState((s) => {
			const newLabels = [ ...s.labels ];
			if (newLabels[id] === 'selected') {
				newLabels[id] = this.state.sources[id];
			} else {
				newLabels[id] = 'selected';
			}
			return { labels: newLabels };
		});
	};

	addSelected(id: any) {
		let chosenHoverData = this.state.hoverData[id];
		let selectedObject = {
			id,
			title: chosenHoverData.split('Title: ')[1].split('<br>')[0],
			label: this.state.sources[id],
			date: chosenHoverData.split('Date: ')[1].split('<br>')[0],
			fileName: chosenHoverData.split('Filename: ')[1].split('<br>')[0],
			link: chosenHoverData.split('Link: ')[1].split('<br>')[0],
			tags: chosenHoverData.split('Tags: ')[1].split('<br>')[0]
		};
		this.setState((state) => {
			let newSelectedItems = [ ...state.selectedItems, selectedObject ];
			let newLabels = [ ...state.labels ];
			newLabels[id] = 'selected';
			return {
				selectedItems: newSelectedItems,
				labels: newLabels
			};
		});
	}

	removeSelected(id: any) {
		this.setState((state) => {
			let newSelectedItems = state.selectedItems.filter((item) => item.id !== id);
			let newLabels = [ ...state.labels ];
			newLabels[id] = this.state.sources[id];
			return {
				selectedItems: newSelectedItems,
				labels: newLabels
			};
		});
	}

	handleClick = async (e: any) => {
		let fileName = e.points[0].text.split('Filename: ')[1];
		let id = this.state.hoverData.findIndex((d) => d.includes(fileName));
		if (e.event.ctrlKey) {
			if (this.state.hoverData[id].includes('Snipet: ')) return;
			let result = await this.props.getSnipet(fileName);
			this.setState((s) => {
				let newHoverData = [ ...s.hoverData ];
				newHoverData[id] += `<br>Snipet: ${'snipet' in result ? result.snipet : 'No data'}`;
				return { hoverData: newHoverData };
			});
		} else {
			if (this.state.labels[id] === 'selected') {
				this.removeSelected(id);
			} else {
				this.addSelected(id);
			}
		}
	};

	render(): React.ReactNode {
		return (
			<React.Fragment>
				<Plot
					data={[
						{
							x: this.state.x,
							y: this.state.y,
							type: 'scatter',
							mode: 'markers',
							transforms: [ { type: 'groupby', groups: this.state.labels } ],
							text: this.state.hoverData
						}
					]}
					layout={{
						title: this.state.title,
						width: this.state.width,
						height: this.state.height
						// width: window.innerWidth,
						// height: window.innerHeight - 125,
					}}
					onClick={this.handleClick}
				/>
				{this.state.selectedItems.length > 0 && <SelectedItems selectedItems={this.state.selectedItems} />}
			</React.Fragment>
		);
	}
}

export default PlotWrapper;
