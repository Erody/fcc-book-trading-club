import React, { Component } from 'react'
import {
	Button,
	Grid,
	Header,
	Image,
	Segment,
} from 'semantic-ui-react'

export default class HomepageLayout extends Component {

	render() {
		return (
			<div>
				<Segment style={{ padding: '8em 0em' }} vertical>
					<Grid container stackable verticalAlign='middle'>
						<Grid.Row>
							<Grid.Column width={8}>
								<Header as='h3' style={{ fontSize: '2em' }}>Trade books with anyone on this site</Header>
								<p style={{ fontSize: '1.33em' }}>
									This is only a simulation. You can add books to your collection and trade with other users.
								</p>
								<Header as='h3' style={{ fontSize: '2em' }}>Made for an FCC assignment</Header>
								<p style={{ fontSize: '1.33em' }}>
									This is my solution for freecodecamp's "Manage a Book Trading Club" assignment.
								</p>
							</Grid.Column>
							<Grid.Column floated='right' width={6}>
								<Image
									bordered
									rounded
									size='large'
									src='http://i.imgur.com/ZYKTrOo.jpg'
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column textAlign='center'>
								<Button size='huge'><a href="https://www.freecodecamp.com">Check Them Out</a></Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>

			</div>
		)
	}
}