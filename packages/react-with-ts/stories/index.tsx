import React from 'react';

import { storiesOf } from '@storybook/react';
import { InfiniteScrollExample } from './examples/InfiniteScroll.example';

storiesOf('公共组件库', module)
  .add('InfiniteScrollExample', () => <InfiniteScrollExample />)
