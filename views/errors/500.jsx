/** @jsx React.DOM **/
var React = require('react')

module.exports = React.createClass({
	render: function() {
		return (
			<section>
				<header className="page-header">
					<h3>Error 500</h3>
				</header>
				<p>Something terrible went wrong!</p>
			</section>
		)
	}
})
