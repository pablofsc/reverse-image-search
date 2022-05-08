interface SearchEngineButtonProperties {
    engine: string,
    source: string
}

const isImage = (url: string) => {
    return /(\.|format=)(jpg|jpeg|png|jfif)/.test(url);
}

const SearchEngineButton = (props: SearchEngineButtonProperties) => {
    let destination = ''

    if (props.engine == 'Google') {
        destination = 'https://www.google.com/searchbyimage?image_url=' + props.source
    }
    else if (props.engine == 'Bing') {
        destination = 'https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=' + props.source
    }
    else if (props.engine == 'Yandex') {
        destination = 'https://yandex.com/images/search?rpt=imageview&url=' + props.source
    }

    let pushable = 'pushable'
    let shadow = 'shadow'
    let edge = 'edge'
    let front = 'front'

    if (props.source === '' || !isImage(props.source)) {
        destination = ''

        pushable += ' pushableDisabled'
        shadow += ' shadowDisabled'
        front += ' frontDisabled'
    }

    return (
        <div className="searchButton">
            <a href={destination} target='_blank'>
                <button className={pushable}>
                    <span className={shadow}></span>
                    <span className={edge}></span>
                    <span className={front}>
                        {props.engine}
                    </span>
                </button>
            </a>
        </div >
    )

}

export default SearchEngineButton