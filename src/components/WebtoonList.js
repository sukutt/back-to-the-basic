import React from 'react'

const WebtoonList = (props) => {
    return (
        <ul className='list-webtoon'>
            {
                props.list.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className='item-webtoon'>
                                <img src={item.thumbnail} className='img-webtoon' alt={item.title}/>
                                <div className="link-webtoon">
                                    <div className='info-webtoon'>
                                        <strong className='tit-webtoon'>
                                            {item.title}
                                        </strong>
                                        {item.artist}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default WebtoonList;