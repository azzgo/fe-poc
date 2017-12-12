import React, { PureComponent } from 'react'
import { InfiniteScroll } from 'src/shared/components/InfiniteScroll'
import { AvatarPanel } from 'src/shared/components/AvatarPanel'
import faker from 'faker'

interface IProps {
}

interface IState {
  list: Array<{
    clientId: string,
    name: string,
    avatar: string,
    description: string,
  }>
}

export class InfiniteScrollExample extends PureComponent<IProps, IState> {
  state = {
    list: [
      {
        clientId: faker.random.uuid(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        description: faker.lorem.text(),
      },
      {
        clientId: faker.random.uuid(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        description: faker.lorem.text(),
      },
      {
        clientId: faker.random.uuid(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        description: faker.lorem.text(),
      },
    ]
  }

  onRefresh = () => {
    this.setState({
      list: this.state.list.concat([{
        clientId: faker.random.uuid(),
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        description: faker.lorem.text(),
      }])
    })
  }

  render() {
    const { list } = this.state
    return (
      <InfiniteScroll
        onRefresh={this.onRefresh}
      >
        {
          list.map((item) => {
            return (
              <AvatarPanel
                key={item.clientId}
                name={item.name}
                avatarUrl={item.avatar}
                description={item.description.slice(0, 120)}
              />
            )
          })
        }
      </InfiniteScroll>
    )
  }
}
