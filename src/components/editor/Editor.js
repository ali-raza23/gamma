import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Tab,
  Tabs,
  AppBar,
  Container,
  IconButton,
} from '@mui/material';
import JSZip from 'jszip';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import MessageOverlay from '../OverlayMessage.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';

export default function Editor() {
  const navigate = useNavigate();
  const uploadedFile = localStorage.getItem('uploadedFile');
  const [openOverlay, setOpenOverlay] = React.useState(false);
  const [fileTree, setFileTree] = React.useState({});
  const [command, setCommand] = React.useState('');
  const [openFolders, setOpenFolders] = React.useState({});
  const [activeTab, setActiveTab] = React.useState(0);
  const [tabs, setTabs] = React.useState([]); // Manage opened tabs (files)

  React.useEffect(() => {
    if (!uploadedFile || !uploadedFile.startsWith('data:')) {
      setOpenOverlay(true);
    } else {
      extractZip();
    }
  }, [uploadedFile]);

  const handleOverlayClose = () => {
    setOpenOverlay(false);
    navigate('/project');
  };

  const buildTree = (files) => {
    const root = {};
    files.forEach(({ name, isDir }) => {
      const parts = name.split('/');
      let current = root;
      parts.forEach((part, index) => {
        if (!part) return;
        if (!current[part]) {
          current[part] = {
            __isDir: index !== parts.length - 1 || isDir,
            __children: {},
          };
        }
        current = current[part].__children;
      });
    });
    return root;
  };

  // Handle folder open/close toggle
  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath],
    }));
  };

  const renderTreeManually = (nodes, path = '') => {
    return Object.entries(nodes).map(([key, value], index) => {
      if (!key) return null;

      const currentPath = path ? `${path}${key}` : key;
      const nodeId = `${currentPath}-${index}`;

      const labelIcon = value.__isDir ? (
        <FolderOutlinedIcon sx={{ mr: 1 }} />
      ) : (
        <InsertDriveFileOutlinedIcon sx={{ mr: 1 }} />
      );

      const isOpen = openFolders[currentPath];

      const arrowIcon = value.__isDir && (
        isOpen ? <ExpandMoreIcon sx={{ ml: 1 }} /> : <ChevronRightIcon sx={{ ml: 1 }} />
      );

      return (
        <div key={nodeId} style={{ marginLeft: '20px' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', cursor: value.__isDir ? 'pointer' : 'default' }}
            onClick={() => value.__isDir && toggleFolder(currentPath)}
          >
            {labelIcon}
            <Typography sx={{ fontFamily: 'NeueMachina-Regular' }}>
              {key}
            </Typography>
            {arrowIcon}
          </div>
          {value.__isDir && isOpen && renderTreeManually(value.__children, `${currentPath}/`)}
        </div>
      );
    });
  };

  const extractZip = async () => {
    try {
      const base64Data = uploadedFile.split(',')[1];
      const blob = await fetch(`data:application/zip;base64,${base64Data}`).then(res => res.blob());
      const arrayBuffer = await blob.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      const files = Object.keys(zip.files).map((filename) => ({
        name: filename,
        isDir: zip.files[filename].dir,
      }));

      const tree = buildTree(files);
      setFileTree(tree);
    } catch (error) {
      console.error("Error extracting ZIP:", error);
    }
  };

  const openFileInTab = async (filePath) => {
    const base64Data = uploadedFile.split(',')[1];
    const blob = await fetch(`data:application/zip;base64,${base64Data}`).then(res => res.blob());
    const arrayBuffer = await blob.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    const file = zip.files[filePath];
    if (file) {
      if (filePath.endsWith('.jpg') || filePath.endsWith('.png') || filePath.endsWith('.jpeg')) {
        const url = URL.createObjectURL(await file.async('blob'));
        setTabs((prevTabs) => [
          ...prevTabs,
          {
            id: prevTabs.length,
            filePath,
            type: 'image',
            content: url,
          },
        ]);
      } else if (filePath.endsWith('.jar')) {
        const content = await file.async('text');
        setTabs((prevTabs) => [
          ...prevTabs,
          {
            id: prevTabs.length,
            filePath,
            type: 'text',
            content,
          },
        ]);
      } else {
        const content = await file.async('text');
        setTabs((prevTabs) => [
          ...prevTabs,
          {
            id: prevTabs.length,
            filePath,
            type: 'text',
            content,
          },
        ]);
      }
      setActiveTab(tabs.length); // Switch to the newly added tab
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseTab = (tabId) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId) {
      setActiveTab(Math.max(0, activeTab - 1)); // Switch to previous tab
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'NeueMachina-Regular' }}>
      {uploadedFile ? (
        <>
          {/* Tab Navigation Bar */}
          <AppBar position="sticky" sx={{ top: 0 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="file tabs" sx={{ backgroundColor: '#333' }}>
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'white', mr: 1 }}>
                        {tab.filePath}
                      </Typography>
                      <IconButton
                        sx={{ color: 'white' }}
                        onClick={() => handleCloseTab(tab.id)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tab.id}`}
                />
              ))}
            </Tabs>
          </AppBar>

          {/* File Tree */}
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Box sx={{ width: '300px', overflowY: 'auto', padding: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                Files
              </Typography>
              <div>{renderTreeManually(fileTree)}</div>
            </Box>

            {/* Editor Panel */}
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              {tabs.length > 0 && (
                <Box
                  role="tabpanel"
                  hidden={activeTab === -1}
                  id={`tabpanel-${tabs[activeTab].id}`}
                  aria-labelledby={`tab-${tabs[activeTab].id}`}
                >
                  {tabs[activeTab].type === 'image' ? (
                    <img src={tabs[activeTab].content} alt={tabs[activeTab].filePath} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  ) : (
                    <TextField
                      fullWidth
                      multiline
                      variant="outlined"
                      sx={{
                        height: '80vh',
                        bgcolor: '#1e1e1e',
                        color: 'white',
                      }}
                      value={tabs[activeTab].content}
                      onChange={(e) => {}}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <MessageOverlay open={openOverlay} onClose={handleOverlayClose} text="You must upload a project before proceeding." />
      )}
    </Box>
  );
}