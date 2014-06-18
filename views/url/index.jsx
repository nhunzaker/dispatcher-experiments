/** @jsx React.DOM **/

var React = require('react')
var URL  = require('../../stores/url')

module.exports = React.createClass({

	getInitialState: function() {
		return {
			modules: URL.all()
		}
	},

	getModules: function() {
		return this.state.modules.map(function(m, i) {
			return (<p key={i} dangerouslySetInnerHTML={{ __html: m.desc }} />)
		})
	},

	render: function() {
		return (
			<section>
				<header className="page-header">
					<h3>URL module</h3>
				</header>
				{ this.getModules() }
			</section>
		);
	}
})
