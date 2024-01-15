import React from 'react';

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

const SelectedItem = ({ id, title, label, date, fileName, link, tags, snipet }: TSelectedItem) => {
	const [ isSelected, setIsSelected ] = React.useState(false);
	const toggleSelect = () => {
		setIsSelected(!isSelected);
	};

	if (!isSelected) {
		return (
			<div onClick={toggleSelect} className="SelectedItem-notselected-container">
				<p className="SelectedItem-selected-name">{fileName}</p>
				<p>&gt;</p>
			</div>
		);
	} else {
		return (
			<div onClick={toggleSelect} className="SelectedItem-selected-container">
				<p>
					<b>Filename:</b> {fileName}
				</p>
				<p>
					<b>Date:</b> {date}
				</p>
				<p>
					<b>Label:</b> {label}
				</p>
				<p>
					<b>Title:</b> {title}
				</p>
				{link !== 'Unknown' && <a href={link}>{link}</a>}
				<p>
					<b>Tags:</b> {tags}
				</p>
				{snipet && (
					<p>
						<b>Snipet:</b> {snipet}
					</p>
				)}
			</div>
		);
	}
};

export default SelectedItem;
