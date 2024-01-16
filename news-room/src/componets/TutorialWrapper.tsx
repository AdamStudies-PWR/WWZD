import React from 'react';
import '../styles/TutorialWrapper.css';

const TutorialItem = ({ button, action }: { button: string; action: string }) => {
	return (
		<div className="TutorialItem-container">
			<p>
				<b>{button}</b> - {action}
			</p>
		</div>
	);
};

const TutorialWrapper = () => {
	return (
		<div className="TutorialWrapper-container">
			<TutorialItem button="Left Mouse Button" action="Select Item" />
			<TutorialItem button="CTRL + Left Mouse Button" action="Get Snippet" />
		</div>
	);
};

export default TutorialWrapper;
