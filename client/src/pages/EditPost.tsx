import React, { useRef, useState } from 'react'
import style from "../app/styles/posts.module.scss"
import axios from 'axios';
import addImg from "./../app/assets/add-img.svg";
import imageIcon from "../app/assets/image.svg";
import deleteImg from "./../app/assets/close.svg";
import style__create__post from "../app/styles/create-post.module.scss"
import { useAppDispatch } from '../app/hooks';
import { getUpdatePosts } from '../features/userSlice';
import Post from './Post';

interface ItemsI {
  item: {
    _id: string,
    title: string,
    image: [string],
    description: string,
    author: { firstName: string, lastName: string },
    updatedAt: string,
    length: number,
  },
}

interface FormStates {
  title: string;
  files: File[];
  description: string;
}

const EditPost: React.FC<ItemsI> = ({ item }) => {

  const [edit, setEdit] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState<number>(item.description.length);
  const [previewImages, setPreviewImages] = useState<string[]>(item.image);
  const dispatch = useAppDispatch();
  const initialImages = item.image;
  const [formStates, setFormStates] = useState<FormStates>({
    title: item.title || "",
    files: [],
    description: item.description || "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateItemHandler = async () => {
    setEdit(false)
    try {
      if (formStates.files.length === 0) {
        const response = await axios.patch(
          `https://mongo-posts-api.onrender.com/editpost/nonew/${item._id}`,
          {
            title: formStates.title,
            image: previewImages,
            description: formStates.description,
            initialImages: initialImages,
          }
        );
        dispatch(getUpdatePosts())
      } else {
        const remainImagesArray: string[] = initialImages.filter((item) => previewImages.includes(item));
        const deleteImagesArray: string[] = initialImages.filter((item) => !previewImages.includes(item));
        const formData = new FormData();
        const reader = new FileReader();
        formData.append("title", formStates.title)
        for (let index = 0; index < formStates.files.length; index++) {
          const image = formStates.files[index];
          formData.append("image", image)
          reader.onload = () => {
            setPreviewImages((prev:  string[]) => [...prev, reader.result!.toString()]);
            reader.readAsDataURL(image);
          };
        }
        formData.append("description", formStates.description)
        formData.append("remainImagesArray", JSON.stringify(remainImagesArray))
        formData.append("deleteImagesArray", JSON.stringify(deleteImagesArray))
        await axios.patch(`https://mongo-posts-api.onrender.com/editpost/new/${item._id}`, formData).then((response) => console.log(response)
        )
        dispatch(getUpdatePosts())
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteItemHandler = async () => {
    try {
      await axios.delete(`https://mongo-posts-api.onrender.com/editpost/${item._id}`);
      dispatch(getUpdatePosts())
    } catch (error) {
      console.error(error);
    }
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteImageHandler = (img: string, i: number) => {
    setFormStates((prev) => ({ ...prev, files: prev.files.filter((_, index) => index !== (i - (previewImages.length - formStates.files.length))) }))
    setPreviewImages((prev) => prev.filter((previewImg) => previewImg !== img));
  }

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagesInner: FileList | null  = e.target.files;
    if (imagesInner === null) {
        return;
      }
    if (imagesInner.length + formStates.files.length > 3) {
      return alert("more than 3 images")
    }
    const imagesArray = Array.from(imagesInner)
    setFormStates((prev: FormStates) => ({ ...prev, files: [...prev.files, ...imagesArray] }))
    for (let index = 0; index < imagesInner.length; index++) {
      const reader = new FileReader();
      const image = imagesInner[index];
      reader.onload = () => {
        setPreviewImages((prev:  string[]) => [...prev, reader.result!.toString()]);
      };
      reader.readAsDataURL(image);
    }
    e.target.value = "";
  }

  const isEditDiv = <div>
    {edit ?
      <p onClick={updateItemHandler}>Save</p> : <p onClick={() => setEdit(true)}>Edit</p>}
    <p onClick={deleteItemHandler}>Delete</p>
  </div>

  return (
    <>
      {!edit
        ?
        <Post isEdit={true} editDiv={isEditDiv} item={item} />
        :
        <form noValidate className={style__create__post.form} encType="multipart/form-data">
          <div className={style.edit}>
            {edit ?
              <p onClick={updateItemHandler}>Save</p> : <p onClick={() => setEdit(true)}>Edit</p>
            }
            <p onClick={deleteItemHandler}>Delete</p>
          </div>
          <input
            autoFocus
            className={style__create__post.title}
            type="text"
            name="title"
            value={formStates.title}
            placeholder='Title'
            onChange={(e) => setFormStates((prev) => ({ ...prev, title: e.target.value }))}
            maxLength={300}
          />
          <div className={style__create__post.img__title}>
            <h1>Upload an image</h1>  <h1>(up to 3)  <img src={imageIcon} alt="Select images" /></h1>
          </div>
          <div className={style__create__post.images__wrapper}>
            {[1, 2, 3].map((imgIndex, i) => {
              return (
                (previewImages[i]) ?
                  <div key={imgIndex} className={style__create__post.image__wrapper}>
                    <img className={style__create__post.selected__img} src={initialImages.includes(previewImages[i]) ? `https://mongo-posts-api.onrender.com/uploads/${previewImages[i]}` : previewImages[i]}
                      alt={`Preview image ${imgIndex}`}
                      draggable={false}
                    />
                    <img className={style__create__post.delete__img__btn} src={deleteImg}
                      alt="Delete Image"
                      draggable={false}
                      onClick={() => deleteImageHandler(previewImages[i], i)}
                    />
                  </div>
                  :
                  <div key={imgIndex} className={style__create__post.image__wrapper}>
                    <img className={style__create__post.select__img} src={addImg}
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
            multiple={(previewImages.length === 2) ? false : true}
            accept="image/png, image/jpeg"
            onChange={(e) => imageChangeHandler(e)}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <textarea
            className={style__create__post.description}
            name="description"
            placeholder='Description'
            value={formStates.description}
            onChange={(e) => {
              setFormStates((prev) => ({ ...prev, description: e.target.value }))
              setDescriptionLength(e.target.textLength)
            }}
            maxLength={5000}
          />
          <div className={style__create__post.description__length}>{descriptionLength}/5000</div>
        </form>
      }
    </>
  )
}
export default EditPost;