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
    }

    loadNextPage = () => {
        // 스크롤의 끝
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

    loadData = async () => {
        const data = await axios.get(`dummy/webtoon_list-${this.state.pageNumber}.json`);

        const lazyload = () => {
            const lazyloadImages = document.querySelectorAll("img.lazy");    
            let lazyloadThrottleTimeout;

            if (document.documentElement.scrollTop + document.documentElement.clientHeight
                >= document.documentElement.scrollHeight) {
                    this.loadNextPage();
            } else {
                if (lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }    
                  
                  lazyloadThrottleTimeout = setTimeout(function() {
                      const scrollTop = window.pageYOffset;
      
                      lazyloadImages.forEach((img) => {
                          // 화면에 이미지가 보여지게 되면 load한다
                          if(img.offsetTop < (window.innerHeight + scrollTop)) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                          }
                      });
                  }, 60);
            }
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);

        this.setState({
            webtoonList : data.data.webtoonList,
            pageNumber: this.state.pageNumber+1
        });

        // 최초 load 시 실행
        lazyload();
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