import React from 'react';
import renderer from 'react-test-renderer';
import Timer from '../components/Timer';

test('Timer counts down from a given value', () => {
  const component = renderer.create(<Timer startValueInSeconds={5} running />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
