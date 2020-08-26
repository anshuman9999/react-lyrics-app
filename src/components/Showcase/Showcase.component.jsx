import React from 'react';
import axios from 'axios';
import './Showcase.css'
import Lyrics from '../Lyrics/Lyrics.component';

class Showcase extends React.Component {
    state = {
        searchTerm: '',
        data: null,
        showInfo: this.props.infoShow,
        showLyrics: this.props.lyricsShow,
        artist: '',
        title: ''
    }

    componentDidMount = async () => {
        const result = await axios.get(`https://api.lyrics.ovh/suggest/${this.props.searchTerm}`);
        this.setState({ data: result.data, searchTerm: this.props.searchTerm });
    }

    componentDidUpdate = async () => {
        if (this.state.searchTerm !== this.props.searchTerm) {
            const result = await axios.get(`https://api.lyrics.ovh/suggest/${this.props.searchTerm}`);
            this.setState({ data: result.data, searchTerm: this.props.searchTerm});
        }
        document.querySelector('.showcase-button').addEventListener(
            'click',
            () => this.setState({ showLyrics: false, showInfo: true })
        )
    }

    lyricsShow = async (artist, title) => {
        console.log(this.props.infoShow, this.props.lyricsShow);
        await this.setState({
            showInfo: !this.props.infoShow,
            showLyrics: !this.props.lyricsShow,
            artist: artist,
            title: title
        });
    }

    render() {
        console.log(this.state.showInfo, this.state.showLyrics);
        let data = null;
        if (this.state.data) {
            data = this.state.data.data;
        }
        let info = (
            <>
                <div className="info-main-titles" >
                    {
                        data ?
                            data.map((obj) => {
                                return <p> {obj.title} </p>
                            }) : null
                    }
                </div>
                <div className="info-main-artists" >
                    {
                        data ?
                            data.map((obj) => {
                                return <p> {obj.artist.name} </p>
                            }) : null
                    }
                </div>
                <div className="info-main-links" >
                    {
                        data ?
                            data.map((obj) => {
                                return (
                                    <>
                                        <button
                                            onClick={ (artist, title) => this.lyricsShow(obj.artist.name, obj.title) }
                                        >
                                            Lyrics
                                        </button>
                                        <br />
                                    </>
                                )
                            }) : null
                    }
                </div>
            </>
        )

        let lyrics = (
            <Lyrics title={ this.state.title } artist={ this.state.artist } />
        );

        return (
            <>
                <div className="info-main" >
                    {
                        this.state.showInfo ? info : null
                    }
                </div>
                <div className="lyrics-main" >
                    {
                        this.state.showLyrics ? lyrics : null
                    }
                </div>
            </>
        )
    }
}

export default Showcase;