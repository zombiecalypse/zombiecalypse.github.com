(function() {
  var topic, visualize;

  (function() {
    var _base;
    return (_base = Array.prototype).shuffle != null ? (_base = Array.prototype).shuffle : _base.shuffle = function() {
      var i, j, _i, _ref, _ref1;
      for (i = _i = _ref = this.length - 1; _ref <= 1 ? _i <= 1 : _i >= 1; i = _ref <= 1 ? ++_i : --_i) {
        j = Math.floor(Math.random() * (i + 1));
        _ref1 = [this[j], this[i]], this[i] = _ref1[0], this[j] = _ref1[1];
      }
      return this;
    };
  })();

  topic = function(tasks, topics) {
    var i, stasks, stopics, task;
    stasks = tasks.shuffle();
    stopics = topics.shuffle();
    task = stasks[0];
    i = 0;
    while (/TOPIC/.test(task)) {
      task = task.replace(/TOPIC/, stopics[i]);
      i += 1;
    }
    return task;
  };

    return $.getJSON('/static/topics.json').done(function(topics) {
      return $.getJSON('/static/tasks.json').done(function(tasks) {
        var t;
        t = topic(tasks, topics);
        return $('.task').append(t);
      });
    }).fail(function(h, t, e) {
      return alert("" + e + ": " + t + " " + h);
    });
}).call(this);
