import React from 'react';

type TSelectedItem = {
	id: string;
	title: string;
	label: string;
	date: string;
	fileName: string;
	link: string;
	tags: string[];
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
	return (
		<div>
			{selectedItems &&
				selectedItems.map((item) => (
					<p key={item.id} onClick={() => generateTextFile(selectedItems)}>
						{item.fileName}
					</p>
				))}

			<button className="btn--primary" onClick={() => generateTextFile(selectedItems)}>
				Save selected filenames as Text File
			</button>
			<button className="btn--primary" onClick={() => generateJSONFile(selectedItems)}>
				Save selected filenames as JSON
			</button>
		</div>
	);
};

export default SelectedItems;
