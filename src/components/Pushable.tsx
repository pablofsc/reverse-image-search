interface pushableProperties {
    class?: string;
    color: string;
    disabled?: boolean;
    width?: string;
    action?: (any: any) => any;

    content: (any: any) => any;
    args: any;
}

const Pushable = (props: pushableProperties) => {
    let pushableStyle = 'pushable ' + (props.disabled ? 'pushableDisabled ' : '') + props.class;
    let shadowStyle = 'shadow ' + (props.disabled ? 'shadowDisabled ' : '');
    let edgeStyle = 'edge ' + props.color + ' ';
    let frontStyle = 'front ' + (props.disabled ? 'frontDisabled ' : '');

    return (
        <div>
            <div className={pushableStyle}>
                <span className={shadowStyle} />
                <span className={edgeStyle} />
                <span className={frontStyle} style={{ width: props.width }} onClick={props.action}>
                    {props.content(props.args)}
                </span>
            </div>
        </div>
    );
};

export default Pushable;