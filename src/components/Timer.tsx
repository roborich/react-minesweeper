import * as React from 'react';
import useEverySecond from '../lib/useEverySecond';
import Numbers from './Numbers';

interface TimerParams {
  startTime?: Date;
}

export default ({ startTime }: TimerParams) => {
  const getElapsed = () =>
    startTime !== undefined
      ? Math.round((new Date().getTime() - startTime.getTime()) / 1000)
      : 0;

  const [elapsed, setElapsed] = React.useState(getElapsed());

  useEverySecond(() => {
    setElapsed(getElapsed);
  });
  return <Numbers number={elapsed} />;
};
