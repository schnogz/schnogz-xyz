import React from 'react'
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import { color } from 'styles/theme'

export default () => (
	<TwoColumns
		wide
		leftColumn={<SectionHeading>When</SectionHeading>}
		rightColumn={(
			<GitHubCalendar color={color.blue600} fontSize="18" username="schnogz">
				<ReactTooltip delayShow={25} html />
			</GitHubCalendar>
		)}
	/>
)


