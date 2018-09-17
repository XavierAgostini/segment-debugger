import React from 'react'
import { Pane, Radio, SearchInput, Tooltip, Button, FilterCheckbox , Icon} from 'evergreen-ui'

export default class Filters extends React.Component {
  render() {
    return (
      <div>
        <div>

          <div>
            <Pane>Search</Pane>
            <Tooltip
              content="By default, the search pulls results only from the Event Property Values. To include Property Keys in search results, select Full Event Payload."
            >
              <Icon icon="user"></Icon>
            </Tooltip>
          </div>

          <div>
            <Pane display="flex">
              <Radio
                label="Event Property Values"
                name={`${this.htmlId}-search`}
                value="false"
                size={16}
                marginY="0"
              />
              <Radio
                label="Full Event Payload"
                name={`${this.htmlId}-search`}
                value="true"
                size={16}
                marginY="0"
                marginLeft="10"
              />
            </Pane>
          </div>

        </div>
      </div>
    )
  }
}