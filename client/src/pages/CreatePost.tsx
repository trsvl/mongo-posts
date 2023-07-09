import React, { useState } from 'react'
import Input from '../app/ui/Input';
import axios from 'axios';
import style from "../app/styles/auth.module.scss"
import { useAppSelector } from '../app/hooks';

export default function CreatePost() {

    interface FormStates {
        title: string;
        titleError: string;
        file: File | null | any;
        fileError: string;
        text: string;
        textError: string;
    }

    const [formStates, setFormStates] = useState<FormStates>({
        title: "",
        titleError: "",
        file: null,
        fileError: "",
        text: "",
        textError: "",
    })
    const author = useAppSelector(state => state.user.author)
    
    const CreatePostHandler = async (e: React.FormEvent) => {
        e.preventDefault();
            const formData = new FormData();
            formData.append("image", formStates.file)
            formData.append("title", formStates.title)
            formData.append("text", formStates.text)
            formData.append("author", author)
        await axios.post("http://localhost:3080/createpost", formData).then((response) => console.log(response)
        ).catch((e) => {
            console.log(e.response.data);
            setFormStates((prev) => ({ ...prev, titleError: e.response.data.firstName }))
            setFormStates((prev) => ({ ...prev, fileError: e.response.data.lastName }))
            setFormStates((prev) => ({ ...prev, textError: e.response.data.email }))
        })




    };

    return (
        <form method='POST' noValidate onSubmit={CreatePostHandler} className={style.form} action='/createpost' encType="multipart/form-data">
            <Input
                type="text"
                name="title"
                onChange={(e) => setFormStates((prev) => ({ ...prev, title: e.target.value }))}
                label="Title"
                errorMessage={formStates.titleError}
                onFocus={() => setFormStates((prev) => ({ ...prev, titleError: "" }))}
            />
            <Input
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={(e) => setFormStates((prev) => ({ ...prev, file: e.target.files && e.target.files[0] }))}
                errorMessage={formStates.fileError}
                onFocus={() => setFormStates((prev) => ({ ...prev, fileError: "" }))}
            />
            <textarea
                name="email"
                onChange={(e) => setFormStates((prev) => ({ ...prev, text: e.target.value }))}
            />
            <button>CREATE POST</button>
        </form>
    )
}
