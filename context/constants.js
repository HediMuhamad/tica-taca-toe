export const DEFAULT_APP_PROPS = {
	props: {
		theme: "light",
		markerType: "O",
		isIdle: true,
	},
	actions: {
		switchTheme: undefined,
		switchMarkerType: undefined,
		setIsIdle: undefined,
		setPersisted: undefined
	}
}

export const DEFAULT_TABLE_PROPS = {
	props: {
		tableCells: new Array(9)
	},
	actions: {
		addTableCell: undefined,
		setPersisted: undefined
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
		setDraws: undefined,
		setPersisted: undefined
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
		setPersisted: undefined
	}
}