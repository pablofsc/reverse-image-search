import Icon from './Icon'

interface ButtonProperties {
    pushable?: string,
    shadow?: string,
    edge?: string,
    front?: string,
    content: string,
    action?: () => void
}

const Button = (props: ButtonProperties) => {
    if (!props.pushable) props.pushable = 'pushable'
    if (!props.shadow) props.shadow = 'shadow'
    if (!props.edge) props.edge = 'edge'
    if (!props.front) props.front = 'front'

    if (props.content.includes('icon:')) {
        return (
            <button className={props.pushable} style={{ margin: '25px 10px' }} onClick={props.action}>
                <span className={props.shadow}></span>
                <span className={props.edge}></span>
                <span className={props.front} style={{ width: 'fit-content', height: '30px' }}>
                    {Icon(props.content.slice(5))}
                </span>
            </button>
        )
    }
    else {
        return (
            <button className={props.pushable}>
                <span className={props.shadow}></span>
                <span className={props.edge}></span>
                <span className={props.front}>
                    {props.content}
                </span>
            </button>
        )
    }
}

export default Button