import React from 'react';
import { View, Text } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
}
// @ts-ignore
from 'react-native-indicators';

import Theme, { Colors } from '../../styles';

/**
 * Type of indicator
 *
 * @export
 * @enum {string}
 */
export enum IndicatorType {
  BallIndicator = 'BallIndicator',
  BarIndicator = 'BarIndicator',
  DotIndicator = 'DotIndicator',
  MaterialIndicator = 'MaterialIndicator',
  PacmanIndicator = 'PacmanIndicator',
  PulseIndicator = 'PulseIndicator',
  SkypeIndicator = 'SkypeIndicator',
  UIActivityIndicator = 'UIActivityIndicator',
  WaveIndicator = 'WaveIndicator',
}

/**
 * Generates a spinner of the provided type
 * @param param0 type and style
 */
export const Spinner = ({ type, style }: { type: IndicatorType, style: any }) => {
  switch (type) {
    case 'BallIndicator': return <BallIndicator style={style} color={Colors.CrossDarkBlue} />;
    case 'BarIndicator': return <BarIndicator style={style} color={Colors.CrossDarkBlue} />;
    case 'DotIndicator': return <DotIndicator style={style} color={Colors.CrossDarkBlue} />;
    case 'PacmanIndicator': return <PacmanIndicator style={style} color={Colors.CrossDarkBlue} />;
    case 'PulseIndicator': return <PulseIndicator style={style} color={Colors.CrossDarkBlue} />;
    case 'SkypeIndicator': return <SkypeIndicator style={style} color={Colors.CrossDarkBlue} />;
    case 'UIActivityIndicator': return <UIActivityIndicator style={style} color={Colors.CrossDarkBlue} />;
    case 'WaveIndicator': return <WaveIndicator style={style} color={Colors.CrossDarkBlue} />;
    default: return <MaterialIndicator style={style} color={Colors.CrossDarkBlue} />;
  }
};

/**
 * Describes the props BusyIndicator accepts
 *
 * @export
 * @interface IBusyIndicatorProps
 */
export interface IBusyIndicatorProps {
  /**
   * Determines if the indicator is animating or not. Default value is true
   *
   * @type {boolean}
   * @memberof IBusyIndicatorProps
   */
  isBusy: boolean;
  /**
   * Optional message to show while busy. Defaults to empty string.
   *
   * @type {string}
   * @memberof IBusyIndicatorProps
   */
  message?: string;
  /**
   * Type of spinner to use
   *
   * @type {IndicatorType}
   * @memberof IBusyIndicatorProps
   */
  type?: IndicatorType;
  /**
   * Test id to assign this component
   *
   * @type {string}
   * @memberof IBusyIndicatorProps
   */
  testID?: string;
}

/**
 * Displays a busy indicator (spinner) when the parameter is true
 * @param {bool} isBusy determines if the indicator is animating or not. Default value is true
 * @param {string} message optional message to show while busy. Defaults to empty string.
 * @param {IndicatorType} type of spinner.Defaults to "MaterialIndicator"
 */
const busyIndicator = ({
  isBusy = true,
  message = '',
  type = IndicatorType.MaterialIndicator,
  testID = '1' }: IBusyIndicatorProps
) =>
  (isBusy ?
    (
      <View style={Theme.overlay} testID={testID}>
        <View style={[Theme.containerCentered, Theme.horizontal]}>
          <View style={[Theme.container, Theme.verticalTopCenter]}>
            <Spinner type={type} style={[Theme.container, Theme.verticalTopCenter]} />
            <Text style={[Theme.container, Theme.verticalTopCenter]}>{message}</Text>
          </View>
        </View>
      </View>
    )
    : null);

export default busyIndicator;
