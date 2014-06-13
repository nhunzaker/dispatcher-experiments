/** @jsx React.DOM **/
var React = require('react');
var HomeIndex = require('./home/index');

module.exports = React.createClass({
	render: function() {
		return (
			<main className="container">
				<header className="page-header">
					<h2>Flux example app</h2>
				</header>

				<p>Inspect the console for <code>__flux_cache</code></p>

				{ HomeIndex(this.props) }
			</main>
		);
	}
});
