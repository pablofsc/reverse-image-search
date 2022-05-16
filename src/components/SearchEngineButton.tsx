import Button from './Button'

interface SearchEngineButtonProperties {
    engine: string,
    source: string
}

const isImage = (url: string) => {
    return /(\.|format=)(jpg|jpeg|png|jfif)/.test(url);
}

const SearchEngineButton = (props: SearchEngineButtonProperties) => {
    let destination = ''

    let pushable = 'pushable '
    let shadow = 'shadow '
    let edge = 'edge '
    let front = 'front '
    let target = '_blank'

    if (props.engine == 'Google') {
        destination = 'https://www.google.com/searchbyimage?image_url=' + props.source
        edge += 'green'
    }
    else if (props.engine == 'Bing') {
        destination = 'https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=' + props.source
        edge += 'yellow'
    }
    else if (props.engine == 'Yandex') {
        destination = 'https://yandex.com/images/search?rpt=imageview&url=' + props.source
        edge += 'red'
    }


    if (props.source === '' || !isImage(props.source)) {
        destination = ''

        pushable += 'pushableDisabled'
        shadow += 'shadowDisabled'
        front += 'frontDisabled'

        target = ''
    }

    return (
        <div className="searchButton">
            <a href={destination} target={target} className='actionInButton' style={{ cursor: 'default' }}>
                <Button
                    pushable={pushable}
                    shadow={shadow}
                    edge={edge}
                    front={front}
                    content={props.engine}
                />
            </a>
        </div >
    )

}

export default SearchEngineButton