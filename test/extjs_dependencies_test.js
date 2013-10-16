/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

'use strict';

var grunt = require('grunt');

exports.extjs_dependencies = {
  number_of_files: function (test) {
    test.expect(1);

    var actual = grunt.file.expand('tmp/**/*.js').length,
        expected = 14;
    
    test.equal(actual, expected, 'should have generated 14 output files.');

    test.done();
  },

  dependency_order: function (test) {
    test.expect(14);

    var actual = grunt.file.read('tmp/deps').split("\n"),
        expected = grunt.file.read('test/expected/deps').split("\n");
    
    actual.forEach(function (actualPath, i) {
      var expectedPath = expected[i],
          expectedIndex = actualPath.length - expectedPath.length;

      test.equal(actualPath.indexOf(expectedPath), expectedIndex, 'should output dependencies in correct order.');
    });

    test.done();
  },

  strip_requires: function (test) {
    test.expect(14);

    var requires_rx = /requires:\s*\[?\s*((['"]([\w.*]+)['"]\s*,?\s*)+)\s*\]?,?/m;
    
    grunt.file.expand('tmp/**/*.js').forEach(function (filePath) {
      var content = grunt.file.read(filePath),
          actual = requires_rx.test(content);
      test.equal(actual, false, 'should have removed all "requires: [...]" from output files.');
    });

    test.done();
  }
};
