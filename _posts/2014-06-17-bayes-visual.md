---
title: "Visual Bayes helper"
layout: post
categories: programming data
---

<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>
(function() {
  var add_evidence, evidence, likelihoods, runPlot;

  likelihoods = {
    Certain: 1,
    AlmostCertain: .93,
    Probable: .75,
    Even: .5,
    ProbablyNot: .3,
    AlmostCertainlyNot: .07,
    Impossible: 0
  };

  evidence = [
    {
      A: 1,
      B: 1
    }
  ];

  add_evidence = function(callback) {
    return function(e) {
      var a_val, b_val, last;
      a_val = likelihoods[$('select[name=A] option:checked')[0].value];
      b_val = likelihoods[$('select[name=B] option:checked')[0].value];
      last = evidence[evidence.length - 1];
      evidence.push({
        A: a_val * last.A,
        B: b_val * last.B
      });
      return callback();
    };
  };

  runPlot = function(chart) {
    var dats, lines, n, scale_y;
    scale_y = d3.scale.linear().domain([0, 1.0]).range([0, 300.0]);
    n = evidence.length;
    dats = chart.selectAll("g.dat").data(evidence).enter().append("g").attr("class", "dat");
    lines = dats.append("g");
    lines.append("rect").attr("fill", "red").attr("transform", function(a, t) {
      return "translate(" + (20 * t) + ", 0)";
    }).attr("width", 20).attr("height", function(a) {
      return scale_y(a.A / (a.A + a.B));
    });
    return lines.append("rect").attr("fill", "blue").attr("transform", function(a, t) {
      return "translate(" + (20 * t) + ", " + (scale_y(a.A / (a.A + a.B))) + ")";
    }).attr("width", 20).attr("height", function(a) {
      return scale_y(a.B / (a.A + a.B));
    });
  };

  $(document).ready(function() {
    var chart;
    chart = d3.select("#graph").append("svg").attr("width", 800).attr("height", 400);
    runPlot(chart);
    return $("#add").click(add_evidence(function() {
      return runPlot(chart);
    }));
  });

}).call(this);
</script>

I created a little helper to be more rational in your daily lifes. Just go over
your evidence step by step and answer the question *how likely is the
observation if your theory is true* and *how likely is the observation if the
theory is false*. The script gives you how likely the theory is correct (red)
and how likely it is wrong (blue).

<hr/>
<div style="display:table">
  <label style="display:table-row">
    <div style="display:table-cell; padding: 1em;">If the theory is true, the observation is</div>
    <select name="A" style="display:table-cell">
      <option value="Certain">Certain</option>
      <option value="AlmostCertain">Almost certain</option>
      <option value="Probable">Probable</option>
      <option selected="" value="Even">As likely as not</option>
      <option value="ProbablyNot">Improbable</option>
      <option value="AlmostCertainlyNot">Almost certainly not happening</option>
      <option value="Impossible">Impossible</option>
    </select>
  </label>
  <label style="display:table-row">
    <div style="display:table-cell; padding: 1em;">If the theory is false, the observation is</div>
    <select name="B" style="display:table-cell">
      <option value="Certain">Certain</option>
      <option value="AlmostCertain">Almost Certain</option>
      <option value="Probable">Probable</option>
      <option selected="" value="Even">As likely as not</option>
      <option value="ProbablyNot">Improbable</option>
      <option value="AlmostCertainlyNot">Almost certainly not happening</option>
      <option value="Impossible">Impossible</option>
    </select>
  </label>
</div>
<br/>
<button id="add">Add Evidence</button>
<hr/>
<div id="graph"></div>
