import React from 'react';
import './Layout.css';
import Showcase from '../Showcase/Showcase.component';

class Layout extends React.Component {
    state = {
        searchTerm: '',
        showInfo: false,
        showLyrics: false
    }

    submitHandler = async (event) => {
        event.preventDefault();
        console.log('in');
        await this.setState({ searchTerm: document.querySelector('.showcase-input').value, showLyrics: false, showInfo: true });
    }

    showLyricsHandler = () => {
        this.setState({ showShowCase: false, showLyrics: true })
    }

    render() {
        let showcase = null;
        if(this.state.searchTerm) {
            console.log(this.state.showInfo, this.state.showLyrics);
            showcase = <Showcase searchTerm={ this.state.searchTerm } lyricsShow={ this.state.showLyrics} infoShow={ this.state.showInfo } />
        }
        return (
            <div className="main-component">
                <div className="main-component-image" ></div>
                <div className="main-component-showcase" >

                    <h1 style={{ textAlign: 'center' }} > Lyrics Finder </h1>
                    <div className="showcase-input-button" >
                        <input type="text" className="showcase-input"/>
                        <button className='showcase-button' onClick={ this.submitHandler } >Search</button>
                    </div>
                    { showcase }
                </div>
            </div>
        )
    }

}

export default Layout;