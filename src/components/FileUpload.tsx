import Icon from './Icon'
import { useState } from 'react'

const ImageStoreServer = 'https://pablofsc-image-store.herokuapp.com'

interface FileUploadInterface {
    action: (source: string) => void
}

const FileUpload = (props: FileUploadInterface) => {
    const [filePicked, setPicked] = useState(false)
    const [fileUploaded, setUploaded] = useState(false)
    const [url, setURL] = useState('/none/')
    const [outOfService, setOOF] = useState(false)

    const lookForFile = () => {
        const fileInputElement = document.querySelector('input[type="file"]') as HTMLInputElement

        fileInputElement.onchange = () => setPicked(true)
        setUploaded(false)
    }

    const submitFile = () => {
        if (!filePicked) {
            return
        }
        else {
            if (fileUploaded) {
                props.action(ImageStoreServer + url)
            }
            else {
                const fileInputElement = document.querySelector('input[type="file"]') as HTMLInputElement

                if (fileInputElement.files != null) {
                    var data = new FormData()
                    data.append('image', fileInputElement.files[0])

                    props.action('Sending image to storage...')

                    fetch(ImageStoreServer + '/store', {
                        method: 'POST',
                        body: data
                    })
                        .then(res => res.json())
                        .then(res => {
                            props.action(ImageStoreServer + res.url)
                            setUploaded(true)
                            setURL(res.url)
                        })
                        .catch((e) => {
                            props.action("Sorry, we're out of service right now :(")
                            console.log(e)
                            setOOF(true)
                        })
                }
            }
        }
    }

    let pushableU = 'pushable '
    let shadowU = 'shadow '
    let frontU = 'front '
    let styleU = {}

    if (!filePicked || outOfService) {
        pushableU += 'pushableDisabled'
        shadowU += 'shadowDisabled'
        frontU += 'frontDisabled'
        styleU = { cursor: 'default' }
    }

    let pushableP = 'pushable '
    let shadowP = 'shadow '
    let frontP = 'front '
    let styleP = {}

    if (outOfService) {
        pushableP += 'pushableDisabled'
        shadowP += 'shadowDisabled'
        frontP += 'frontDisabled'
        styleP = { cursor: 'default' }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexGrow: '1',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <div>
                <div className={pushableP} style={{ margin: '25px 10px' }}>
                    <span className={shadowP} ></span>
                    <span className='edge yellow'></span>
                    <span className={frontP} style={{ width: 'fit-content', height: '30px' }}>
                        <input type="file" id="fileIn" style={{ display: 'none' }} />
                        <label htmlFor="fileIn" className='actionInButton' onClick={lookForFile} style={styleP}>
                            {Icon("pickfile")}
                        </label>
                    </span>
                </div>
            </div>

            <div>
                <div className={pushableU} style={{ margin: '25px 10px' }} >
                    <span className={shadowU}></span>
                    <span className='edge green'></span>
                    <span className={frontU} style={{ width: 'fit-content', height: '30px' }} >
                        <input type="submit" id='submit' style={{ display: 'none' }} />
                        <label htmlFor="submit" className='actionInButton' onClick={submitFile} style={styleU} >
                            {Icon("upload")}
                        </label>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default FileUpload