/** @jsx React.DOM **/
var React = require('react')

module.exports = React.createClass({
	getModules: function() {
		return Object.keys(this.props).map(function(key) {
			return (
				<li key={key} className="list-group-item">
					<a href={"/" + key.toLowerCase()}>{key}</a>
				</li>
			);
		});
	},

	render: function() {
		return (
			<section>
				<header className="page-header">
					<h3>Known modules:</h3>
				</header>
				<ul className="list-group">{ this.getModules() }</ul>
			</section>
		);
	}

})
