import Pushable from './Pushable'

interface SearchEngineButtonProperties {
    engine: string,
    source: string
}

const isImage = (url: string) => {
    return /(\.|format=)(jpg|jpeg|png|jfif)/.test(url);
}

const SearchEngineButton = (props: SearchEngineButtonProperties) => {
    let destination = ''
    let color = ''
    let isDisabled = false
    let target = '_blank'

    if (props.engine == 'Google') {
        destination = 'https://www.google.com/searchbyimage?image_url=' + props.source
        color = 'green'
    }
    else if (props.engine == 'Bing') {
        destination = 'https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=' + props.source
        color = 'yellow'
    }
    else if (props.engine == 'Yandex') {
        destination = 'https://yandex.com/images/search?rpt=imageview&url=' + props.source
        color = 'red'
    }

    if (props.source === '' || !isImage(props.source)) {
        isDisabled = true
        destination = ''
        target = '_self'
    }

    return (
        <div className="searchButton">
            <a href={destination} target={target} className='actionInButton' style={{ cursor: 'default' }}>
                <Pushable
                    color={color}
                    disabled={isDisabled}
                    content={() => props.engine}
                    args={props.engine}
                    width='125px'
                />
            </a>
        </div>
    )

}

export default SearchEngineButton