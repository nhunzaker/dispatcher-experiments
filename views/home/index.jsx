/** @jsx React.DOM **/

var React = require('react')
var HistoryActions = require('../../actions/history')

module.exports = React.createClass({
	render: function() {
		return (
			<section>
				<header className="page-header">
					<h3>Known modules:</h3>
				</header>
				<ul className="list-group">
					<li className="list-group-item">
						<a href="/os" onClick={this._onClick}>OS</a>
					</li>
					<li className="list-group-item">
						<a href="/path" onClick={this._onClick}>Path</a>
					</li>
					<li className="list-group-item">
						<a href="/url" onClick={this._onClick}>URL</a>
					</li>
				</ul>
			</section>
		)
	},

	_onClick: function(e) {
		e.preventDefault()
		console.log(e.currentTarget.href)
		HistoryActions.push(e.currentTarget.href)
	}
})
