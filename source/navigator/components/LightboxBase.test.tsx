/// <reference types="jest"/>
import React from 'react';
import { View, StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { shallow } from 'enzyme';

import * as types from '../../types';
import LightboxBase, {IProps} from './LightboxBase';

jest.unmock('react-native');

function setup() {
  const props: IProps = {
      children: [(<View />)],
      horizontalPercent: 0.5,
      verticalPercent: 0.5,
  };

  const enzymeWrapper = shallow(<LightboxBase {...props} /> );

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  /**
   * Test component rendering. Properties of children might be tested by importing their type:
   *
   *    const busyProps = enzymeWrapper.find(BusyIndicator).props();
   *    expect(busyProps.isBusy).toBe(false);
   */
  describe('LightboxBase', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
