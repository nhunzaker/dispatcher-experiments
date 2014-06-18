/** @jsx React.DOM **/
var React = require('react')
var OS    = require('../../stores/os')

module.exports = React.createClass({

	getInitialState: function() {
		return {
			modules: OS.all()
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
					<h3>OS module</h3>
				</header>
				{ this.getModules() }
			</section>
		)
	}
})
