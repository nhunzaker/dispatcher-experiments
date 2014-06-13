/** @jsx React.DOM **/
var React = require('react')

module.exports = React.createClass({
	getModules: function() {
		return this.props.URL.map(function(m) {
			return (<p>{m.desc}</p>);
		});
	},

	render: function() {
		return (
			<section>
				<header classname="page-header">
					<h3>OS module</h3>
				</header>
				{ this.getModules() }
			</section>
		);
	}
});
