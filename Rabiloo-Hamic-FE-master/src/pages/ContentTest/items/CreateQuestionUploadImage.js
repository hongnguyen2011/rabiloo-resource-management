import { Grid } from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CreateQuestionUploadImage() {
    const { setValue } = useFormContext();
    const [selectedImage, setSelectedImage] = useState([]);

    return (
        <div>
            <Grid container>
                {selectedImage.map((item, index) => {
                    return (
                        <div key={`${index}`} style={{ position: 'relative' }}>
                            <Grid item style={{ marginRight: 10 }}>
                                <img alt="not fount" width={250} src={URL.createObjectURL(item || null)} />
                                <br />
                            </Grid>
                            <div
                                onClick={() => {
                                    const newArr = selectedImage.filter((i) => i !== item);
                                    setSelectedImage(newArr);
                                    setValue('imageQuestion', newArr);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 15,
                                    cursor: 'pointer',
                                }}
                            >
                                <DeleteForeverIcon color={'error'} fontSize={'large'} />
                            </div>
                        </div>
                    );
                })}
            </Grid>
            <br />

            <br />
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    setValue('imageQuestion', [event.target.files[0], ...selectedImage]);
                    setSelectedImage([event.target.files[0], ...selectedImage]);
                }}
            />
        </div>
    );
}

export default CreateQuestionUploadImage;
