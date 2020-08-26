import React, { Component } from 'react';
import axios from 'axios';

class Lyrics extends Component {
    state = {
        lyrics: ''
    }

    async componentDidMount() {
        const result = await axios.get(`https://api.lyrics.ovh/v1/${this.props.artist}/${this.props.title}`);
        await this.setState({
            lyrics: result.data.lyrics
        })
    }

    render() {
        return (
            <>
                <p> { this.state.lyrics } </p>
            </>
        )
    }
}

export default Lyrics;