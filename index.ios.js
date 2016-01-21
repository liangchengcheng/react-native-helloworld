/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    } = React;

var AppRegistry = React.AppRegistry;
var request_url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";
var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }
  },
  componentDidMount: function() {
    // fetch Data
    fetch(request_url)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
            loaded: true
          });
        })
        .done();
  },
  render: function() {
    if (this.state.loaded) {
      return this.renderList();
    } else {
      return this.renderLoadingView();
    }
  },
  renderList: function() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            />
    )
  },
  renderItem: function(movie) {
    // var mockData = {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}};
    return (
        <View style={styles.container}>
          <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text>{movie.title}</Text>
            <Text>{movie.year}</Text>
          </View>
        </View>
    );
  },
  renderLoadingView: function() {
    return (
        <View style={styles.container}>
          <Text>Loading ,please wait!</Text>
        </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
