TODO:

NPM badge

[![CircleCI](https://circleci.com/gh/megmut/node-mysql-util.svg?style=svg)](https://circleci.com/gh/megmut/node-mysql-util)

Test Badge
Coverage Badge

```
import { selectOne } from 'mysql-utils';

const query: string = 'SELECT * FROM table WHERE row1 = ? AND row2 = ?';
const params: string[] = ['param1', 'anotherParam];

const result = await selectOne(query, params);
```