interface PushableProperties {
    color: string
    disabled?: boolean
    width?: string
    style?: object
    action?: (any: any) => void

    content: (any: any) => any
    args: any
}

const Pushable = (props: PushableProperties) => {
    let pushableStyle = 'pushable ' + (props.disabled ? 'pushableDisabled' : '')
    let shadowStyle = 'shadow ' + (props.disabled ? 'shadowDisabled' : '')
    let edgeStyle = 'edge ' + props.color
    let frontStyle = 'front ' + (props.disabled ? 'frontDisabled' : '')

    return (
        <div>
            <div className={pushableStyle} style={props.style}>
                <span className={shadowStyle} />
                <span className={edgeStyle} />
                <span className={frontStyle} style={{ width: props.width }} onClick={props.action}>
                    {props.content(props.args)}
                </span>
            </div>
        </div>
    )
}

export default Pushable