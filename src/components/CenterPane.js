import React from 'react'
import axios from 'axios'
import WebtoonList from './WebtoonList'

class CenterPane extends React.Component {
    state = {
        webtoonList: [],
        pageNumber: 1
    }

    componentDidMount() {
        this.loadData();
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        // 스크롤의 끝
        if(document.documentElement.scrollTop + document.documentElement.clientHeight
            === document.documentElement.scrollHeight) {
                if (this.state.pageNumber > 4) {
                    return;
                }

                const apiUrl = `dummy/webtoon_list-${this.state.pageNumber}.json`;
                axios.get(apiUrl)
                .then(data => {
                    const newList = this.state.webtoonList.concat(data.data.webtoonList);
                    this.setState({
                        webtoonList : newList,
                        pageNumber: this.state.pageNumber + 1
                    });
                })
                .catch(error => { console.log(error); }); 
            }
    }

    loadData() {
        const apiUrl = `dummy/webtoon_list-${this.state.pageNumber}.json`;
        axios.get(apiUrl)
        .then(data => {
            this.setState({
                webtoonList : data.data.webtoonList,
                pageNumber: this.state.pageNumber+1
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