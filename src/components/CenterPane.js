import React from 'react'
import axios from 'axios'
import WebtoonList from './WebtoonList'

class CenterPane extends React.Component {
    state = {
        webtoonList: []
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const apiUrl = 'dummy/webtoon_list.json';
        axios.get(apiUrl)
        .then(data => {
            this.setState({
                webtoonList : data.data.webtoonList
            });
        })
        .catch(error => { console.log(error); });
    }

    render() {
        return (
            <section className='center-section'>
                최근 목록
                <article className='recent-list'>
                </article>
                { this.state.webtoonList.length > 0 ? (
                    <WebtoonList list={ this.state.webtoonList} />
                ) : (
                    <span>
                        LOADING...
                    </span>
                )}
            </section>
        )
    }
}

export default CenterPane;