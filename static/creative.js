(function() {
  var replacements, tasks, topic, visualize;

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

  (function() {
    var _base;
    return (_base = Array.prototype).random_member != null ? (_base = Array.prototype).random_member : _base.random_member = function() {
      var j;
      j = Math.floor(Math.random() * this.length);
      return this[j];
    };
  })();

  tasks = ["Make a riddle having TOPIC as a solution.", "Make a plot involving TOPIC as a theme.", "Make a poem about TOPIC without using it as a word.", "Make a poem about TOPIC where a one word change inverses the meaning.", "Collect poetic descriptions for TOPIC.", "Collect blunt descriptions for TOPIC.", "Plot to take over the world using TOPIC, TOPIC, and TOPIC.", "Explain how TOPIC influenced or should influence TOPIC.", "Make an association chain between TOPIC and TOPIC.", "Your friend NAME is in love with NAME, explain to them how the latter's passion for TOPIC will ruin their relationship.", "Find rhymes for TOPIC.", "NAME was found with blood on their hands, mumbling 'TOPIC' over and over. Why?"];

  replacements = {
    "TOPIC": ["a ball pen", "a game of your choice", "ancient Rome", "analysis-paralysis", "astrology", "astronomy", "being honest", "books", "cats", "death", "electricity", "Goedels incompleteness theorem", "homophobia", "life", "love", "monogamy", "randomness", "robots", "science", "the internet", "water", "whisky", "your email inbox"],
    "NAME": ["Alice", "Bob", "Claire", "Dominique", "Edward", "Francine", "Gert", "Hilda"]
  };

  topic = function() {
    var i, key, rep, task, _i, _len, _ref;
    task = tasks.random_member();
    _ref = Object.keys(replacements);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      rep = replacements[key].shuffle();
      key = new RegExp(key);
      i = 0;
      while (key.test(task)) {
        task = task.replace(key, rep[i]);
        i += 1;
      }
    }
    return task;
  };

  visualize = function(s) {
    var t;
    t = topic();
    return $(s).append(t);
  };

  $(document).ready(function() {
    return visualize('body');
  });

}).call(this);
(function() {
  var replacements, tasks, topic, visualize;

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

  (function() {
    var _base;
    return (_base = Array.prototype).random_member != null ? (_base = Array.prototype).random_member : _base.random_member = function() {
      var j;
      j = Math.floor(Math.random() * this.length);
      return this[j];
    };
  })();

  tasks = ["Make a riddle having TOPIC as a solution.", "Make a plot involving TOPIC as a theme.", "Make a poem about TOPIC without using it as a word.", "Make a poem about TOPIC where a one word change inverses the meaning.", "Collect poetic descriptions for TOPIC.", "Collect blunt descriptions for TOPIC.", "Plot to take over the world using TOPIC, TOPIC, and TOPIC.", "Explain how TOPIC influenced or should influence TOPIC.", "Make an association chain between TOPIC and TOPIC.", "Your friend NAME is in love with NAME, explain to them how the latter's passion for TOPIC will ruin their relationship.", "Find rhymes for TOPIC.", "NAME was found with blood on their hands, mumbling 'TOPIC' over and over. Why?"];

  replacements = {
    "TOPIC": ["a ball pen", "a game of your choice", "ancient Rome", "analysis-paralysis", "astrology", "astronomy", "being honest", "books", "cats", "death", "electricity", "Goedels incompleteness theorem", "homophobia", "life", "love", "monogamy", "randomness", "robots", "science", "the internet", "water", "whisky", "your email inbox"],
    "NAME": ["Alice", "Bob", "Claire", "Dominique", "Edward", "Francine", "Gert", "Hilda"]
  };

  topic = function() {
    var i, key, rep, task, _i, _len, _ref;
    task = tasks.random_member();
    _ref = Object.keys(replacements);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      rep = replacements[key].shuffle();
      key = new RegExp(key);
      i = 0;
      while (key.test(task)) {
        task = task.replace(key, rep[i]);
        i += 1;
      }
    }
    return task;
  };

  visualize = function(s) {
    var t;
    t = topic();
    return $(s).append(t);
  };

  $(document).ready(function() {
    return visualize('.task');
  });

}).call(this);
