const data = {
	date: new Date(),
	installments: [
		{
			course: 'Arts',
			yearOfStudy: 1,
			mode: 'M',
			number: 3
		},
		{
			course: 'FA-Art and Design',
			yearOfStudy: 1,
			mode: 'M',
			number: 14
		},
		{
			course: 'FA-Art and Design',
			yearOfStudy: 2,
			mode: 'M',
			number: 3
		},
		{
			course: 'FA-Art and Design',
			yearOfStudy: 3,
			mode: 'M',
			number: 6
		},
		{
			course: 'FA-Art and Design',
			yearOfStudy: 4,
			mode: 'M',
			number: 5
		},
		{
			course: 'FA-Baratham',
			yearOfStudy: 1,
			mode: 'M',
			number: 45
		},
		{
			course: 'FA-Baratham',
			yearOfStudy: 2,
			mode: 'M',
			number: 2
		},
		{
			course: 'FA-Baratham',
			yearOfStudy: 3,
			mode: 'M',
			number: 9
		},
		{
			course: 'FA-Baratham',
			yearOfStudy: 4,
			mode: 'M',
			number: 15
		}
	]
}

const docDefinition = (({ date, installments }) => ({
	header: [{ text: date.toDateString(), alignment: 'right' }],
	content: [
		{ text: 'UNIVERSITY OF JAFFNA, SRI LANKA', style: 'heading' },
		{ text: 'Bursary Summary', style: 'subHeading' },

		{
			layout: 'lightHorizontalLines',
			table: {
				headerRows: 1,
				widths: ['auto', '*', '*', '*', 'auto'],

				body: [
					['Course', 'Year of Study', 'Mode', 'Number', 'Amount'],
					...installments.map(
						({ course, yearOfStudy, mode, number }) => [
							course,
							yearOfStudy,
							mode,
							number,
							number * 40000
						]
					)
				]
			},
			layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return rowIndex % 2 === 0 ? '#CCCCCC' : null
				}
			}
		}
	],
	defaultStyle: {
		font: 'Roboto'
	},
	styles: {
		heading: {
			fontSize: 28,
			bold: true,
			color: 'blue',
			alignment: 'center'
		},
		subHeading: {
			fontSize: 20,
			bold: true,
			color: 'blue',
			alignment: 'center'
		}
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
