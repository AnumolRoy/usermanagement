import * as React from 'react';
import { sp } from '../../../../spauth';
import { useParams } from 'react-router-dom';




interface Document {
    id: number;
    Name: string;
    url: string;
  }
  const files = [
    {
      name: "Document 1",
      url: "https://example.com/document-1.pdf"
    },
    {
      name: "Document 2",
      url: "https://example.com/document-2.docx"
    },
    {
      name: "Image 1",
      url: "https://example.com/image-1.jpg"
    },
    {
      name: "Spreadsheet 1",
      url: "https://example.com/spreadsheet-1.xlsx"
    }
  ];
  
  
  const Documents: React.FC = () => {
    const [documents] = React.useState<Document[]>([]);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const { Id } = useParams<{ Id: string }>();
      const emplyeeId = parseInt(Id)
    // const navigate = useNavigate();
    console.log(Id)
  
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      } else {
        setSelectedFile(null);
      }
    };
  
    const handleUploadClick = async () => {
      console.log("handleUpload cicked")
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }
  
      const documentLibraryName = `DocumentAnu/${emplyeeId}`;
      const fileNamePath = `${selectedFile.name}`;
  
  
      let result: any;
      if (selectedFile.size <= 10485760) {
  
        //  console.log(selectedFile);
        // small upload
        result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, selectedFile, { Overwrite: true });
        console.log("result",result, Id)
  
  
       
  
      } else {
        // large upload
        result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, selectedFile, data => {
          console.log(`progress`);
        }, true);
      }
  
  
    
    };
  
  
    React.useEffect(()=> {
  
    },[])
  
  
  
    return (
      <div>
        <h1>Documents</h1>
  
  
  
  
         <div className="docList">
        <h1>File List</h1>
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              <span>{file.name}</span>
              <button >Download</button>
            </li>
          ))}
        </ul>
      </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
        <input type="file" onChange={handleFileSelect} />
        <button type="button" onClick={handleUploadClick}>
          Upload
        </button>
        <ul>
          {documents.map((document) => (
            <li key={document.id}>
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                {document.Name}
              </a>
            </li>
          ))}
        </ul>
        </div>
    );
  };
  
  export default Documents;