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
	guardian: {
		name: '',
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
			dob: new Date('10-30-1989'),
			// age: ,
			schoolOrInstitute: 'Foo Colllege'
		},
		{
			name: 'Jane Doe',
			dob: new Date('10-30-1989'),
			// age: ,
			schoolOrInstitute: 'Foo Institute'
		}
	]
}

const docDefinition = (({ fullName, siblingsUnder19 }) => ({
	// header: {
	// 	columns: ['Left part', { text: 'Right part', alignment: 'right' }]
	// },
	content: [
		// string interpolation
		`First paragraph ${fullName}`,
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines ',
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
			table: {
				// headers are automatically repeated if the table spans over multiple pages
				// you can declare how many rows should be treated as headers
				headerRows: 1,
				widths: ['*', 'auto', 100, '*'],

				body: [
					['Name', 'Date of Birth', 'Age', 'School/Institute'],
					// [ [x], [y],...] -> [x], [y], ...
					...siblingsUnder19.map(
						({ name, dob, schoolOrInstitute }) => [
							name,
							new Date(dob).toLocaleDateString(),
							new Date().getFullYear() -
								new Date(dob).getFullYear(),
							schoolOrInstitute
						]
					)
				]
			}
		}
	],
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
