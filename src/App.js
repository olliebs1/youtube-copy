import React from 'react';
import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetails, VideoList } from './components/index'
import youtube from './api/youtube';
import key from './api/key'


class App extends React.Component {

  state = {
    videos: [],
    selectedVideo: null
  }

  componentDidMount() {
    this.handleSubmit('cars')
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  }


  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: key,
        q: searchTerm,
      }
    });

    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] })
  }


  render() {

    const { selectedVideo, videos } = this.state;
    return (
      <Grid justify='center' container spacing={10}>
        <Grid item xs={11}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit}></SearchBar>
            </Grid>
            <Grid item xs={8}>
              <VideoDetails video={selectedVideo}></VideoDetails>
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect}></VideoList>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    )
  }
}

export default App;