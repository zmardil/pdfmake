const data = {
	regNo: '',
	indexNo: '',
	nic: '',
	title: 'Mr.',
	nameWithInitials: '',
	fullName: 'John Doe',
	street: '',
	city: '',
	district: 'N/A',
	gsDivision: 'N/A',
	alDistrict: '',
	phone: '',
	email: '',
	course: 'N/A',
	zScore: '',
	employed: false,
	employment: {
		establishment: '',
		address: {
			street: '',
			city: '',
			district: 'N/A'
		},
		designation: '',
		salary: '',
		dateOfEmployment: new Date()
	},
	married: false,
	spouse: {
		name: '',
		//date of marriage
		employment: {
			establishment: '',
			designation: '',
			salary: '',
			dateOfEmployment: new Date()
		}
	},
	father: {
		name: '',
		living: true,
		age: '',
		employment: {
			occupation: '',
			salary: '',
			dateOfEmployment: new Date(),
			address: ''
		},
		annualIncome: {
			occupationOrPension: '',
			houseAndProperty: '',
			otherSources: ''
		}
	},
	mother: {
		name: '',
		living: true,
		age: undefined,
		employment: {
			occupation: '',
			salary: '',
			dateOfEmployment: new Date(),
			address: ''
		},
		annualIncome: {
			occupationOrPension: '',
			houseAndProperty: '',
			otherSources: ''
		}
	},
	guardian: {
		name: "Guardian's Name",
		age: '',
		address: '',
		post: '',
		annualIncome: {
			salary: '',
			houseAndPropertyOrTemple: ''
		}
	},
	siblingsUnder19: [
		{
			name: 'John Doe',
			// dob: new Date('10-30-1989'),
			schoolOrInstitute: 'Foo Colllege'
		},
		{
			name: 'Jane Doe',
			// dob: new Date('10-30-1989'),
			schoolOrInstitute: 'Foo Institute'
		}
	]
}

const table = (theads, data) => {
	if (data.length > 0) {
		return {
			headerRows: 1,
			widths: theads.map(({ width = 'auto' }) => width),
			// widths: theads.map(thead => thead.width),
			body: [
				theads.map(({ text }) => text),
				...data.map(x => Object.values(x))
			]
		}
	}
	return {
		headerRows: 1,
		// widths: theads.map(({width = 'auto'}) => width),
		widths: theads.map(thead => thead.width),
		body: [theads.map(({ text }) => text), theads.map(thead => 'N/A')]
	}
}

const docDefinition = (({ fullName, guardian, mother, siblingsUnder19 }) => ({
	// header: {
	// 	columns: ['Left part', { text: 'Right part', alignment: 'right' }]
	// },
	content: [
		// string interpolation
		`First paragraph ${fullName}`,
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines ',
		'Mother: ',
		`${guardian.name ? guardian.name : 'N/A'}`,
		{
			columns: [
				{ width: 'auto', text: 'John Doe' },
				{ width: 'auto', text: 'John Doe' }
			],
			columnGap: 10
		},
		// siblingUnder19
		{
			layout: 'lightHorizontalLines', // optional
			table: table(
				[
					{ text: 'Name' },
					// { text: 'Date of Birth', width: 'auto' },
					// { text: 'Age', width: '100' },
					{ text: 'School/Institute', width: 300 }
				],
				siblingsUnder19
			)
		}
	],
	styles: {
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	},
	defaultStyle: {
		font: 'Roboto'
	}
}))(data)

pdfMake.fonts = {
	Roboto: {
		normal: 'Roboto-Regular.ttf',
		bold: 'Roboto-Medium.ttf',
		italics: 'Roboto-Italic.ttf',
		bolditalics: 'Roboto-MediumItalic.ttf'
	}
}

const pdfDocGenerator = pdfMake.createPdf(docDefinition)
pdfDocGenerator.getDataUrl(dataUrl => {
	const targetElement = document.querySelector('#iframeContainer')
	const iframe = document.createElement('iframe')
	iframe.style.width = '100vw'
	iframe.style.height = '100vh'
	iframe.src = dataUrl
	targetElement.appendChild(iframe)
})
