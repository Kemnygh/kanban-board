import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, Card, Stack, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default function CreateModal(props: any) {
    const { btnText, newData, onClick, setTags, setCol, rows, variant, width } = props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function getTagHandler(e: any) {
        const value = e.target.value
        setTags(value);
    }

    function submitInfo() {
        onClick();
        handleClose();
        newData();
    }

    return (
        <div>
            <Button onClick={handleOpen} color="success" variant={variant} sx={{ width: { width } }}>{btnText}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ color: "#37474f" }}>
                            {btnText}
                        </Typography>
                        <form>
                            <FormControl sx={{ justifyContent: "space-between" }}>
                                <Stack direction="row"
                                    justifyContent="space-between"
                                    sx={{ marginTop: 2 }}>
                                    <OutlinedInput sx={{ marginRight: 2 }} required id='title' label="Title" color="success" onInput={getTagHandler} multiline rows={rows} />
                                    <Button variant="contained" onClick={submitInfo} color="success" sx={{ backgroundColor: "gray" }} endIcon={<SendIcon />}>Submit</Button>

                                    {/* <TextField required id='title' variant="outlined" label="Title" color="success" onInput={getTagHandler} multiline rows={rows} hidden /> */}

                                </Stack>
                            </FormControl>

                            {/* <FormControl sx={{ justifyContent: "space-between" }}>
                                <OutlinedInput required id='column_id' type="hidden" defaultValue={col_id}  /></FormControl> */}
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}