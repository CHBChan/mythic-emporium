import { useRef, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface imageUploadProps {
    onFileChange: (file: File) => void;
}

const ImageUpload: React.FC<imageUploadProps> = ({ onFileChange }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]) {
            const uploadedFile = event.target.files[0];
            onFileChange(uploadedFile);
        }
    }

    return (
        <div className='flex flex-col items-center gap-2 rounded-lg border-2 border-black p-8'>
            <TbPhotoPlus size={42} />
            <input 
                type='file' 
                accept='image/*'
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageUpload;