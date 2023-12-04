import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class PlotWrapper extends Component<
	any,
	{
		title: string;
		x: number[];
		y: number[];
		labels: string[];
		hoverData: string[];
		width: number;
		height: number;
	}
> {
	constructor(props: any) {
		super(props);
		this.state = {
			title: 'No data',
			hoverData: [],
			labels: [],
			x: [],
			y: [],
			width: props.width ? props.width : 1600,
			height: props.height ? props.height : 1200
		};
	}

	getHoverData(titles: string[], dates: string[]): string[] {
		if (titles.length !== dates.length) return [];

		let temp: string[] = [];
		titles.forEach((title, index) => {
			const date = dates[index];
			temp.push(title + '<br>' + date);
		});

		return temp;
	}

	updatePlot(title: string, x: number[], y: number[], titles: string[], labels: string[], dates: string[]) {
		this.setState({
			title: title,
			hoverData: this.getHoverData(titles, dates),
			labels: labels,
			x: x,
			y: y
		});
	}

	render(): React.ReactNode {
		return (
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
			/>
		);
	}
}

export default PlotWrapper;
