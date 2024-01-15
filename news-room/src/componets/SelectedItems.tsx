import React from 'react';
import SelectedItem from './SelectedItem';
import '../styles/SelectedItems.css';

type TSelectedItem = {
	id: string;
	title: string;
	label: string;
	date: string;
	fileName: string;
	link: string;
	tags: string[];
	snipet: string;
};

type SelectedItemsProps = {
	selectedItems: TSelectedItem[];
};

const generateJSONFile = (selectedItems: TSelectedItem[]) => {
	const itemsToSave = selectedItems.map((item: TSelectedItem) => item.fileName);
	const fileData = JSON.stringify(itemsToSave);
	const blob = new Blob([ fileData ], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.download = 'selectedItems.json';
	link.href = url;
	link.click();
};

const generateTextFile = (selectedItems: TSelectedItem[]) => {
	let stringToSave = '';
	selectedItems.forEach((item: TSelectedItem) => {
		stringToSave += `${item.fileName}\n`;
	});
	const blob = new Blob([ stringToSave ], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.download = 'selectedItems.txt';
	link.href = url;
	link.click();
};

const SelectedItems = ({ selectedItems }: SelectedItemsProps) => {
	if (selectedItems) {
		return (
			<div className="SelectedItems">
				<section className="SelectedItems-container">
					<h1 className="SelectedItems-title">Currently Selected Items:</h1>
					{selectedItems && selectedItems.map((item) => <SelectedItem {...item} key={item.fileName} />)}
				</section>
				<button className="btn--primary" onClick={() => generateTextFile(selectedItems)}>
					Save selected filenames as Text File
				</button>
				<button className="btn--primary" onClick={() => generateJSONFile(selectedItems)}>
					Save selected filenames as JSON
				</button>
			</div>
		);
	}
	return <React.Fragment />;
};

export default SelectedItems;
