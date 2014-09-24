'use strict';

describe('yunakQuiz.version module', function() {
  beforeEach(module('yunakQuiz.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
