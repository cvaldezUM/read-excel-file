import { dropEmptyRows, dropEmptyColumns } from './readXlsx';

describe('readXlsx', function () {
	it('should drop empty rows', function () {
		dropEmptyRows([[null, null, null], ['A', 'B', 'C'], [null, 'D', null], [null, null, null], ['E', 'F', 'G'], [null, null, null]]).should.deep.equal([['A', 'B', 'C'], [null, 'D', null], ['E', 'F', 'G']]);
	});

	it('should drop empty columns', function () {
		dropEmptyColumns([[null, 'A', 'B', 'C', null, null], [null, 'D', null, null, null, null], [null, null, null, null, null, null], [null, null, 'E', 'F', 'G', null]]).should.deep.equal([['A', 'B', 'C', null], ['D', null, null, null], [null, null, null, null], [null, 'E', 'F', 'G']]);
	});

	it('should generate row map when dropping empty rows', function () {
		var rowMap = [];

		dropEmptyRows([[null, null, null], ['A', 'B', 'C'], [null, 'D', null], [null, null, null], ['E', 'F', 'G']], rowMap).should.deep.equal([['A', 'B', 'C'], [null, 'D', null], ['E', 'F', 'G']]);

		rowMap.should.deep.equal([1, 2, 4]);
	});
});
//# sourceMappingURL=readXlsx.test.js.map