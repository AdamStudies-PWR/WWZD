import React, { Component } from 'react';
import '../styles/Spinner.css';

class Spinner extends Component<any, { data: string[] }> {
	name: string;

	constructor(props: any) {
		super(props);

		this.name = this.props.name;
		this.state = {
			data: this.props.data
		};
	}

	updateData(data: string[]) {
		this.setState({ data: data });
	}

	render(): React.ReactNode {
		return (
			<div className="Spinner">
				<label>{this.name}</label>
				<select onChange={this.props.onChange} className="custom-select">
					{this.state.data.map((element: string) => (
						<option value={element} key={element}>
							{element}
						</option>
					))}
				</select>
			</div>
		);
	}
}

export default Spinner;
