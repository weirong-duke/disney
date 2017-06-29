export const getPostItStyles = (x, y, isSelected, moving, expanding, noteHeight, noteWidth, deleted) => {
	if (noteWidth < 120) {
		noteWidth = 120;
	}
	if (noteHeight < 100) {
		noteHeight = 100;
	}
	const postItStyles = {
		width: noteWidth,
		height: noteHeight
	};
	if (isSelected) {
		postItStyles.left = `calc(50% - ${noteWidth / 2}px)`;
		postItStyles.top = `calc(50% - ${noteHeight / 2}px)`;
	}
	else {
		postItStyles.left = x || 0;
		if (deleted) {
			postItStyles.opacity = 0;
			postItStyles.top = '105%';
			postItStyles.zIndex = '-5';
			return postItStyles;
		}
		postItStyles.top = y || 0;
		//this is the an annoying part that requires explanation
		//the flipping of the note requires a transition, but if you add time to a transition, then the *moving* of a note also shows the x-second delay
		//for example, transition: all 0.5s ease-in-out will delay the user when they drag and drop a post it
		//thus, we need to remove the transition specifically if the user is dragging and dropping
		if (moving || expanding) {
			postItStyles.transition = 'none';
		}
	}
	return postItStyles;
};
