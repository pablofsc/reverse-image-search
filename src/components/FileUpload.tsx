import { FormEvent, ReactElement, useState } from 'react';

import Pushable from './Pushable';
import Icon from './Icon';
import { sendToStorage, storageURL } from '../utils';

interface Properties {
    showOnScreen: (linkToPicture: string) => void;
}

enum Situation {
    outOfService = -1,
    fileNotPicked = 0,
    filePicked = 1,
    fileUploaded = 2,
}

const FileUpload = (props: Properties): ReactElement => {
    const [status, setStatus] = useState<Situation>(Situation.fileNotPicked);
    const [pathOnStorage, setPath] = useState<string>('/none/');
    const [form, setForm] = useState<FormData>();

    const registerPickedFile = (event: FormEvent<HTMLInputElement>): void => {
        const files = event.currentTarget.files;
        if (files === null || files[0] === null) return;

        setStatus(Situation.filePicked);
        setPath('/none/');

        const data = new FormData();
        data.append('image', files[0]);

        setForm(data);
    };

    const submitFile = async (): Promise<void> => {
        if (status === Situation.fileUploaded) {
            props.showOnScreen(storageURL + pathOnStorage);
            return;
        }

        if (!form) return;

        props.showOnScreen('Sending image to storage...');

        const storageResponse = await sendToStorage(form).catch(err => console.log(err));

        if (!storageResponse) {
            setStatus(Situation.outOfService);
            props.showOnScreen("Sorry, we're out of service right now :(");
            return;
        }

        setPath(storageResponse);
        setStatus(Situation.fileUploaded);
        props.showOnScreen(storageURL + storageResponse);
    };

    const pickerDisabled = status === Situation.outOfService;
    const submitDisabled = status < Situation.filePicked;

    return (
        <>
            <Pushable
                class='actionButton'
                color='yellow'
                disabled={pickerDisabled}
                content={(labelStyle: object) => {
                    return (
                        <>
                            <input type='file' id='fileIn' style={{ display: 'none' }} onChange={event => registerPickedFile(event)} />
                            <label htmlFor='fileIn' className='actionInButton' style={labelStyle} >
                                {Icon('pickfile')}
                            </label>
                        </>
                    );
                }}
                args={pickerDisabled ? { cursor: 'default' } : {}}
            />

            <Pushable
                class='actionButton'
                color='green'
                content={Icon}
                args={'upload'}
                action={submitFile}
                disabled={submitDisabled}
            />
        </>
    );
};

export default FileUpload;