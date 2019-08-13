import path from 'path';

import readXlsxFileNode from './readXlsxFileNode';

describe('readXlsxFileNode', function () {
	it('should read *.xlsx file on Node.js and parse JSON', function () {
		var schema = {
			'START DATE': {
				prop: 'date',
				type: Date,
				template: 'MM/DD/YYYY'
			},
			'NUMBER OF STUDENTS': {
				prop: 'numberOfStudents',
				type: Number,
				required: true
			},
			'COURSE': {
				prop: 'course',
				type: {
					'IS FREE': {
						prop: 'isFree',
						type: Boolean
						// Excel stored booleans as numbers:
						// `1` is `true` and `0` is `false`.
						// Such numbers are parsed to booleans.
					},
					'COST': {
						prop: 'cost',
						type: Number
					},
					'COURSE TITLE': {
						prop: 'title',
						type: String
					}
				}
			},
			'CONTACT': {
				prop: 'contact',
				required: true,
				parse: function parse(value) {
					return '+11234567890';
				}
			}
		};

		var rowMap = [];

		return readXlsxFileNode(path.resolve(__dirname, '../test/spreadsheets/course.xlsx'), { schema: schema, rowMap: rowMap }).then(function (_ref) {
			var rows = _ref.rows,
			    errors = _ref.errors;

			errors.should.deep.equal([]);
			rows[0].date = rows[0].date.getTime();
			rows.should.deep.equal([{
				date: convertToUTCTimezone(new Date(2018, 2, 24, 12)).getTime(),
				numberOfStudents: 123,
				course: {
					isFree: false,
					cost: 210.45,
					title: 'Chemistry'
				},
				contact: '+11234567890',
				originalRow: 1
			}]);
			rowMap.should.deep.equal([0, 1]);
		});
	});
});

// Converts timezone to UTC while preserving the same time
function convertToUTCTimezone(date) {
	// Doesn't account for leap seconds but I guess that's ok
	// given that javascript's own `Date()` does not either.
	// https://www.timeanddate.com/time/leap-seconds-background.html
	//
	// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
	//
	return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}
//# sourceMappingURL=readXlsxFileNode.test.js.map