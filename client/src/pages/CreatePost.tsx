import React, { useRef, useState } from 'react'
import Input from '../app/ui/Input';
import axios from 'axios';
import style from "../app/styles/create-post.module.scss"
import { useAppSelector } from '../app/hooks';
import imageIcon from "../app/assets/image.svg";
import addImg from "./../app/assets/add-img.svg";
import deleteImg from "./../app/assets/close.svg";

interface FormStates {
    title: string;
    files: File[];
    description: string;
}

export default function CreatePost() {


    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [formStates, setFormStates] = useState<FormStates>({
        title: "",
        files: [],
        description: "",
    })
    const buttonCondition = formStates.title && formStates.description;

    const author = useAppSelector(state => state.user.author)
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const images: any = e.target.files;
        if (images.length + formStates.files.length > 3) {
            return alert("more than 3 images")
        }
        setFormStates((prev) => ({ ...prev, files: [...prev.files, ...images] }))

        for (let index = 0; index < images.length; index++) {
            const reader = new FileReader();
            const image = images[index];
            reader.onload = () => {
                setPreviewImages((prev: any) => [...prev, reader.result?.toString()]);

            };
            reader.readAsDataURL(image);
        }
    }
    const deleteImageHandler = (i: number) => {
        setFormStates((prev) => ({ ...prev,     files: prev.files.filter((_, index) => index !== i)}))
        setPreviewImages((prev)=>prev.filter((_,index)=> index !== i ));
    }

    const CreatePostHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        const reader = new FileReader();
        formData.append("title", formStates.title)
        for (let index = 0; index < formStates.files.length; index++) {
            const image = formStates.files[index];
            formData.append("image", image)
            reader.onload = () => {
                setPreviewImages((prev: any) => [...prev, reader.result]);
                reader.readAsDataURL(image);
            };

        }
        formData.append("description", formStates.description)
        formData.append("author", author)
        await axios.post("http://localhost:3080/createpost", formData).then((response) => console.log(response)
        ).catch((e) => {
            console.log(e.response.data);
        })




    };

    // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newFiles: any = [];
    //     if (e.target.files){
    //         for(let i = 0; i < e.target.files.length; i++){
    //             newFiles.push(e.target.files[i])
    //          }
    //          setFormStates((prev) => ({ ...prev, files: newFiles}))
    //     }

    //  }

    return (
        <form noValidate onSubmit={CreatePostHandler} className={style.form} encType="multipart/form-data">
            <input
                autoFocus
                className={style.title}
                type="text"
                name="title"
                placeholder='Title'
                onChange={(e) => setFormStates((prev) => ({ ...prev, title: e.target.value }))}
                onFocus={() => setFormStates((prev) => ({ ...prev, titleError: "" }))}
                maxLength={300}
            />
            <div className={style.img__title}>
                <h1>Upload an image (up to 3)</h1>
                <img src={imageIcon} alt="Select images" />
            </div>

            <div className={style.images__wrapper}>
                {[1, 2, 3].map((imgIndex, i) => {
                    return (
                        previewImages[i] ?
                            <div key={imgIndex} className={style.image__wrapper}>
                                <img className={style.selected__img} src={previewImages[i]}
                                    alt={`Preview image ${imgIndex}`}
                                    onClick={handleImageClick}
                                    draggable={false}
                                />
                                <img className={style.delete__img__btn} src={deleteImg}
                                    alt="Delete Image"
                                    draggable={false}
                                    onClick={()=>deleteImageHandler(i)}
                                />
                            </div>
                            :
                            <div key={imgIndex} className={style.image__wrapper}>
                                <img className={style.select__img} src={addImg}
                                    alt={`Select image ${imgIndex}`}
                                    onClick={handleImageClick}
                                    draggable={false}
                                />

                            </div>
                    )
                })}
            </div>

            <input
                type="file"
                name="image"
                multiple={previewImages.length === 2 ? false : true}
                accept="image/png, image/jpeg"
                onChange={(e) => imageChangeHandler(e)}
                style={{ display: "none" }}
                ref={fileInputRef}
            />
            <textarea
            className={style.description}
                name="description"
                placeholder='Description'
                onChange={(e) => {
                    setFormStates((prev) => ({ ...prev, description: e.target.value }))
                    setDescriptionLength(e.target.textLength)
                }}
                maxLength={5000}
           />
           <div className={style.description__length}>{descriptionLength}/5000</div>
            <button
            className={buttonCondition ? style.btn__on : style.btn__off}
            disabled={buttonCondition ? false : true}>CREATE POST</button>
        </form>
    )
}
