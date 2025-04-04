import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MessageOverlay from '../OverlayMessage.js';

export default function Editor() {
  const navigate = useNavigate();
  const uploadedFile = localStorage.getItem('uploadedFile');
  const [openOverlay, setOpenOverlay] = React.useState(false);

  React.useEffect(() => {
    if (!uploadedFile) {
      setOpenOverlay(true); 
    }
  }, [uploadedFile]);

  const handleOverlayClose = () => {
    setOpenOverlay(false);
    navigate('/project'); 
  };

  return (
    <div>
      {uploadedFile ? (
        <div>Editor Page</div>  
      ) : (
        <MessageOverlay
          open={openOverlay}
          onClose={handleOverlayClose}
          text="You must upload a project before proceeding."
        />
      )}
    </div>
  );
}