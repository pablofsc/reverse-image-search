import Pushable from './Pushable'
import Icon from './Icon'
import { useState } from 'react'

const storage = 'https://pablofsc-image-store.herokuapp.com'

interface FileUploadInterface {
    action: (source: string) => void
}

const FileUpload = (props: FileUploadInterface) => {
    const [filePicked, setPicked] = useState(false)
    const [fileUploaded, setUploaded] = useState(false)
    const [fileLocator, setURL] = useState('/none/')
    const [outOfService, setOOF] = useState(false)

    const waitForFile = () => {
        (document.getElementById('fileIn')! as HTMLInputElement).onchange = () => {
            setPicked(true)
            setUploaded(false)
            setURL('/none/')
        }
    }

    const submitFile = () => {
        if (fileUploaded) {
            props.action(storage + fileLocator)
            return
        }

        const fileInputElement = document.getElementById('fileIn')! as HTMLInputElement

        if (fileInputElement.files != null) {
            var data = new FormData()
            data.append('image', fileInputElement.files[0])

            props.action('Sending image to storage...')

            fetch(storage + '/store', {
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(res => {
                    props.action(storage + res.url)
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

    let pickerDisabled = outOfService ? true : false
    let submitDisabled = (!filePicked || outOfService) ? true : false

    return (<>
        <Pushable
            color='yellow'
            disabled={pickerDisabled}
            content={
                (labelStyle: object) => {
                    return (<>
                        <input type="file" id="fileIn" style={{ display: 'none' }} />
                        <label htmlFor="fileIn" className='actionInButton' onClick={pickerDisabled ? () => { } : waitForFile} style={labelStyle}>
                            {Icon("pickfile")}
                        </label>
                    </>)
                }
            }
            args={outOfService ? { cursor: 'default' } : {}}
            style={{ margin: '25px 10px' }}
        />

        <Pushable
            color='green'
            disabled={submitDisabled}
            content={
                (labelStyle: object) => {
                    return (<>
                        <input type="submit" id='submit' style={{ display: 'none' }} />
                        <label htmlFor="submit" className='actionInButton' onClick={(submitDisabled ? () => { } : submitFile)} style={labelStyle} >
                            {Icon("upload")}
                        </label>
                    </>)
                }
            }
            args={(!filePicked || outOfService) ? { cursor: 'default' } : {}}
            style={{ margin: '25px 10px' }}
        />
    </>)
}

export default FileUpload