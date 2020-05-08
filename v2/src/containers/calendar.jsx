import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, Text, Switch } from "react-native";
import { updateMuseumMode } from "../actions/device";
import Markdown from "react-native-simple-markdown";
import { isRTL, translate } from "../i18n";

import {
  globalStyles,
  NAV_BAR_TEXT,
  ACTION,
  BOTTOM_PLAYER_HEIGHT,
  WHITE,
  GRAY,
  NAV_BAR_BACKGROUND
} from "../styles";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1
  }
});

class Calendar extends Component {
  static get options() {
    return {
      topBar: {
        background: {
          color: NAV_BAR_BACKGROUND
        },
        backButton: {
          showTitle: false,
          color: ACTION
        },
        title: {
          text: translate("calendarScreen_Title"),
          fontSize: 17,
          fontFamily: "Helvetica",
          color: NAV_BAR_TEXT
        },
        noBorder: true
      }
    };
  }

  render() {
    const { locale, events, actions } = this.props;

    var eventArray = Object.entries(events);

    const eventsNewlineSeperated = eventArray
      .map(([key, value]) => {
        return `${value.filter(Boolean).join("\n\n")}`;
      })
      .join("\n____________________________________________________________\n");

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: BOTTOM_PLAYER_HEIGHT + 10
            }}
            automaticallyAdjustContentInsets={false}
          >
            <Markdown>{eventsNewlineSeperated}</Markdown>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.device.locale,
    appVersion: state.device.appVersion,
    museumMode: state.device.museumMode,
    events: state.calendarEvents.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        updateMuseumMode
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { forwardRef: true }
)(Calendar);
