export const DEFAULT_APP_PROPS = {
	props: {
		theme: "light",
		markerType: "O",
	},
	actions: {
		switchTheme: undefined,
		switchMarkerType: undefined,
	}
}

export const DEFAULT_TABLE_PROPS = {
	props: {
		tableCells: [].fill(undefined)
	},
	actions: {
		addTableCell: undefined,
	}
}

export const DEFAULT_PROPERTIES_PROPS = {
	props: {
		oWins: 0,
		xWins: 0,
		draws: 0,
	},
	actions: {
		setOWins: undefined,
		setXWins: undefined,
		setDraws: undefined
	}
}

export const DEFAULT_SETTINGS_PROPS = {
	props: {
		yourId: parseInt(Math.random()*100000),
		againstId: "",
		playingMode: "singlePlayer"
	},
	actions: {
		setYourId: undefined,
		setAgainstId: undefined,
		switchPlayingMode: undefined,
	}
}
