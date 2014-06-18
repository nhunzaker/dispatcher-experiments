/** @jsx React.DOM **/
var React = require('react')

module.exports = React.createClass({
	render: function() {
		return (
			<section>
				<header className="page-header">
					<h3>Error 404</h3>
				</header>
				<p>Page could not be found</p>
			</section>
		)
	}
})
