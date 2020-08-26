import React, { Component } from 'react';
import axios from 'axios';
import './Lyrics.css';

class Lyrics extends Component {
    state = {
        lyrics: ''
    }

    async componentDidMount() {
        const result = await axios.get(`https://api.lyrics.ovh/v1/${this.props.artist}/${this.props.title}`);
        let lyricsCopy = result.data.lyrics;
        let arr = lyricsCopy.split('\n');
        await this.setState({
            lyrics: arr
        })
        console.log(this.state.lyrics);
    }

    render() {
        let lyricsCopy = [...this.state.lyrics]
        return (
            <>
                <div className='lyrics' >
                    <h2 className='artist-title-h2' > { this.props.artist } - { this.props.title }</h2>
                    {
                        lyricsCopy.map((lyric, index) => {
                            if(lyric !== "") {               
                                return (
                                <p key={ index } > { lyric } </p>
                                )
                            }
                            else {
                                return (
                                    <br />
                                )
                            }
                        })
                    }
                </div>
            </>
        )
    }
}

export default Lyrics;